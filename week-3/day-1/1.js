const express = require('express'); // import
const app = express(); // create application through express.js

app.get('/', (req, res)=> {
    res.end("Home Page")
})

app.get('/about', (req, res)=>{
    res.end("About Page")
})
app.listen(8080,()=>{ // listen/run on port address
    console.log("Sevrer Started") 
})

