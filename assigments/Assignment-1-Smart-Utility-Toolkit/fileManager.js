const fs = require('fs');

function createFile(fileName, content, callback) {
	fs.writeFile(fileName, content, (error) => {
		if (error) {
			callback(error);
			return;
		}
		callback(null, 'File created successfully.');
	});
}

function readFile(fileName, callback) {
	fs.readFile(fileName, 'utf-8', (error, data) => {
		if (error) {
			callback(error);
			return;
		}
		callback(null, data);
	});
}

function updateFile(fileName, content, callback) {
	fs.appendFile(fileName, content, (error) => {
		if (error) {
			callback(error);
			return;
		}
		callback(null, 'File updated successfully.');
	});
}

function deleteFile(fileName, callback) {
	fs.unlink(fileName, (error) => {
		if (error) {
			callback(error);
			return;
		}
		callback(null, 'File deleted successfully.');
	});
}

const command = process.argv[2];
const fileName = process.argv[3];
const content = process.argv.slice(4).join(' ');

if (command && fileName) {
	if (command === 'create') {
		createFile(fileName, content, showResult);
	} else if (command === 'read') {
		readFile(fileName, showResult);
	} else if (command === 'update') {
		updateFile(fileName, content, showResult);
	} else if (command === 'delete') {
		deleteFile(fileName, showResult);
	} else {
		console.log('Invalid command. Use create, read, update, or delete.');
	}
} else {
	console.log('Usage: node fileManager.js <create|read|update|delete> <file> [content]');
}

function showResult(error, message) {
	if (error) {
		console.log('File operation failed:', error.message);
		return;
	}
	console.log(message);
}

module.exports = { createFile, readFile, updateFile, deleteFile };
