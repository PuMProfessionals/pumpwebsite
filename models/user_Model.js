//Requirements
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const Schema = mongoose.Schema;

//Define Schema
const userSchema = new Schema ({
    user: String,
    password: String
})

//Define auth token method to generate a new auth token with the org name
userSchema.methods.generateAuthToken = function(user) {
    user = {id: user}
    const token = jwt.sign(user, process.env.PRIVATE_KEY)
    return token
}

//Instantiate User Model
const User = mongoose.model('user', userSchema);

//Export
module.exports = User;