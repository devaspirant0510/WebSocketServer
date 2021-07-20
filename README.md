# WebSocketServer
Node.js Android

# Node,Android Version
<details>
  <div markdown="1">
   
    
# Node Version
    
v16.2.0
    
# npm Version
    
7.13.0
# npm package
express : 4.17.1

socket.io : 2.4.1 (socket.io version 4.+ not work with android)

# android studio
4.2.1

# android dependencies
'io.socket:socket.io-client:1.0.1'
  </div>
</details>

# Node Setting
### terminal
```
npm init
npm i express socket.io@2.4.1 nodemon sequelize mysql2 sequelize-cli
npx sequelize init
```
### folder
```
config
  └─config.json
migrations
models
  ┝─Chat.js
  ┝─User.js
  └─index.js
public
  ┝─socketClient.js
  └─chatStyle.css
models
  ┝─LoginRouter.js
  ┝─ChatRouter.js
  └─ChatRouter.js
seeders
views
  └─index.html
app.js
package.json
package-lock.json
socketServer.js
```
# API 호출
|function|method|url|body|
|--------|------|---|----|
|login|post|url:8080/login|{userId:(String),userPwd:(String)}|
|register|post|url:8080/register|{checkUnique:false,userId:(String),userPwd:(String),age:(int),userName:(String,unique),gender:(boolean)}
|check name isUnique|post|url:8080/register|{checkUnique:true,nickName:(String)}|

