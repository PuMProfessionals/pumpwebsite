const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stringParams = {type: String, required: true}

const blogSchema = new Schema(
    {
        Author: stringParams, 
        Title: stringParams,
        Date: stringParams,
        Content: stringParams, //This is until we figure out how to actually store rich text, may or may not use string.
        Image: Buffer //Base-64 encoded string
    }
)

const blogArticle = mongoose.model('blogArticle', blogSchema)

module.exports = blogArticle