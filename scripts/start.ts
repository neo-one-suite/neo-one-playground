// @ts-ignore
import MiniHtmlWebpackPlugin from 'mini-html-webpack-plugin';
import * as path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import yargs from 'yargs';

const argv = yargs
  .describe('ci', 'Running as part of continuous integration.')
  .default('ci', false)
  .describe('coverage', 'Instrument code for coverage.')
  .default('coverage', false).argv;

const createWebpackConfig = (): webpack.Configuration => ({
  mode: 'development',
  entry: ['core-js/modules/es7.symbol.async-iterator', path.resolve(__dirname, '..', 'src', 'entry.tsx')],
  resolve: {
    mainFields: ['browser', 'main'],
    aliasFields: ['browser'],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, '..', 'root'),
    publicPath: '/',
  },
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'NEO•ONE Playground',
      },
      // tslint:disable-next-line no-any
      template: ({ css, js, title, publicPath }: any) =>
        `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
              <link rel="manifest" href="/manifest.json">
              <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
              <meta name="theme-color" content="#ffffff">
              <title>${title}</title>
              ${MiniHtmlWebpackPlugin.generateCSSReferences(css, publicPath)}
              <style>
              body {
                margin: 0;
                text-rendering: optimizeLegibility;
              }
              </style>
            </head>
            <body style="margin: 0px;">
              <div id="app"></div>
              ${MiniHtmlWebpackPlugin.generateJSReferences(js, publicPath)}
            </body>
          </html>`,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useTranspileModule: true,
            transpileOnly: true,
            useCache: true,
            useBabel: true,
            babelOptions: {
              plugins: argv.ci ? (argv.coverage ? ['babel-plugin-istanbul'] : []) : ['react-hot-loader/babel'],
            },
            configFileName: path.resolve(__dirname, '..', 'tsconfig', 'tsconfig.es2017.esm.json'),
          },
        },
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
      {
        test: /\.woff2?$/,
        loader: 'file-loader',
      },
      {
        test: /\.mp4$/,
        loader: 'file-loader',
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
    path: 'empty',
  },
});

const createServer = () => {
  const webpackConfig = createWebpackConfig();
  const port = 8080;
  const devServer = new WebpackDevServer(webpack(webpackConfig), {
    open: !argv.ci,
    hot: true,
    historyApiFallback: {
      verbose: false,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
      index: '/index.html',
    },
    contentBase: path.resolve(__dirname, '..', 'root'),
    port,
  });

  return devServer.listen(port);
};

const logError = (error: Error) => {
  // tslint:disable-next-line:no-console
  console.error(error);
};

const log = (message: string) => {
  // tslint:disable-next-line:no-console
  console.log(message);
};

Promise.resolve()
  .then(() => {
    const app = createServer();
    const exit = (code: number) => {
      app.close(() => process.exit(code));
    };

    process.on('uncaughtException', (error) => {
      logError(error);
      process.exit(1);
    });

    // tslint:disable-next-line no-any
    process.on('unhandledRejection', (error: Error | any) => {
      logError(error);
    });

    process.on('SIGINT', () => {
      log('Exiting...');
      exit(0);
    });

    process.on('SIGTERM', () => {
      log('Exiting...');
      exit(0);
    });
  })
  .catch(() => {
    process.exit(1);
  });
