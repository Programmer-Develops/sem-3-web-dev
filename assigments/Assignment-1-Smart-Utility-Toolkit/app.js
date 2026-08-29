const isEven = require('./modules/isEven');
const logger = require('./modules/logger');

logger('Custom module demonstration started.');

const numbers = [2, 5, 8, 11];
numbers.forEach((number) => {
	console.log(number, 'is', isEven(number) ? 'even' : 'odd');
});

logger('Custom module demonstration finished.');
