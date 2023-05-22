const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    main: {
      import: "./src/index.tsx"
    }
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean:true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,"public/index.html")
    })
  ]
}