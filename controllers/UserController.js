const { UserModel } = require('../models/UserModel')
const { ExerciseModel } = require('../models/ExerciseModel')

exports.createNewUser = (req, res, next) => {

    var request = req.body

    var user = UserModel({ username: request.username })

    user.save((err, data) => {
        return res.json({ username: data.username, _id: data._id })
    })
}

exports.getUsers = (req, res, next) => {
    var users = UserModel.find().exec((err, data) => {
        return res.json(data)
    })
}

exports.registerUserExercise = async (req, res, next) => {

    var userId = req.params._id
    var { description, duration, date } = req.body

    var user = await UserModel.findById({ _id: userId })

    var dateToSave = new Date()

    if (date != undefined && date != '') {
        dateToSave = new Date(date)
    }

    var exercise = new ExerciseModel({ username: user.username, description: description, duration: duration, date: dateToSave })

    exercise.save((err, data) => {
        return res.json({ data })
    })
}

/*
{
  username: "fcc_test",
  count: 1,
  _id: "5fb5853f734231456ccb3b05",
  log: [{
    description: "test",
    duration: 60,
    date: "Mon Jan 01 1990",
  }]
}
*/
exports.getUserLogs = async (req, res, next) => {

    var userId = req.params._id

    var { from, to, limit } = req.query

    var user = await UserModel.findById({ _id: userId })

    var exercises

    if (from != null && to != null && limit != null) {
        exercises = await ExerciseModel.find({ username: user.username, date: { $gte: from, $lt: to } }).select({ username: 0, _id: 0 }).limit(limit)
    } else {
        exercises = await ExerciseModel.find({ username: user.username }).select({ username: 0, _id: 0 })
    }


    var userLog = {
        ...{ username: user.username, _id: user._id }, ...{ count: exercises.length }, ...{ log: exercises }
    }

    res.json(userLog)

}