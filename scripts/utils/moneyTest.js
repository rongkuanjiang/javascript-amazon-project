import {calculatePrice} from './money.js';

console.log('test suite: calculatePrice');

console.log('formats a whole integer price');
console.log(calculatePrice(2095));
if (calculatePrice(2095) === '20.95') {
	console.log('passed');
} else {
	console.log('failed');
}

console.log('works with 0');
if (calculatePrice(0) === '0.00') {
	console.log('passed');
} else {
	console.log('failed');
}

console.log('rounds up a number');
if (calculatePrice(2000.5) === '20.01') {
	console.log('passed');
} else {
	console.log('failed');
}

console.log('rounds down a number');
if (calculatePrice(2000.4) === '20.00') {
	console.log('passed');
} else {
	console.log('failed');
}