const { default: mongoose } = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, require: true }
})

exports.UserModel = mongoose.model("UserModel", userSchema)