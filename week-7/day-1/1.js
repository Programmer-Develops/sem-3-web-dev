const express = require("express");
const { connection, userModel } = require("./db");

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
    res.send({ msg: "Welcome to my app" })
})

app.get("/read", async(req,res)=>{
    try {
        user = userModel.find()
        res.send(user)
    } catch (error) {
        res.send({msg:"Something went wrong"})
    }
})

app.get("/read/:id", async()=>{
    const id = req.params.id
    try {
        const user = await userModel.findById({_id:id})
        res.send(user)
    } catch (error) {
        res.sed({ msg: "Something went wrong" })
    }
})

app.post("/create", async (req, res)=> {
    const payload = req.body;
    try {
        const newUser = new userModel(payload)
        await newUser.save();
        res.send({msg:"New User Created Successfully"})
    } catch (error) {
        res.sed({ msg: "Something went wrong" })
    }
})

app.listen(8080, async ()=> {
    try {
        await connection
        console.log("DB Connected");

    } catch (error) {
        console.log(error)
    }
    console.log("Server Started !!!")
})