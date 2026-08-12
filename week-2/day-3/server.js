const http = require('http');
const fs = require('fs')

// method is GET by default
const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.end("Home Page");
    } else if (req.url == '/read' && req.method == 'GET') {
        // data = fs.readFileSync('./test.json', 'utf-8');
        // res.end(data);
        const data = fs.createReadStream('./test.json', 'utf-8')
        data.pipe(res) // we used pipe as data was in chunks and we wanted to send it to the response stream
    } else if (req.url == '/add' && req.method == 'POST') { // we wont be able to see the data in web browser as it is a POST request. we can use postman/thunderclient to send the data in the request body and see the response.
        
        //const datap = req.body; // we cant fetch data from the request body directly as it is a stream. thats why we never use http module directly for creating APIs. we use express for that as it has a body parser which parses the data from the request body and makes it available in req.body.
        // console.log(datap);

        // we can fetch data from the request body using streams. we can listen to the 'data' event on the request object and get the data in chunks. we can then concatenate the chunks to get the complete data.
        let str = '';
        req.on('data',(chunk)=>{
            str+=chunk;
        })
        req.on('end',()=>{
            console.log(str);
        })
        res.end("data created successfully");

    } else {
        res.end("404 Page Not Found");
    }

});

server.listen(8080, ()=>{
    console.log("Running...")
})