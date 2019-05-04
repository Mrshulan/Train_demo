var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(require('express').static(__dirname));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// 保存连接的socket 实例
let socketObj = {}
// 记录socket.id 用来查找对应的用户
let mySocket = {}
// 保存最近20条消息
let msgHistory = []

const SYSTEM = '系统通知'

let userColor = ['#00a1f4', '#0cc', '#f44336', '#795548', '#e91e63', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#ffc107', '#607d8b', '#ff9800', '#ff5722'];

// 乱序排列方法，方便把数组打乱
function shuffle(arr) {
    let len = arr.length, random;
    while (0 !== len) {
        // 右移位运算符向下取整
        random = (Math.random() * len--) >>> 0; 
        // 解构赋值实现变量互换
        [arr[len], arr[random]] = [arr[random], arr[len]]; 
    }
    return arr;
}


io.on('connection', socket => {
  // 这里每次连接都会创建一个新的 socket
  let username;
  let color
  let rooms = [];

  mySocket[socket.id] = socket;

  socket.on('message', msg => {
    if(username) {

      let private = msg.match(/@([^ ]+) (.+)/)
      // 私聊消息
      if(private) {
        let toUser = private[1]
        let content = private[2]

        let toSocket = socketObj[toUser]

        if(toSocket){
          toSocket.send({
            user: username,
            content,
            color,
            createAt: new Date().toLocaleString()
          })
        }
      // 公共消息
      } else {
        // 若是加入了房间
        if(rooms.length) {
          // 用来存储进入房间内的对应的socket.id
          let socketJson = {}

          rooms.forEach(room => {
            // 取得进入房间内所对应的所有sockets的hash值，它便是拿到的socket.id
            let roomSockets = io.sockets.adapter.rooms[room].sockets;
            // 进行一个去重，在socketJson中只有对应唯一的socketId 也就是一个战队
            Object.keys(roomSockets).forEach(socketId => {
              console.log('socketId', socketId);

              if(!socketJson[socketId]) {
                socketJson[socketId] = 1
              }
            })
          })

          Object.keys(socketJson).forEach(socketId => {
            mySocket[socketId].emit('message', {
              user: username,
              content: msg,
              color,
              createAt: new Date().toLocaleString()
            })
          })
        // 所有客户端的发
        } else {
          io.emit('message', {
            user: username,
            content: msg,
            color,
            createAt: new Date().toLocaleString()
          })

          msgHistory.push({
            user: username,
            content: msg,
            color,
            createAt: new Date().toLocaleString()
          })
        }
      }
    } else {
      // 第一次进入的话，就可以记录其用户名
      username = msg
      color = shuffle(userColor)[0]
      // 广播除去自己之外的其他人
      socket.broadcast.emit('message', {
        user: SYSTEM,
        content: `${username}加入的聊天`,
        color,
        createAt: new Date().toLocaleString()
      })
      // 如： socketObj = { '周杰伦': socket, '谢霆锋': socket }
      socketObj[username] = socket;
    }
  })
  // 获取最新20条消息
  socket.on('getHistory', () => {
    if(msgHistory.length) {
      let history = msgHistory.slice(msgHistory.length - 20)

      socket.emit('history', history)
    }
  })
  // 加入群聊
  socket.on('join', room => {
    // 判断用户是否进入的房间
    if(username && rooms.indexOf(room) === -1) {
      socket.join(room) 
      rooms.push(room)

      socket.emit('joined', room)
      // 给自己看的
      socket.send({
        user: SYSTEM,
        content: `你已经加入${room}战队`,
        color,
        createAt: new Date().toLocaleString()
      })
    }
  })
  // 离开群聊
  socket.on('leave', room => {
    let index = rooms.indexOf(room)

    if(index !== -1) {
      socket.leave(room)
      rooms.splice(index, 1)
      socket.emit('leaved', room)

      socket.send({
        user: SYSTEM,
        content: `你已经离开${room}战队`,
        createAt: new Date().toLocaleString()
      })
    }
  })


})

// // 
// // io.emit(name, msg) === io.sockets.emit() 表示套接字组 集体广播
// // socket.emit(name, msg) 表示 用于与每个单独的连接进行通信 只发个发送者客户端
// // socket.broadcast.emit(name, msg) 除了发送者以外的所有客户端
// // socket.send(msg) 给自己看的

// // 建立连接
// io.on('connection', function(socket){
//   console.log('连接成功')
//   // 接收数据(chat message) 二参回调触发
//   socket.on('chat message', function(msg){
//     // io.emit()会向大厅和所有人房间内的人广播 io emit 发送给客户端 msg
//     // 服务端发送message事件，把msg消息再发送给客户端
//     io.emit('io message', 'io广播 你输入的数据的是 ' + msg);
//     socket.emit('socket message', 'socket 发你 你输入的数据' + msg)
//   });
// });

http.listen(port, function(){
  console.log('listening on *:' + port);
});
