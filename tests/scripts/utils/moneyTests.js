import { calculatePrice } from "../../../scripts/utils/money.js";

describe('test suite: calculatePrice', () => {
	it('calculates the price of a whole number', () => {
		expect(calculatePrice(2095)).toEqual('20.95');
	}); 
}); 