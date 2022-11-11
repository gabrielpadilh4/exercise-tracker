const { default: mongoose } = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, require: true }
}, { versionKey: false })

exports.UserModel = mongoose.model("UserModel", userSchema)