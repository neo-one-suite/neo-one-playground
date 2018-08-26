// tslint:disable no-console
import execa from 'execa';
import isRunning from 'is-running';
import yargs from 'yargs';
import * as path from 'path';

yargs.describe('report', 'Write out test reports.').default('report', false);
yargs.describe('coverage', 'Write coverage to .nyc_output.').default('coverage', false);
yargs.describe('neo-one-coverage', 'Write coverage to .nyc_output for neo-one.').default('neo-one-coverage', false);

const runCypress = async ({ report, coverage }: { readonly report: boolean; readonly coverage: boolean }) => {
  // tslint:disable-next-line no-unused
  const { NODE_OPTIONS, TS_NODE_PROJECT, ...newEnv } = process.env;
  let command = ['cypress', 'run', '--spec', 'cypress/integration/**/*'];
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

  console.log(`$ yarn ${command.join(' ')}`);
  const proc = execa('yarn', command, {
    env: newEnv,
    extendEnv: false,
    cwd: path.resolve(__dirname, '..'),
  });

  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);

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
    // eslint-disable-next-line
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
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
  if (coverage) {
    command = ['nyc', 'yarn'].concat(command);
  } else {
    command = ['yarn'].concat(command);
  }

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
    proc.stdout.on('data', stdoutListener);

    let stderr = '';
    const stderrListener = (res: string) => {
      stderr += res;
    };
    proc.stderr.on('data', stderrListener);

    let exited = false;
    const exitListener = () => {
      exited = true;
    };
    proc.on('exit', exitListener);

    let tries = 60;
    let ready = false;
    while (!ready && !exited && tries >= 0) {
      await new Promise((resolve) => setTimeout(() => resolve(), 1000));
      const { stdout: result } = await execa('yarn', ['neo-one', 'check', 'server', '--static-neo-one']);
      try {
        const lines = result.split('\n').filter((line) => line !== '');
        ready = JSON.parse(lines[lines.length - 1]);
      } catch (error) {
        // Ignore errors
      }
      tries -= 1;
    }

    proc.stdout.removeListener('data', stdoutListener);
    proc.stdout.removeListener('data', stderrListener);
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

  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);

  // Wait for server to startup
  await new Promise<void>((resolve) => setTimeout(resolve, 30000));

  proc.stdout.unpipe(process.stdout);
  proc.stderr.unpipe(process.stderr);

  await runCypress({ report, coverage });
};

run({ report: yargs.argv.report, coverage: yargs.argv.coverage, neoOneCoverage: yargs.argv['neo-one-coverage'] })
  .then(() => shutdown(0))
  .catch((error) => {
    console.error(error);
    shutdown(1);
  });
