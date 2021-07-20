const express = require("express");

const router = express.Router();

router.route("/")
    .get((req, res) => {
        console.log(req.cookies.user)
        res.render("index",{isLogin:req.cookies.user});

    })
    .post((req, res) => {
        console.log(req.cookies);

    });

module.exports = router;
