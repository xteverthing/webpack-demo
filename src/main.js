// 加载 aa 模块
require('./aa.js')
console.log('这是main模块, 哈哈')

// 要求实现隔行变色, 通过jquery来做
const $ = require('jquery')
const moment = require('moment')

// 导入css
require('./css/index.css')
// 导入less
require('./less/header.less')

// 导入字体图标的核心css文件
require('./fonts/iconfont.css')

// 入口函数
$(function() {
  $('li:nth-child(odd)').css('color', 'red')
  $('li:nth-child(even)').css('color', 'green')

  $('li:last-child').text(moment().format('YYYY-MM-DD HH:mm:ss'))
})

// 默认webpack不会对js进行处理, 输出的还是箭头函数
// es6中的语法, 在低版本浏览器中, 有兼容性的
// 需要: 将es6的语法, 转换成低版本的语法, 让浏览器 能够识别
const fn = () => {
  console.log('哇哇')
}