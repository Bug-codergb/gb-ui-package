const path = require("path");
module.exports = {
  entry: {
    main: {
      import: path.resolve(__dirname, "./src/index.ts")
    }
  },
  output: {
    filename: "bundle.js",
    path:path.resolve(__dirname,"./build")
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    hot: true,
    port:8888
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader:"babel-loader"
          }
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader:"style-loader"
          },
          {
            loader:"css-loader"
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader:"style-loader"
          },
          {
            loader:"css-loader"
          },
          {
            loader:"less-loader"
          }
        ]
      }
    ]
  }
}