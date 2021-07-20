const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const cookie = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config()

const socketServer = require("./socketServer");

const LoginRouter = require("./router/LoginRouter");
const RegisterRouter = require("./router/RegisterRouter");
const ChatRouter = require("./router/ChatRouter");
const MainRouter = require("./router/MainRouter");

const {sequelize} = require("./models/index");

const app = express();

sequelize.sync({force:false}).then(value => {
    console.log("연결 성공");
}).catch(reason => {
    console.log(reason);
});

app.set("port",process.env.PORT||8080);
app.set("view engine","html");

nunjucks.configure(path.join(__dirname,"views"),{
    watch:true,
    express:app
});

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(session({
    httpOnly:true,
    secret:process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        Secure: true
    }
}));
app.use(morgan("dev"));

app.use("/",MainRouter);
// login router
app.use("/login",LoginRouter);
// register router
app.use('/register',RegisterRouter);
// chat router (main)
app.use("/chat",ChatRouter);

app.use((req, res, next) => {
    res.status(200).send("잘못된 주소입니다. URL 을 확인해주세요<a href='/'>홈으로가기</a>");
});

// error middleware
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(200).send("오류입니다. 개발자에게 문의 하세요");

});
const server = app.listen(app.get("port"),()=>{
    console.log("server is open!! port : ",app.get("port"));
});

socketServer(server);
