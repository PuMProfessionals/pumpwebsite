const passport = require('passport')
const { ExtractJwt } = require('passport-jwt')
const JWTStrategy = require('passport-jwt').Strategy
    ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user_Model')
require('dotenv').config()

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = process.env.PRIVATE_KEY;

passport.use('jwt', new JWTStrategy(opts, (jwt_payload, done) => {

    User.findOne({user: jwt_payload.id})
    .then(user => {
        if(user)
        {
            done(null, user)
        }
        else {
            done(null, false)
        }
    })
    .catch(err => console.log(err))

}))