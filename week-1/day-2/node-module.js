const crypto = require('crypto');

// step 1: 1 hash algorithm is selected (sha256, sha512, md5, etc.)

const algo = crypto.createHash('shake256');

const data = algo.update('Hello World'); // step 2: data is passed to the hash algorithm

const ans = data.digest('hex'); // step 3: the hash value is generated in hex format

console.log(ans); // returns the hash value of the word "Hello World" using shake256 algorithm

// 5. fs - file system

const fs = require('fs');

// a. read file

fs.readFile("./1.txt", 'utf-8', (err, data) => {  // utf 8  is there for having the data in string format instead of buffer format
    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }
})