const express = require('express')
const app = express()

app.get('/', (req,res)=> {
    res.send({msg:'Welcome to server'})
})

app.get('/about', (req,res)=> {
    res.send({msg:'Welcome to about'})
})

app.get('/home', (req,res)=> {
    res.send({msg:'Welcome to home'})
})

app.listen(8080,()=>{
    console.log("Server Started")
})