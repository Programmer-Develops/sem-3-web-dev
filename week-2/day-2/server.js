// http have 5 methods for handling requests: GET, POST, PUT, DELETE, PATCH
// GET: used to retrieve data from the server
// POST: used to submit data to the server
// PUT: used to update data on the server
// DELETE: used to delete data from the server
// PATCH: used to apply partial updates to data on the server

const http = require('http');
const fs = require('fs')

// method is GET by default
const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.end("Home Page");
    } else if (req.url == '/read' && req.method == 'GET') {
        data = fs.readFileSync('./test.json', 'utf-8');
        res.end(data);
    } else if (req.url == '/add') {
        res.end("data created successfully");
    } else {
        res.end("404 Page Not Found");
    }

});

server.listen(8080, ()=>{
    console.log("Running...")
})