// tslint:disable no-console
import execa from 'execa';
import isRunning from 'is-running';
import * as path from 'path';
import { timer } from 'rxjs';

const runCypress = async () => {
  // tslint:disable-next-line no-unused
  const { NODE_OPTIONS, TS_NODE_PROJECT, ...newEnv } = process.env;
  const cypressRetries = '5';
  const finalEnv = { ...newEnv, CYPRESS_RETRIES: cypressRetries };
  const command = ['cypress', 'run', '--browser', 'chrome', '--spec', 'cypress/integration/**/*'];

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

const neoOne = async (): Promise<void> => {
  const command = ['neo-one', 'build', '--reset', '--no-progress'];

  console.log(`$ ${command.join(' ')}`);
  await execa(command[0], command.slice(1), {
    stdio: 'inherit',
  });
};

const run = async () => {
  await neoOne();
  const proc = execa(
    'node',
    ['-r', 'ts-node/register/transpile-only', path.resolve(__dirname, 'start.ts'), '--ci', '--cypress'],
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

  await runCypress();
};

run()
  .then(() => shutdown(0))
  .catch((error) => {
    console.error(error);
    shutdown(1);
  });
