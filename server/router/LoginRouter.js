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
                userId:req.body.userId,
                pwd:req.body.pwd
            });
            if(data==null){
                res.json({success:false});
            }else{
                res.json({success:true});
            }
        }catch (e){
            console.log(e);

        }
    });

module.exports = router;
