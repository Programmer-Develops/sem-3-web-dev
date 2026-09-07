const express = require('express')
const fs = require('fs')
const {studentRouter} = require('./routes/student.route')

const app = express()

app.get('/', (req,res)=> {
    res.send("Home Page")
})

app.use('/student', studentRouter)

app.listen(8080,()=>{
    console.log("Server Started")
})