const express = require('express')
const programmingquiz = require('../data/programming-q.json')
const theofficequiz = require('../data/theoffice-q.json')
const regularshowquiz = require('../data/regularshow-q.json')
const router = express.Router()

router.get('/', function (req, res) {
    res.render("index")
})

router.post('/quiz', async function (req, res) {
    const { quiztype } = req.query

    //getting length of quiztype
    const getDataLength = () => {
        switch (quiztype) {
            case "programmingquiz":
                return programmingquiz.data.length
            case "theofficequiz":
                return theofficequiz.data.length
            case "regularshowquiz":
                return regularshowquiz.data.length
        }
    }

    //random is the quiztype length Randomized to get a num
    let random = Math.floor(Math.random() * await getDataLength())
    res.render('quiz', { quiztype, random, programmingquiz, theofficequiz, regularshowquiz })
})

router.post('/clicked', function (req, res) {
    console.log(req.query.btn)
    console.log(programmingquiz.data[req.query.random].answer)
    if (req.query.btn === programmingquiz.data[req.query.random].answer) {
        console.log("correct")
        // res.redirect("/correct")
    } else {
        console.log("incorrect")
        // res.redirect("/incrorrect")
    }
    res.render("quiz")
})

//ERROR 
router.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

//ERROR 
router.use((err, req, res, next) => {
    res.locals.error = err
    res.status(err.status)
    res.render("error")
})

module.exports = router
