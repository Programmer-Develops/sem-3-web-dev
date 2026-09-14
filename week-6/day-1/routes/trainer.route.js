const express = require('express')
const fs = require('fs')

const trainerRouter = express.Router()

trainerRouter.get('/read',(req,res)=>{
    const data = JSON.parse(fs.readFileSync("./1.json", "utf-8"))
    res.send(data.trainer)
})

module.exports = {trainerRouter}