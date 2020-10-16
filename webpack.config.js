const path = require('path');

module.exports = {
    mode: 'development', // 1
    devtool: 'source-map',
    entry: ['@babel/polyfill','./src/index.js'], // 2
      // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
    output: { // 
      filename: 'bundle.js', // 
      path: path.resolve(__dirname, './dist')
    },

    devServer: {
      host : '127.0.0.1',
      contentBase: path.join(__dirname, "/"),
      compress: true,
      hot : true,
      inline: true,
      port: 8080,
      open : true
    },
    
    module: {
        rules: [
          {
            test: /\.js$/,
            include: [
              path.resolve(__dirname, 'src/')
            ],
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
              }
            }
          },
        ],
      },
    
  };