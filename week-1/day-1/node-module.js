// Node JS core module

// 1. os - operating system

// const os = require('os'); // as the node js still uses Common JS instead of ES6 JS which released in 2015, we use require instead of import
// console.log(os.freemem()); // returns the free memory of the system in bytes
// console.log(os.platform()); // returns the platform of the system (win32, linux, darwin, etc.)
// console.log(os.version()); // returns the version of the operating system
// console.log(os.cpus()) // returns the information about the CPUs of the system

// 2. dns - domain name system

// const dns = require('dns');
// console.log(dns.getServers()); // returns the list of DNS servers used by the system

// 3. path - address

const path = require('path');
console.log(path.resolve())