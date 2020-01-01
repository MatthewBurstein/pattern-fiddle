var path = require("path")
var { CheckerPlugin } = require("awesome-typescript-loader")

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "awesome-typescript-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new CheckerPlugin()],
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  }
}
