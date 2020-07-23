服务端启动服务以后 需要通过监听 on('connection')获取客户端的第一次握手连接，
连接以后每个客户端有一个socket ，可以通过 监听客户端发过来的event来进行事务逻辑处理
每个客户端有一个唯一的socket.id指定，通过socket.send发送message类型给客户端，或者通过
自定义事件 emit('chatmessage')来发送消息返回给当前客户端，也可以通过socket.broadcast.send来发送
给除该客户端以外的其他客户端，如果要全员发送需要通过io.send或io.emit来发送数据



客户端通过访问js文件  socket.io/socket.io.js来获取io接口，然后在接口初始化客户端的webosocket

通过监听 message或者其他自定义事件来获取服务端发送的数据
通过send或者emit向服务器发送数据
