const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stringParams = {type: String, required: true}

const digestSchema = new Schema ({
    Title: stringParams, 
    Author: stringParams, 
    Image: Buffer, 
    Location: stringParams, 
    Description: stringParams
})

const digestEntry = mongoose.model('digestEntry', digestSchema)

module.exports = digestEntry