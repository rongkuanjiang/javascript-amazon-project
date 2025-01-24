import { cart } from '../../data/cart-oop.js';

describe('test suite: addToCart', () => {

	beforeEach(() => {
		load
	});
	it.todo('adds an existing product to cart', () => {
		spyOn(localStorage, 'setItem');

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 1,
				deliveryOptionId: '0'
			}]);
		});
		getCart();

		console.log(localStorage.getItem('cart'));
		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(2);
		expect(cart[0].deliveryOptionId).toEqual('0');
	});


	it.todo('adds a new product to cart', () => {
		spyOn(localStorage, 'setItem');

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([]);
		});
		getCart();

		console.log(localStorage.getItem('cart'));
		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(1);
		expect(cart[0].deliveryOptionId).toEqual('0');
	});
}); 