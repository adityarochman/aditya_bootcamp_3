const express = require("express");
const Register = require("../model/register");
const router = express.Router();



router.get("/:id", (req, res) => {

    Register.findById(req.params.id, (error, result) => {
        if (error) {
            res.statusCode(500).json(error);
        }
        else {
            res.json(result)
        }
    });
})

router.get("/", (req, res) => {
    Register.find({}, (error, result) => {
        if (error) {
            res.status(500).json(error);
        }
        else {
            res.json(result)
        }
    });
});

router.post("/", (req, res) => {

    let newRegister = new Register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newRegister.save((error) => {
        if (error) {
            res.statusCode(500).send(error);
        }
        else {
            res.json(newRegister);
        }
    });
});

router.delete("/:id", (req, res) => {

    Register.findByIdAndRemove(req.params.id, (error, result) => {
        if (error) {
            res.statusCode(500).json(error);
        }
        else {
            res.json({ message: "Data Deleted" })
        }
    });
});

router.put("/", (req, res) => {

    let newRegister = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    Register.findByIdAndUpdate(req.body._id, newRegister, (error, result) => {
        if (error) {
            res.statusCode(500).json(error);
        }
        else {
            res.json({ message: "Data Updated" })
        }
    });
});

module.exports = (function () {
    return router;
})();