
const socket=io("ws://localhost:3000");


// socket.emit("joinRoom",'hhh');

const urlSearchParams=new URLSearchParams(location.search);
const username=urlSearchParams.get("username");
const room=urlSearchParams.get("room");
document.querySelector("#room-name").innerText=room
 
socket.emit("joinRoom",{username,room});

socket.on("message",data=>{
    const {username,msg,time}=data;
    let messageDiv=document.createElement("div");
    messageDiv.classList.add("message")
    messageDiv.innerHTML=`<p class='meta'>${username} <span>${time}</span></p><p>${msg}</p>`;
    document.querySelector(".chat-messages").append(messageDiv)
})
socket.on("resetRoom",data=>{
    const frag=document.createDocumentFragment();
   data.forEach(user=>{
    console.log(user)
    let liElement=document.createElement("li");
    liElement.innerText=user.username;
    frag.appendChild(liElement)
   })
   document.querySelector("#users").innerHTML="";
    document.querySelector("#users").append(frag)
})
socket.on("joinRoom",data=>{
    const {username}=data;
    let liElement=document.createElement("li");
    liElement.innerText=username;
    document.querySelector("#users").append(liElement)
})
const sendBtn=document.querySelector("#sendBtn");
let msgInput=document.querySelector("#msg");
sendBtn.onclick=function(){
    const msg=msgInput.value;
    socket.send(msg);
    msgInput.value=""
    return false;

}
 