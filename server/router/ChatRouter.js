const express = require("express");

const router = express.Router();

router.route("/")
    .get((req, res) => {
        res.render("chatting",{name:req.cookies.user});

    })
    .post((req, res) => {
        console.log(req.body.message);
    });

module.exports = router;
