const crypto = require('crypto');

const rollCount = Number(process.argv[2]) || 1;

if (!Number.isInteger(rollCount) || rollCount < 1) {
	console.log('Please provide a positive whole number of rolls.');
} else {
	for (let rollNumber = 1; rollNumber <= rollCount; rollNumber += 1) {
		const diceValue = crypto.randomInt(1, 7);
		console.log('Dice Rolled:', diceValue);
	}
}
