const express = require('express')

const router = express.Router()

const userController = require('../controllers/UserController')

router.post('/users', userController.createNewUser)

router.get('/users', userController.getUsers)

router.post('/users/:_id/exercises', userController.registerUserExercise)

router.get('/users/:_id/logs', userController.getUserLogs)

module.exports = router