const express = require('express')
const fs = require('fs')
const app = express()

app.get('/', (req,res)=> {
    res.send({msg:'Welcome to server'})
})

app.get('/about', (req,res)=> {
    res.send({msg:'Welcome to about'})
})

app.get('/read', (req,res)=> {
    const data = fs.readFileSync("./1.json", "utf-8")
    // console.log(data, typeof data) // data is currently of string/json type
    // console.log(data.student) // wont work and will give 'undefined' as it only works on object data type

    const jsData = JSON.parse(data) // converting data to javascript object
    console.log(jsData, typeof jsData) // now it will work as the data is converted to object
    console.log(jsData.student)

    res.send({msg:'Welcome to home'})
})

app.listen(8080,()=>{
    console.log("Server Started")
})