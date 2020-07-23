const Koa=require("koa");
const app=new Koa();
const static=require("koa-static");
const path=require("path");
const users=require("./user");
const moment=require("moment")
 
 
const server=require("http").createServer(app.callback());
const io=require("socket.io")(server);

app.use(static(path.resolve(__dirname,"./static")));

io.on("connection",(socket)=>{
    const userList=users.findAll();
    io.emit('resetRoom',userList)
    socket.on("joinRoom",(data)=>{
        const {username}=data;
        const time=moment().format('hh:mm A')
        
        users.addUser(socket.id,git );
        io.emit('joinRoom',{
            username:username,
        })
        socket.send({
            username:"开课吧",
            time,
            msg:"欢迎来到聊天"
        })
        socket.broadcast.send({
            username,
            time,
            msg:"加入聊天室"
        })
    })
    socket.on("message",(data)=>{
        const userInfo=users.findUser(socket.id)
        const time=moment().format('hh:mm A')
        if(userInfo){
            const {username}=userInfo
            io.send({
                username,
                time,
                msg:data
            })
        }
        
    })
    socket.on("disconnect",(data)=>{
        const userInfo=users.findUser(socket.id)
        if(userInfo){
            const {username}=userInfo
            const time=moment().format('hh:mm A')
            socket.broadcast.send({
                username,
                time,
                msg:"离开了聊天室"
            })
            users.deleteUser(socket.id)
            io.emit('resetRoom',userList)
        }
      
    })
})

server.listen(3000);





