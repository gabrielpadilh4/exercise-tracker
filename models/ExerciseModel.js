const { default: mongoose, Mongoose, mongo } = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    username: { type: String, require: true },
    description: { type: String, require: true },
    duration: { type: Number, require: true },
    date: { type: Date, require: true, get(date) { return date.toDateString() } }
}, { versionKey: false, toJSON: { getters: true }, id: false })

exports.ExerciseModel = mongoose.model("ExerciseModel", exerciseSchema)