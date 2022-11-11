require('dotenv').config()

const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoutes = require('./routes/UserRoutes')

app.use('/api', userRoutes)

if (!process.env.DISABLE_XORIGIN) {
    app.use(function (req, res, next) {
        var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
        var origin = req.headers.origin || '*';
        if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
            console.log(origin);
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        }
        next();
    });
}


const mongoose = require('mongoose')

var dbState = [{
    value: 0,
    label: "disconnected"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
},
{
    value: 3,
    label: "disconnecting"
}];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value == state).label, "to db");
})

app.listen(port, () => {
    console.log('Node is listening on port ' + port + '...')
})