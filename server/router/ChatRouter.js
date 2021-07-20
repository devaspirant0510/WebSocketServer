const express = require("express");

const router = express.Router();

router.route("/")
    .get((req, res) => {
        if(req.cookies.user){
            res.render("chatting",{name:req.cookies.user});
        }else{
            res.redirect("/");
        }

    })
    .post((req, res) => {
        console.log(req.body.message);
    });

module.exports = router;
