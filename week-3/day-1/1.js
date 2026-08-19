const express = require('express'); // import
const app = express(); // create application through express.js
// express is fast, its an unpoiniated(no fixed instruction or structure to follow), minimalist(less line of code)
app.get('/', (req, res)=> {
    res.end("Home Page")
})

app.get('/about', (req, res)=>{
    res.end("About Page")
})
app.listen(8080,()=>{ // listen/run on port address
    console.log("Sevrer Started") 
})

