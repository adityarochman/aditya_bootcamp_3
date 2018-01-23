const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/register");
const Schema = mongoose.Schema;

var registerSchema = new Schema({
    name: String,
    email: String,
    password: String
});

var Register = mongoose.model("register", registerSchema);

module.exports = Register;