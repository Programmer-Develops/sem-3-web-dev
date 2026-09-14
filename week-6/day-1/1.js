const express = require('express')
const fs = require('fs')
const cors = require('cors')
const {studentRouter} = require('./routes/student.route')
const {trainerRouter} = require('./routes/trainer.route')

const app = express()
app.use(cors())

app.get('/', (req,res)=> {
    res.send("Home Page")
})

app.use('/student', studentRouter)
app.use('/trainer', trainerRouter)

app.listen(8080,()=>{
    console.log("Server Started")
})