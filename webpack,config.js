module.exports = {
    mode: 'development', // 1
    entry: './src/index.js', // 2
      // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
    output: { // 3
      filename: 'bundle.[hash].js', // 4
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
          { // 1
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              },
              
            ],
          },
          { // 2
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  minimize: true,
                },
              },
            ],
          },
        ],
      },
    
  };