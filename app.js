const express = require('express')
const app = express()
const path = require("path")
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'styles')));

const mainRouter = require('./routes/index')
app.use(mainRouter)

app.listen(3000)