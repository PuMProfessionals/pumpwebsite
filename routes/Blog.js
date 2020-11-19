const express = require('express')
const app = express()
const router = express.Router()
const passport = require('passport')

let blogArticle = require('../models/blog_Model')

app.use(passport.initialize())
require('../config/passport-config')

router.route('/getArticles').get((req, res)=>{
    blogArticle.find()
    .then(blogArticles => res.json({blogArticles}))
    .catch(err => res.json(err))
})

router.route('/addArticle').post(passport.authenticate('jwt', {session: false}), (req, res)=>{

    var newArticle = new blogArticle({
        Title: req.body.title,
        Author: req.body.author,
        Date: req.body.date,
        Image: req.body.image,
        Content: req.body.content
    })

    newArticle.save()
    .then(newArticle => res.json(newArticle))
    .catch(err => res.json(err))
})

router.route('/updateArticle').put(passport.authenticate('jwt', {session: false}), (req, res)=>{

    const id = req.body._id
    const newEntry = req.body

    blogArticle.findOneAndUpdate({_id: req.body._id}, newEntry, {new: true})
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

router.route('/deleteArticle').delete(passport.authenticate('jwt', {session: false}), (req, res)=>{
    const id = req.body._id

    blogArticle.findOneAndDelete({Title: req.body.title})
    .then(data => res.send(data))
    .catch(err => res.json(err))
})

module.exports = router