import {makeDeliveryOptionButtonsInteractive, makeDeleteButtonsInteractive, loadDeliveryOptions, loadOrderSummary } from './checkout/orderSummary.js';
import {loadPaymentSummary} from './checkout/paymentSummary.js';
import '../backend/backendPractice.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';


async function renderCheckout() {
	try {
		await loadProducts();
		await new Promise((resolve) => {
			loadCart(() => {
				resolve();
			});
		});
	} catch(error) {
		console.log('error');
	}
	
	loadCheckout();
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
	loadOrderSummary();
	loadDeliveryOptions();	
	loadPaymentSummary();
	
	makeDeleteButtonsInteractive();
	makeDeliveryOptionButtonsInteractive();
}

