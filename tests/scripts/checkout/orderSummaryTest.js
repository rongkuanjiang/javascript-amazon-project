import { getCart } from "../../../data/cart.js";
import { loadOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { loadProducts } from "../../../data/products.js";

describe('test suite: loadOrderSummary', () => {

	beforeAll((done) => {
		loadProducts(() => {
			done(); 
		});
	});

	it('loads the order summary as usual', () => {
		document.querySelector('.js-test-container').innerHTML = `
		<div class="js-order-summary">
		</div>`;

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 2,
				deliveryOptionId: '0'
			}, {
				productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
				quantity: 1,
				deliveryOptionId: '1'
			}]);
		});
		getCart();

		loadOrderSummary();
	});
});