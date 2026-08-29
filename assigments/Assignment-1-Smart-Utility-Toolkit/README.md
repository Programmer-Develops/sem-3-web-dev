# Lab Assignment 1: Smart Utility Toolkit

This project uses only Node.js core modules: `process`, `http`, `fs`, and `crypto`.

## Run the utilities

```text
node calculator.js add 10 5
node calculator.js subtract 10 5
node calculator.js multiply 10 5
node calculator.js divide 10 5

node app.js
node dice.js 3

node fileManager.js create test.txt "Hello Node.js"
node fileManager.js read test.txt
node fileManager.js update test.txt " Learning fs module"
node fileManager.js delete test.txt
```

The file manager reports missing-file errors in the terminal instead of stopping the program.

## Run the HTTP server

```text
node server.js
```

Open `http://localhost:8080/`, `http://localhost:8080/about`, or
`http://localhost:8080/contact`. Any other route returns a 404 response.

## Check the code

```text
npm test
```