const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const router = require('./routes/route')

const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended : false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'));

let accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), {flags: 'a'})
// setup the logger
app.use(morgan('combined', { stream: accessLogStream}))

app.use(router)

const port = 3001

app.listen(process.env.PORT || port, (err) => {
    if(err)
    console.log('Error starting the server : ' + err)
    else 
    console.log('Server started on : ' + port )
})