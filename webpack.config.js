// 导入html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin') 

const path = require('path')
// webpack.config.js 固定文件名, 配置webpack的配置文件
// webpack基于node的工具, node的语法, 在webpack中可以直接用
// 在这里定义配置, 并导出
module.exports = {
  // 配置入口, 从哪个文件开始打包
  entry: "./src/main.js",
  // 配置出口, 打包到哪里去
  output: {
    // 出口文件的目录, 必须是绝对路径
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // 配置打包模式, 压缩还是不压缩
  mode: "development",
  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],

  // 可以配置一些模块的加载规则
  module: {
    // 可以配置多个规则, 后面的两节课, 都是在配置不同文件类型的不同加载规则
    rules: [
      // 处理css, 匹配以css结尾的文件
      {
        
        test: /\.css$/,
        // css-loader: 让webpack具备解析css的能力, 解析css内容
        // style-loader: 会将解析得到的css内容, 动态创建style标签的方式, 添加到页面中
        // 解析顺序, 从右往左, 使用包解析的
        use: [ 'style-loader', 'css-loader' ]
      },

      // 处理less
      {
        // 匹配 less 后缀的文件
        test: /\.less$/,
        // 使用loader, 是从后往前使用加载的
        // use: [{
        //     loader: "style-loader"  // 添加到页面中去
        // }, {
        //     loader: "css-loader"  // 利用 css-loader, webpack就可以识别了
        // }, {
        //     loader: "less-loader"   // 将 less 转成 css
        // }],
        use: ["style-loader", "css-loader", "less-loader"]
      },

      // 处理图片的
      // limit 表示限制
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 8k
              // (1) 如果小于 30k, 转成 base64, 转成字符串
              // (2) 如果大于 30k, 会自动使用 file-loader, 转成一个单独的文件, 加载
              limit: 8 * 1024
            }
          }
        ]
      },

      // 处理字体图标的
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024
            }
          }
        ]
      },

      // 处理视频, 音频
      {
        test: /\.(mp3|mp4|avi)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024
            }
          }
        ]
      },

      // 配置高版本的js的解析
      {
        // 可以匹配 .js 
        test: /\.js$/,
        // 排除项, 不需要对哪些内容进行处理
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  // 配置webpack-dev-server
  devServer: {
    open: true,  // 启动服务器自动打开浏览器
    port: 3000,  // 端口号
    hot: true    // 配置热更新, 差异化更新
  }
}