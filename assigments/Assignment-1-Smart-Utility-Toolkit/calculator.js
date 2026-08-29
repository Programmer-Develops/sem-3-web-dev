const process = require('process');

const operation = process.argv[2];
const firstNumber = Number(process.argv[3]);
const secondNumber = Number(process.argv[4]);

function calculate(operator, firstValue, secondValue) {
	if (!['add', 'subtract', 'multiply', 'divide'].includes(operator)) {
		return 'Invalid operation. Use add, subtract, multiply, or divide.';
	}

	if (!Number.isFinite(firstValue) || !Number.isFinite(secondValue)) {
		return 'Please provide two valid numbers.';
	}

	if (operator === 'divide' && secondValue === 0) {
		return 'Cannot divide by zero.';
	}

	if (operator === 'add') {
		return firstValue + secondValue;
	}

	if (operator === 'subtract') {
		return firstValue - secondValue;
	}

	if (operator === 'multiply') {
		return firstValue * secondValue;
	}

	return firstValue / secondValue;
}

console.log('CLI input:', process.argv.slice(2).join(' '));
console.log('Result:', calculate(operation, firstNumber, secondNumber));

module.exports = calculate;
