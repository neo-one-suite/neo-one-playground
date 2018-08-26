// tslint:disable no-console
import execa from 'execa';
import isRunning from 'is-running';
import yargs from 'yargs';

yargs.describe('ci', 'Running as part of continuous integration.').default('ci', false);

const runCypress = async ({ ci }: { readonly ci: boolean }) => {
  // tslint:disable-next-line no-unused
  const { NODE_OPTIONS, TS_NODE_PROJECT, ...newEnv } = process.env;
  const command = ci
    ? [
        'cypress',
        'run',
        '--reporter',
        'mocha-multi-reporters',
        '--reporter-options',
        'configFile=mocha.json',
        '--spec',
        'cypress/integration/**/*',
      ]
    : ['cypress', 'run', '--spec', 'cypress/integration/**/*'];

  const proc = execa('yarn', command, {
    env: newEnv,
    extendEnv: false,
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

const neoOne = (command: ReadonlyArray<string>): execa.ExecaChildProcess => {
  console.log(`$ neo-one ${command.join(' ')}`);

  return execa('neo-one', command);
};

const run = async ({ ci }: { readonly ci: boolean }) => {
  await neoOne(['build', '--reset']);
  const proc = execa('node', ['-r', 'ts-node/register/transpile-only', './scripts/start.ts', '--ci'], {
    env: {
      TS_NODE_PROJECT: 'tsconfig/tsconfig.es2017.cjs.json',
    },
  });
  mutableCleanup.push(createKillProcess(proc));

  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);

  // Wait for server to startup
  await new Promise<void>((resolve) => setTimeout(resolve, 30000));

  proc.stdout.unpipe(process.stdout);
  proc.stderr.unpipe(process.stderr);

  await runCypress({ ci });
};

run({ ci: yargs.argv.ci })
  .then(() => shutdown(0))
  .catch((error) => {
    console.error(error);
    shutdown(1);
  });
