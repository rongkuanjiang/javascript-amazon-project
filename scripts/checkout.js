import {makeDeliveryOptionButtonsInteractive, makeDeleteButtonsInteractive, loadDeliveryOptions, loadOrderSummary } from './checkout/orderSummary.js';
import {loadPaymentSummary} from './checkout/paymentSummary.js';
import '../backend/backendPractice.js';
import { loadProducts } from '../data/products.js';
import { cart } from '../data/cart-oop.js';


async function renderCheckout() {
	try {
		
		await loadProducts();
		/*await new Promise((resolve) => {
			loadCart(() => {
				resolve();
			});
		}); */
		loadCheckout();
	} catch(error) {
		console.log('load checkout error');
	}	
}

renderCheckout();

/*
loadProductsFetch().then(() => {
	return new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	});
}).then(() => {
	loadCheckout();
}); 
*/

//loadProducts(loadCheckout);
//load checkout
export function loadCheckout() {
	try {
		loadOrderSummary();
		loadPaymentSummary();

		cart.renderCartCount();

		makeDeleteButtonsInteractive();	
		makeDeliveryOptionButtonsInteractive();
	} catch (error) {
		console.log(error);
	}	
}

