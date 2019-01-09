const path = require('path')
const HappyPack = require('happypack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  entry: './index',
  output: {
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, './src')],
        use: 'happypack/loader?id=ts',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HappyPack({
      id: 'ts',
      threads: 4,
      loaders: [
        {
          path: 'ts-loader',
          query: {
            happyPackMode: true,
            transpileOnly: true,
          },
        },
      ],
    }),

    // off
    // new ForkTsCheckerWebpackPlugin({
    //   checkSyntacticErrors: true,
    // }),
  ],

  stats: {
    errors: true,
    errorDetails: true,
  },
}
