// 3 types of modules are there : 
//      - core module 
//      - internal module
//      - external module


// external module
// const isEven = require("is-even");

// console.log(isEven(4)); // true
// console.log(isEven(5)); // false


// internal module
// function greet() {
//     console.log("Hello World!")
// }

// module.exports = greet;


// using .env
// step -1 install npm i dotenv
// step -2 import
require('dotenv').config()

// step -3 use case
console.log(process.env.key)
console.log(process.env.pass)

// console.log(key)