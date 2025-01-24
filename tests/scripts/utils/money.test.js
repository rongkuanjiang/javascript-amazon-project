import { calculatePriceCentsToDollars } from "../../../scripts/utils/money.js";

describe('test suite: calculatePriceCentsToDollars', () => {
	it('calculates the price of a whole number', () => {
		expect(calculatePriceCentsToDollars(2095)).toEqual('20.95');
	}); 
	it('handles fractional cents (rounding)', () => {
		expect(calculatePriceCentsToDollars(123.4)).toBe('1.23'); // $1.23
		expect(calculatePriceCentsToDollars(123.5)).toBe('1.24'); // $1.24
		expect(calculatePriceCentsToDollars(199.9)).toBe('2.00'); // $2.00
	});
	test('handles large numbers', () => {
		expect(calculatePriceCentsToDollars(123456789)).toBe('1234567.89'); // $1,234,567.89
	  });
	
	  test('handles zero input', () => {
		expect(calculatePriceCentsToDollars(0)).toBe('0.00'); // $0.00
	  });
}); 