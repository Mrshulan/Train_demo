import pageModule from "../../lib/Page.js"
import $test from "../../common/test.js";

const $app = getApp()
const $page = new pageModule()
const appExample = $app.example;

console.log($app, $page)
console.log($app.globalData === appExample.globalData, '都说了是浅拷贝')
console.log($app.pageData === appExample.pageData, '都说了是浅拷贝')

$app.globalData.name = 'index'
appExample.globalData.hobbies = "吃饭睡觉"

// $testd实例 extend this 指向当前$pagepage
$page.extend($test)

$page.addEvent('onLoad', function () {
  wx.navigateTo({
    url: '/pages/home/sub'
  })
})
// 这个时候onload事件数组 length = 2

$page.start()