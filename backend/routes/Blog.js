const express = require('express')
const router = express.Router()
const passport = require('passport')

let blogArticle = require('../models/blog_model')

app.use(passport.initialize())
require('./config/passport-config')

router.route('/getArticles').get((req, res)=>{
    blogArticle.find({_id: req.params._id, Title: req.params.title, Author: req.params.author, Date: req.params.date})
    .then(blogArticles => res.json(blogArticles))
    .catch(err => res.json(err))
})

router.route('/addArticle').post(passport.authenticate('jwt', {session: false}), (req, res)=>{

    var newArticle = new blogArticle({
        Title: req.body.title,
        Author: req.body.author,
        Image: req.body.image,
        Content: req.body.Content
    })

    newArticle.save()
    .then(newArticle => res.json(newArticle))
    .catch(err => res,json(err))
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

    blogArticle.findOneAndDelete({_id: id})
    .then(data => res.send("Success!: " + data))
    .catch(err => res.json(err))
})

module.exports = router