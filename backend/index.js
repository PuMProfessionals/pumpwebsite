const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const passport = require('passport')

const port = process.env.PORT
const uri = process.env.URI

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("MongoDB Connected!")
})
.catch(err => console.log(err))

app.use(express.json())
app.use(cors())
app.use(passport.initialize())
require('./config/passport-config')

const DigestRouter = require('./routes/Digest')
app.use('/api/digest', DigestRouter)

const BlogRouter = require('./routes/Blog')
app.use('/api/blog', BlogRouter)


app.listen(port, ()=>{
    console.log('Server running')
})
