const express = require("express");
const Login = require("../model/login");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/new", (req, res) => {

    let newLogin = new Login({
        username: req.body.username,
        // email: req.body.email,
        password: req.body.password
    });

    newLogin.save((error) => {
        if (error) {
            res.statusCode(500).send(error);
        }
        else {
            res.json(newLogin);
        }
    });
});

router.post("/login", (req, res) => {

    Login.findOne({ username: req.body.username, password: req.body.password }, (error, result) => {
        // email: req.body.email,
        if (error) {
            res.status(500).json(error);

        } else if (!result) {
            res.status(404).json({ messsage: "User not found" });
        }
        else {
            const payload = {
                id: result._id,
                username: result.username
            };

            const token = jwt.sign(payload, "secretkey", { expiresIn: 1000 });
            res.json({ token: token });
        }
    })
});


module.exports = (function(){
    return router;
})();