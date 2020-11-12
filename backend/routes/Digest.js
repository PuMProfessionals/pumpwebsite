const express = require('express')
const router = express.Router()
const passport = require('passport')

let digestEntry = require('../models/digest_Model')

app.use(passport.initialize())
require('./config/passport-config')

router.route('/getOpps').get((req, res)=>{
    digestEntry.find({_id: req.params._id, Title: req.params.title, Author: req.params.author, Location: req.params.location})
    .then(digestEntries => res.json(digestEntries))
    .catch(err => res.json(err))
})

router.route('/addOpps').post(passport.authenticate('jwt', {session: false}), (req, res)=>{

    var newOpp = new digestEntry({
        Title: req.body.title,
        Author: req.body.author,
        Image: req.body.image,
        Location: req.body.location,
        Description: req.body.description
    })

    newOpp.save()
    .then(newOpp => res.json(newOpp))
    .catch(err => res,json(err))
})

router.route('/updateOpps').put(passport.authenticate('jwt', {session: false}), (req, res)=>{

    const id = req.body._id
    const newEntry = req.body

    digestEntry.findOneAndUpdate({_id: req.body._id}, newEntry, {new: true})
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

router.route('/deleteOpps').delete(passport.authenticate('jwt', {session: false}), (req, res)=>{
    const id = req.body._id

    digestEntry.findOneAndDelete({_id: id})
    .then(data => res.send("Success!: " + data))
    .catch(err => res.json(err))
})

module.exports = router