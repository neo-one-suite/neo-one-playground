// tslint:disable no-console
import execa from 'execa';
import isRunning from 'is-running';
import * as path from 'path';
import { timer } from 'rxjs';
import yargs from 'yargs';

const argv = yargs
  .boolean('report')
  .describe('report', 'Write out test reports.')
  .default('report', false)
  .boolean('neo-one-coverage')
  .describe('neo-one-coverage', 'Write coverage to .nyc_output.')
  .default('neo-one-coverage', false)
  .boolean('coverage')
  .describe('coverage', 'Write coverage to .nyc_output.')
  .default('coverage', false).argv;

const runCypress = async ({ report, coverage }: { readonly report: boolean; readonly coverage: boolean }) => {
  // tslint:disable-next-line no-unused
  const { NODE_OPTIONS, TS_NODE_PROJECT, ...newEnv } = process.env;
  const cypressRetries = '5';
  const finalEnv = { ...newEnv, CYPRESS_RETRIES: cypressRetries };
  let command = ['cypress', 'run', '--browser', 'chrome', '--spec', 'cypress/integration/**/*'];
  if (report) {
    command = command.concat([
      '--reporter',
      'mocha-multi-reporters',
      '--reporter-options',
      `configFile=${path.resolve(__dirname, '..', 'mocha.json')}`,
    ]);
  }
  if (coverage) {
    command = command.concat(['--env', `coverageDir=${path.resolve(process.cwd(), '.nyc_output')}`]);
  }

  console.log(`$ CYPRESS_RETRIES=${cypressRetries} yarn ${command.join(' ')}`);
  const proc = execa('yarn', command, {
    env: finalEnv,
    extendEnv: false,
    cwd: path.resolve(__dirname, '..'),
  });

  // tslint:disable-next-line strict-comparisons
  if (proc.stdout !== null) {
    proc.stdout.pipe(process.stdout);
  }
  // tslint:disable-next-line strict-comparisons
  if (proc.stderr !== null) {
    proc.stderr.pipe(process.stderr);
  }

  await proc;
};

const nowSeconds = () => Math.round(Date.now() / 1000);

const createKillProcess = (proc: execa.ExecaChildProcess) => async () => killProcess(proc);

const killProcess = async (proc: execa.ExecaChildProcess) => {
  const { pid } = proc;
  const startTime = nowSeconds();
  let alive = isRunning(pid);
  if (!alive) {
    return;
  }

  // tslint:disable-next-line no-loop-statement
  while (nowSeconds() - startTime <= 10) {
    try {
      let signal = 'SIGINT';
      if (nowSeconds() - startTime > 7) {
        signal = 'SIGKILL';
      } else if (nowSeconds() - startTime > 5) {
        signal = 'SIGTERM';
      }
      process.kill(pid, signal);
    } catch (error) {
      if (error.code === 'ESRCH') {
        return;
      }

      throw error;
    }
    await timer(1000).toPromise();
    alive = isRunning(pid);
    if (!alive) {
      return;
    }
  }

  throw new Error(`Failed to kill process ${pid}`);
};

// tslint:disable-next-line readonly-array
const mutableCleanup: Array<() => Promise<void> | void> = [];

