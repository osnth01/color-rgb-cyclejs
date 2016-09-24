module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 3000
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ],
    preLoaders: [
        { test: /\.js$/, loader: "source-map-loader" }
    ]
  }
}