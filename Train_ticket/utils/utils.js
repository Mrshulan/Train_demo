
//当数字是个位数的时候转成两位数
const fillZero = n => n > 9 ? n : "0" + n;

//时间对象转字符串
const toDate = date => {

  const DateArg = [
    date.getFullYear(),
    fillZero(date.getMonth() + 1),
    fillZero(date.getDate())
  ];

  return DateArg.join("-")
}

//showapi的请求时间格式
const formatterDateTime = () => {
  var date = new Date()
  var month = date.getMonth() + 1
  var datetime = date.getFullYear()
    + ""// "年"
    + (month >= 10 ? month : "0" + month)
    + ""// "月"
    + (date.getDate() < 10 ? "0" + date.getDate() : date
      .getDate())
    + ""
    + (date.getHours() < 10 ? "0" + date.getHours() : date
      .getHours())
    + ""
    + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
      .getMinutes())
    + ""
    + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
      .getSeconds());
  return datetime;
}

//分钟转字符串
const minuteToString = minute => ~~(minute / 60) + "时" + minute % 60;

// 导出
export default {
  toDate,
  fillZero,
  formatterDateTime,
  minuteToString
}