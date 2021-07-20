const chatPeople = document.querySelector("#chat-count-people");
const chatForm = document.querySelector("#chat-form");
const chatMessage = document.querySelector("#chat-message");
const chatBody = document.querySelector("#chat-body");


const socket = io.connect("http://127.0.0.1:8080/", {
    path: "/socket.io",
    transports: ['websocket']
});
chatForm.addEventListener("submit",(evt)=>{
    evt.preventDefault();
    if (chatMessage.value!==""){
        socket.emit("message",chatMessage.value);
        chatMessage.value = "";
    }else{
        alert("입력해주세요");
    }
})
socket.on("message",(user,data)=>{
    console.log(data);
    const div = document.createElement("div");
    div.textContent = user+":"+data;
    chatBody.append(div)
});
socket.on("userCount",data=>{
    console.log(data);
    chatPeople.textContent = data+"명이 접속중";
});
socket.on("userJoin",(user,data)=>{
    console.log(user,data)

    const div = document.createElement("div");
    div.textContent = user+":"+data;
    chatBody.append(div)

})
socket.on("userOut",(user,data)=>{

    const div = document.createElement("div");
    div.textContent = user+":"+data;
    chatBody.append(div)

})
