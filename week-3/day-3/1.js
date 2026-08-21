// the client talks to server through 3 methods :
//      - query parameter (like www.google.com/?color=black&size=32)
//      - body parameter (like req.body)
//      - req.params (like /:id)

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

app.put("update/:id", (req,res) => {
    const payload = req.body
    console.log(payload)

    const id = req.params;
    console.log(id)

    const data = JSON.parse(fs.readFileSync('./1.json', 'utf-8'));

    const stdata = data.student;
    console.log(stdata)

    const updatedData = stdata.map((el)=> {
        if (el.id == req.params.id) {
            return payload
        } else {
            return el
        }
    })

    console.log(updatedData)

    data.student = updatedData
    fs.writeFileSync('./1.json', JSON.stringyfy(data))
    res.send({msg:"student record updated"})
}) 

// patch would allow us to partially update without need of writing whole object happened in put
app.patch("update/:id", (req,res) => {
    const payload = req.body
    console.log(payload)

    const id = req.params;
    console.log(id)

    const data = JSON.parse(fs.readFileSync('./1.json', 'utf-8'));

    const stdata = data.student;
    console.log(stdata)

    const updatedData = stdata.map((el)=> {
        if (el.id == req.params.id) {
            return {...el, ...payload} // ... before el and payload will allow us to directly access the inside elements
        } else {
            return el
        }
    })

    console.log(updatedData)

    data.student = updatedData
    fs.writeFileSync('./1.json', JSON.stringyfy(data))
    res.send({msg:"student record updated"})
}) 

app.listen(8080,()=>{
    console.log("Server Started")
})