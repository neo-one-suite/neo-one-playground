module.exports = {
  entry: __dirname + '/src/entry.tsx',
  output: {
    path: __dirname + '/root',
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [__dirname + '/src', __dirname + '/one/generated'],
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useTranspileModule: true,
            transpileOnly: true,
            configFileName: 'tsconfig/tsconfig.es2017.esm.json',
          },
        },
      },
      {
        test: /\.svg$/,
        include: [__dirname + '/root'],
        loader: 'file-loader',
      },
      {
        test: /\.woff2?$/,
        include: [__dirname + '/root'],
        loader: 'file-loader',
      },
      {
        test: /\.mp4$/,
        include: [__dirname + '/root'],
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: [
      '.wasm',
      '.mjs',
      '.js',
      '.json',
      '.mjsx',
      '.jsx',
      '.css',
      '.ts',
      '.tsx',
      '.svg',
      '.woff',
      '.woff2',
      '.mp4',
    ],
  },
  devServer: {
    contentBase: './root',
  },
  node: {
    fs: 'empty',
    path: 'empty',
  },
};
