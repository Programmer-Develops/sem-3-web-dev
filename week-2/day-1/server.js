// const process = require("process")
// const arguments = process.argv

// console.log(arguments)

// const operation = +arguments[2]
// const a = +arguments[3]
// const b = +arguments[4]

// console.log(operation,typeof a, typeof b)

// function add(X,Y) {
//     console.log("Addition: ", X+Y)
// }

// add(a,b)


//server

const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=> {
    if (req.url === '/') {
        res.end('Hello World');
    } else if (req.url == '/about') {
        res.end('About Page');
    } else if (req.url == '/data') {
        const data = fs.readFileSync('./test.json', 'utf-8');
        res.end(data);
    } else {
        res.end('404 Page Not Found');
    }
})

server.listen(8080, ()=> {
    console.log('Server is running on port 8080');
})