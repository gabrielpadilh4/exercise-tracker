const { UserModel } = require('../models/UserModel')
const { ExerciseModel } = require('../models/ExerciseModel')

exports.createNewUser = (req, res, next) => {

    if (req.body.username === '') {
        return res.json({ error: 'username is required' });
    }

    var username = req.body.username

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

    if (req.params._id === '0') {
        return res.json({ error: '_id is required' });
    }

    if (req.body.description === '') {
        return res.json({ error: 'description is required' });
    }

    if (req.body.duration === '') {
        return res.json({ error: 'duration is required' });
    }

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


exports.getUserLogs = async (req, res, next) => {

    var userId = req.params._id;

    var user = await UserModel.findById({ _id: userId })

    var findConditions = { username: user.username };

    if (
        (req.query.from !== undefined && req.query.from !== '')
        ||
        (req.query.to !== undefined && req.query.to !== '')
    ) {
        findConditions.date = {};

        if (req.query.from !== undefined && req.query.from !== '') {
            findConditions.date.$gte = new Date(req.query.from);
        }

        if (findConditions.date.$gte == 'Invalid Date') {
            return res.json({ error: 'from date is invalid' });
        }

        if (req.query.to !== undefined && req.query.to !== '') {
            findConditions.date.$lte = new Date(req.query.to);
        }

        if (findConditions.date.$lte == 'Invalid Date') {
            return res.json({ error: 'to date is invalid' });
        }
    }

    var limit = (req.query.limit !== undefined ? parseInt(req.query.limit) : 0);

    var exercises = await ExerciseModel.find(findConditions).select({ username: 0, _id: 0 }).limit(limit)

    var userLog = {
        ...{ username: user.username, _id: user._id }, ...{ count: exercises.length }, ...{ log: exercises }
    }

    res.json(userLog)

}