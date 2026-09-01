// Middleware :- It is a function which sit between req and res cycle. 
//  It has access to req and res object and also next function which will allow us to move to next middleware or route handler.

const express = require('express')

const app = express()

const middlewere = (req,res,next) => {
    console.log(1)
    next()
    console.log(2)
}

const middlewere2 = (req,res,next) => {
    console.log(3)
    next()
    console.log(4)
}

// middlewere chain :- using more than 1 middlewere in a single route handler
app.use(middlewere)
app.use(middlewere2)

app.get('/home', (req,res)=>{
    console.log('Home Page')
    res.send({msg: "HOME"})
})

app.get('/about',(req,res)=> {
    console.log("About Page")
    res.send({msg:"ABOUT"})
})

app.listen(8080, ()=>{
    console.log("server started")
})