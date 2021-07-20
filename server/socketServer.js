const socketIOServer = require("socket.io");

function parseCookie(ck) {
    const box = {};
    if (ck) {
        ck.split(";").map(v => {
            box[v.split("=")[0].trim()] = decodeURIComponent(v.split("=")[1]);
        });
        return box;
    }
    return {};
}
module.exports = (server)=>{
    const io = socketIOServer(server, {path: "/socket.io"});
    io.on("connection",(socket)=>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const userName = parseCookie(socket.request.headers.cookie).user;
        socket.broadcast.emit("userJoin",userName,"유저가 입장했습니다.");
        io.emit("userCount",io.engine.clientsCount);
        socket.on("message",(data)=>{
            console.log(`${ip}에서 보낸 메시지 ${data}`);

            io.emit("message",userName,data);
        })
        socket.on("disconnect",()=>{
            socket.broadcast.emit("userOut",userName,"유저가 퇴장했습니다.")
        })
    });

}
