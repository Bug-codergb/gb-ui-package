const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  entry: {
    main: {
      import: "./src/index.tsx"
    }
  },
  output: {
    filename: "[contenthash].bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
    library: {
      name: "gb_ui_package",
      type:"var"
    }
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
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/img/[hash][ext]',
        },
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        test:/\.css$/i
      })
    ],
    minimize: true,
    splitChunks: {
      chunks:"all"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,"public/index.html")
    }),
    new CssMinimizerPlugin()
  ]
}
//