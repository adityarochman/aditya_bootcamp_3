const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/login");
const Schema = mongoose.Schema;

var loginSchema = new Schema({
    username : String,
    // email : String,
    password : String
})

var Login = mongoose.model("login", loginSchema);

module.exports = Login;