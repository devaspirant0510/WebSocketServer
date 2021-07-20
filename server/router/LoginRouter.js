const express = require("express");
const {User} = require("../models");
const router = express.Router();

router.route("/")
    .get((req, res) => {
        res.render("login")
    })
    .post(async (req, res) => {
        try{
            const data =await User.findOne({
                where:{
                    userId:req.body.userId,
                    userPwd:req.body.pwd
                }
            });
            if(data==null){
                res.json({success:false});
            }else{
                const key = new Date().getTime();
                res.cookie("user",encodeURIComponent(req.body.userId),{
                    httpOnly: true,
                });
                req.session.user = encodeURIComponent(req.body.userId);
                res.json({success:true});
            }
        }catch (e){
            console.log(e);

        }
    });

module.exports = router;
