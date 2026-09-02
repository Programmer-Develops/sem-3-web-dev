//                      Types of Middleware

// 1) Core / Inbuilt Middleware
//      Ex. express.json()
//          express.router()

// 2) Internal / Custom Middleware
//      Ex. Timelogger
//          Routelogger
//          Watchman

// 3) External / Third Party 
//      Ex. Mutter, CORS

const express = require('express')
const fs = require('fs')
const app = express()

// TimeLogger Middleware
const timeLoggerMiddleware = (req,res,next)=> {
    const startTime = Date.now();
    next()
    const endTime = Date.now();
    console.log(`Time taken by route is ${endTime - startTime}ms`)
}

app.use(timeLoggerMiddleware)

// RouteLogger Middleware
const routeLoggerMiddleware = (req,res,next) => {
    console.log(`Route is ${req.url} and method is ${req.method}`)
    const record = `Route is ${req.url} and method is ${req.method} \n`
    fs.appendFileSync('./routeLogger.txt', record)
    next()
}

app.use(routeLoggerMiddleware)

// watchman Middleware
const watchManMiddleware = (req,res,next) => {
    if (req.url == '/admin') {
        res.send({msg:"Not allowed to access this route"})
    }
    else {
        next()
    }
}

app.use(watchManMiddleware)

app.get('/home', (req,res)=> {
    res.send({msg:'Welcome to server'})
})

app.get('/about', (req,res)=> {
    res.send({msg:'Welcome to about'})
})

app.get('/read', (req,res)=> {
    const data = fs.readFileSync("./1.json", "utf-8")

    res.send(data)
})

app.listen(8080,()=>{
    console.log("Server Started")
})