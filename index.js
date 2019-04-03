/**
 * 1. MODULES AND DEPENDENCIES:
 */
const express = require('express')
const app = express()

const chalk = require('chalk')
const morgan = require('morgan')
const cors = require('cors')
const axios = require('axios')
const mongoose = require('mongoose')



/**
 * 2. SETTING UP:
 */
app.use(cors())
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded())

app.set('view engine', 'pug')



/**
 * 3. ROUTES (temp) / FIXME: 
 */
app.get('/', (req, res, next) => {
    res.send(200, 'API Gateway')
})



/**
 * 4. ERROR HANDLERS:
 */
// 4.1. Catch 404 error and forward
app.use( (req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
// 4.2. Handle Error
app.use( (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        message: err.message,
        error: {}
    })
})



/**
 * 5. LAUNCH SERVER AND DB
 */
const mongoDB = '' // FIXME:
const dbOptions = { useMongooseClient: true }
mongoose.connect(mongoDB, dbOptions)
mongoose.Promise = global.Promise
const db = mongoose.connection
    .once('open', () => {
        console.log(chalk.bgCayan.breenBright.bold('SYS MSG: Mongoose - successful connection!'))

        const server = app.listen('TBU PORT', 'TBU HOST', () => { // FIXME:
            const host = server.address().host
            const port = server.address().port
            console.log(chalk.bgGreen.breenBright.bold('SYS MSG: API Gateway - initialized and accepting request at the following root: http://%s:%s', host, port))
        })

    })
    .on('error', error => console.warn(error))

module.exports = app
