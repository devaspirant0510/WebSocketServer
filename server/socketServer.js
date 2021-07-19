const socketIOServer = require("socket.io");

module.exports = (server)=>{
    const io = socketIOServer(server, {path: "/socket.io"});
    io.on("connection",(socket)=>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`${ip}에서 접속함`);

        io.emit("userCount",io.engine.clientsCount);
        socket.on("message",(data)=>{
            console.log(`${ip}에서 보낸 메시지 ${data}`);

            io.emit("message",data);
        })
    });

}
