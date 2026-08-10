const process = require("process")
const arguments = process.argv

console.log(arguments)

const operation = +arguments[2]
const a = +arguments[3]
const b = +arguments[4]

console.log(operation,typeof a, typeof b)

function add(X,Y) {
    console.log("Addition: ", X+Y)
}

add(a,b)