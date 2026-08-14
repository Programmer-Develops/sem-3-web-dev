// 3 types of modules are there : 
//      - core module 
//      - internal module
//      - external module


// external module
// const isEven = require("is-even");

// console.log(isEven(4)); // true
// console.log(isEven(5)); // false


// internal module
function greet() {
    console.log("Hello World!")
}

module.exports = greet;