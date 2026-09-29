// Intro to Mongoose
// - It is an Object data model that is used to build connection between server - databasde
// features : Connection, Validation and Structures the data

// Schema -> model -> Document/Data

// client <-(request / response)-> server <-(connection)-> Database

//  step 1 : import
const mongoose = require("mongoose")

// step -4 : Schema/blueprint/structure
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    password:String
},{
    versionKey:false
})

const userModel = mongoose.model("user", userSchema);


console.log("data added successfully")

const main = async () => {
    // step -2 build connection with mongodb

    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/intromongoose")
    console.log("db connected")
    await userModel.insertOne({name:"A", email:"A@gmail.com", age:1, password: "aA"})
    await userModel.updateOne({name:"A", email:"A@gmail.com", age:1, password: "aA"}, {$set:{name:"B", email:"B@gmail.com", age:2, password: "bB"}})
    
    // step -3 disconnect
    
    mongoose.disconnect()
    console.log("DB disconnected")
}

main()