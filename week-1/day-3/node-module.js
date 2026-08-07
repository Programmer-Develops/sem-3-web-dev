const crypto = require('crypto');

// step 1: 1 hash algorithm is selected (sha256, sha512, md5, etc.)

const algo = crypto.createHash('shake256');

const data = algo.update('Hello World'); // step 2: data is passed to the hash algorithm

const ans = data.digest('hex'); // step 3: the hash value is generated in hex format

console.log(ans); // returns the hash value of the word "Hello World" using shake256 algorithm


// 5. fs - file system

const fs = require('fs');


// a. read file

// utf 8  is there for having the data in string format instead of buffer format
// fs.readFile("./1.txt", 'utf-8', (err, data) => {  // It is asynchronous as it uses callback function which is executed after the file is read.
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(data," => async");
//     }
// })

// synchronous way of reading file

// const syncData = fs.readFileSync("./1.txt", 'utf-8'); // It is synchronous as it does not use callback function and the code execution is blocked until the file is read.
// console.log(syncData);


// b. write file

// fs.writeFile('./1.txt', 'Hello Synchronous World', (err)=> { // It is asynchronous as it uses callback function which is executed after the file is written.
//     if (err) {
//         console.log('error in writing file');
//     } else {
//         console.log('file written successfully');
//     }
// }); 

// synchronous way of writing file

// fs.writeFileSync('./1.txt', 'Hello Again Synchronous World'); // It is synchronous as it does not use callback function and the code execution is blocked until the file is written.


// c. append file

// asynchronous way of appending file
fs.appendFile('./1.txt', 'Are you there ?', (err)=> {
    if (err) {
        console.log('error in appending file');
    }
    else {
        console.log('file appended successfully');
    }
})

// synchronous way of appending file

fs.appendFileSync('./1.txt', 'Are you there ?'); // It is synchronous as it does not use callback function and the code execution is blocked until the file is appended.