// tslint:disable-next-line no-let
let shuttingDown = false;
const shutdown = (exitCode: number) => {
  if (!shuttingDown) {
    shuttingDown = true;
    console.log('Shutting down...');
    Promise.all(mutableCleanup.map((callback) => callback()))
      .then(() => {
        process.exit(exitCode);
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }
};

process.on('uncaughtException', (error) => {
  console.error(error);
  shutdown(1);
});

process.on('unhandledRejection', (error) => {
  console.error(error);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT: Exiting...');
  shutdown(0);
});

process.on('SIGTERM', () => {
  console.log('\nSIGTERM: Exiting...');
  shutdown(0);
});

const neoOne = async (coverage: boolean): Promise<void> => {
  let command = ['neo-one', 'build', '--reset', '--no-progress'];
  command = coverage ? ['nyc', 'yarn'].concat(command) : ['yarn'].concat(command);

  if (coverage) {
    const startServerCommand = ['nyc', 'yarn', 'neo-one', 'start', 'server', '--static-neo-one'];
    console.log(`$ ${startServerCommand.join(' ')}`);
    const proc = execa(startServerCommand[0], startServerCommand.slice(1));
    mutableCleanup.push(async () => {
      await execa('yarn', ['neo-one', 'reset', '--static-neo-one']);
    });

    let stdout = '';
    const stdoutListener = (res: string) => {
      stdout += res;
    };
    // tslint:disable-next-line strict-comparisons
    if (proc.stdout !== null) {
      proc.stdout.on('data', stdoutListener);
    }

    let stderr = '';
    const stderrListener = (res: string) => {
      stderr += res;
    };
    // tslint:disable-next-line strict-comparisons
    if (proc.stderr !== null) {
      proc.stderr.on('data', stderrListener);
    }

    let exited = false;
    const exitListener = () => {
      exited = true;
    };
    proc.on('exit', exitListener);

    let tries = 60;
    let ready = false;
    // tslint:disable-next-line no-loop-statement
    while (!ready && !exited && tries >= 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      const { stdout: result } = await execa('yarn', ['neo-one', 'check', 'server', '--static-neo-one']);
      try {
        const lines = result.split('\n').filter((line) => line !== '');
        ready = JSON.parse(lines[lines.length - 1]);
      } catch {
        // Ignore errors
      }
      tries -= 1;
    }

    // tslint:disable-next-line strict-comparisons
    if (proc.stdout !== null) {
      proc.stdout.removeListener('data', stdoutListener);
    }
    // tslint:disable-next-line strict-comparisons
    if (proc.stdout !== null) {
      proc.stdout.removeListener('data', stderrListener);
    }
    proc.removeListener('exit', exitListener);

    if (!ready) {
      throw new Error(`Failed to start NEO-ONE server.\n\nSTDOUT:\n${stdout}\n\nSTDERR:\n${stderr}`);
    }
  }

  console.log(`$ ${command.join(' ')}`);
  await execa(command[0], command.slice(1), {
    stdio: coverage ? 'ignore' : 'inherit',
  });
};

const run = async ({
  report,
  coverage,
  neoOneCoverage,
}: {
  readonly report: boolean;
  readonly coverage: boolean;
  readonly neoOneCoverage: boolean;
}) => {
  await neoOne(neoOneCoverage);
  const proc = execa(
    'node',
    ['-r', 'ts-node/register/transpile-only', path.resolve(__dirname, 'start.ts'), '--ci'].concat(
      coverage ? ['--coverage'] : [],
    ),
    {
      env: {
        TS_NODE_PROJECT: path.resolve(__dirname, '..', 'tsconfig/tsconfig.es2017.cjs.json'),
      },
    },
  );
  mutableCleanup.push(createKillProcess(proc));

  // tslint:disable-next-line strict-comparisons
  if (proc.stdout !== null) {
    proc.stdout.pipe(process.stdout);
  }
  // tslint:disable-next-line strict-comparisons
  if (proc.stderr !== null) {
    proc.stderr.pipe(process.stderr);
  }

  // Wait for server to startup
  await timer(90000).toPromise();

  // tslint:disable-next-line strict-comparisons
  if (proc.stdout !== null) {
    proc.stdout.unpipe(process.stdout);
  }
  // tslint:disable-next-line strict-comparisons
  if (proc.stderr !== null) {
    proc.stderr.unpipe(process.stderr);
  }

  await runCypress({ report, coverage });
};

run({ report: argv.report, coverage: argv.coverage, neoOneCoverage: argv['neo-one-coverage'] })
  .then(() => shutdown(0))
  .catch((error) => {
    console.error(error);
    shutdown(1);
  });
