const express = require('express')
const app = express()
const router = express.Router()
const passport = require('passport')

let digestEntry = require('../models/digest_Model')


//THIS IS THE MODEL FOR THE DIRECT ENTRIES, NOT DIGEST. 
app.use(passport.initialize())
require('../config/passport-config')

router.route('/getOpps').get((req, res)=>{
    digestEntry.find({})
    .then(digestEntries => res.json({digestEntries}))
    .catch(err => res.json(err))
})

router.route('/addOpps').post(passport.authenticate('jwt', {session: false}), (req, res)=>{

    var newOpp = new digestEntry({
        Title: req.body.title,
        Organization: req.body.org,
        Location: req.body.location,
        Description: req.body.description
    })

    newOpp.save()
    .then(newOpp => res.json(newOpp))
    .catch(err => res.json(err))
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

    digestEntry.findOneAndDelete({Title: req.body.title})
    .then(data => res.send(data))
    .catch(err => res.json(err))
})

module.exports = router