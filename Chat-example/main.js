let socket = io();
// 列表list，输入框content，按钮sendBtn
let list = document.getElementById('list'),
    input = document.getElementById('input'),
    sendBtn = document.getElementById('sendBtn');

let userId = '';

// 发言的方法
function send() {
    console.log('socket.connected: ',socket.connected);
    let value = input.value;
    if (value) {
        // 发送消息给服务器
        socket.emit('message', value);
        input.value = '';
    } else {
        alert('输入的内容不能为空！');
    }
}
// 回车发言的方法
function keySend(event) {
    const key = event.keyCode;
    if (key === 13) {
        send();
    }
}
// 私聊的方法
function privateChat(event) {
    let target = event.target;
    let user = target.innerText;
    if (target.className === 'user') {
        input.value = `@${user} `;
    }
}
// 进入房间(群)
function join(room) {
    socket.emit('join', room);
}
// 离开房间(群)
function leave(room) {
    socket.emit('leave', room);
}

// 点击按钮进行发言
sendBtn.onclick = send;
// 按回车进行发言
input.onkeydown = function (event) {
    keySend(event);
};
// 添加私聊
list.onclick = function (event) {
    privateChat(event);
};
// 监听进入房间后(ed过去式)，将进入房间按钮隐藏
socket.on('joined', room => {
    document.getElementById(`join-${room}`).style.display = 'none';
    document.getElementById(`leave-${room}`).style.display = 'inline-block';
});
// 监听离开房间后(ed过去式)，将离开房间按钮隐藏
socket.on('leaved', room => {
    document.getElementById(`join-${room}`).style.display = 'inline-block';
    document.getElementById(`leave-${room}`).style.display = 'none';
});

// 监听与服务端的连接
socket.on('connect', () => {
    console.log('连接成功');
    socket.emit('getHistory');
});
// 接收历史消息
socket.on('history', history => {
    // history拿到的是一个数组，所以用map映射成新数组，然后再join一下连接拼成字符串
    let html = history.map(data => {
        return `<li class="list-group-item">
                            <p style="color: #ccc;"><span class="user" style="color:${data.color}">${data.user} </span>${data.createAt}</p>
                            <p class="content" style="background-color: ${data.color}">${data.content}</p>
                        </li>`;
    }).join('');
    list.innerHTML = html + '<li style="margin: 16px 0;text-align: center">以上是历史消息</li>';
    // 将聊天区域的滚动条设置到最新内容的位置
    list.scrollTop = list.scrollHeight;
});
// 接收服务端传过来的消息
socket.on('message', data => {
    // 输出测试一波
    console.log(data);
    console.log('userId', userId);
    let li = document.createElement('li');
    li.className = 'list-group-item';
    // 如果用户id与传过来的id相同就表示是自己
    li.style.textAlign = userId === data.id ? 'right' : 'left';
    li.innerHTML = `<p style="color: #ccc;"><span class="user" style="color:${data.color}">${data.user} </span>${data.createAt}</p>
                    <p class="content" style="background-color: ${data.color}">${data.content}</p>`;
    list.appendChild(li);
    // 将聊天区域的滚动条设置到最新内容的位置
    list.scrollTop = list.scrollHeight;
});
// 获取对应的用户id
socket.on('getId', id => {
    userId = id;
});

{
// 官方测试案例
/* <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  $(function () {
    var socket = io();

    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    // 接收到服务端传来的name(message)匹配的消息 集体广播io.emit & 单独通知socket.emit
    socket.on('io message', function(msg){

      $('#messages').append($('<li>').text(msg));
      window.scrollTo(0, document.body.scrollHeight);

    });
    socket.on('socket message', function(msg){

      $('#messages').append($('<li>').text(msg));
      window.scrollTo(0, document.body.scrollHeight);
    });
  });
</script> */
}

