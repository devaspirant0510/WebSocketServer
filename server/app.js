const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");

const socketServer = require("./socketServer");

const LoginRouter = require("./router/LoginRouter");
const RegisterRouter = require("./router/RegisterRouter");
const ChatRouter = require("./router/ChatRouter");

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

//main page
app.get("/",(req, res) => {
    res.render("index");

});
// login router
app.use("/login",LoginRouter);
// register router
app.use('/register',RegisterRouter);
// chat router (main)
app.use("/chat",ChatRouter);

// error middleware
app.use((err,req,res,next)=>{

});
const server = app.listen(app.get("port"),()=>{
    console.log("server is open!! port : ",app.get("port"));
});

socketServer(server);
