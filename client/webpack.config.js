const HtmlWebpackPlugin = require('html-webpack-plugin');

function config(env) {
  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: ['node_modules']
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'postcss-loader' ],
        },
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: ['babel-loader', 'ts-loader']
        }
      ]
    },
    devServer: {
      contentBase: './dist',
      port: 8001,
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/graphql': {
          target: env.API_URL,
          secure: false,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.tpl.html',
        chunksSortMode: 'dependency',
      }),
    ],
  };
}

module.exports = config;
