const express = require("express");
const {User} = require("../models");

const router = express.Router();

router.route("/")
    .get((req, res) => {
        console.log(req.cookies);
        res.render("register")

    })
    .post(async (req, res) => {
        console.log(1)
        if(req.body.checkUnique){
            // nickName 으로 find 했을때 null 이나오면 입력한 아이디가 고유한 아이디임
            console.log(req.body.nickName);
            const isUnique = await User.findOne({
                where:{
                    userName:req.body.nickName
                }
            });
            console.log(isUnique)
            res.json({isUnique:isUnique === null});
        }else{
            await User.create({
                userId:req.body.userId,
                userPwd:req.body.userPwd,
                age:req.body.age,
                userName:req.body.userName,
                gender:req.body.gender
            });
            res.json({success:true});
        }
    });

module.exports = router;
