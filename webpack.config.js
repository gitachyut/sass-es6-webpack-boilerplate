var path = require('path')
var webpack = require('webpack')
var ExtractPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin  = require('html-webpack-plugin')
var extractPlugin = new ExtractPlugin({
  filename : '[name].css'
})
module.exports = {
  entry : {
    index : path.resolve(__dirname,'src/js/app.js'),
    about : path.resolve(__dirname,'src/js/about.js'),
    vendor: ["jquery"]
  },
  output : {
    path : path.resolve(__dirname,'dist'),
    filename : '[name].js',
    publicPath: '/'
  },
  module: {
      rules: [
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {}
              }
            ]
          },
          {
              test: /\.js$/,
              use : [
                {
                  loader : 'babel-loader',
                  options : {
                    presets : ['es2015']
                  }
                }
              ]
          },
          {
              test: /\.(scss|sass)$/,
              use : extractPlugin.extract({
                use: ['css-loader','postcss-loader','sass-loader']
              })
          }
      ]
  },
  plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
          name: "commons",
    			filename: "commons.js",
    			chunks: ["index", "about"]
        }),
        extractPlugin,
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.resolve(__dirname, './index.html'),
          inject: true,
          chunks: ['index', 'commons']
        }),
        new HtmlWebpackPlugin({
          filename: 'about.html',
          template: path.resolve(__dirname, './about.html'),
          inject: true,
          chunks: ['about', 'commons']
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
  ],

  devServer: {
    contentBase: path.join(__dirname, "public")
  }
}
