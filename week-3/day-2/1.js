const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json)

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
    console.log(jsData, typeof jsData) // data type now 'object'
    console.log(jsData.student) // now it will work as the data is converted to object
    

    res.send({msg:'Welcome to home'})
})

app.post('/create', (req,res)=>{
    const payload = req.body;
    console.log(payload)

    const data = JSON.parse(fs.readFileSync('./1.json', 'utf-8'))

    const stdata = data.student;
    console.log(stdata);
    student.push(stdata)
    console.log(stdata);

    data.student = stdata;

    fs.writeFileSync('./1.json', JSON.stringify(data))
    res.end({msg: "new stydent Created"})
})
app.listen(8080,()=>{
    console.log("Server Started")
})