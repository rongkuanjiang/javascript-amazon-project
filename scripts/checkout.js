import {makeDeliveryOptionButtonsInteractive, makeDeleteButtonsInteractive, loadDeliveryOptions, loadOrderSummary } from './checkout/orderSummary.js';
import {loadPaymentSummary} from './checkout/paymentSummary.js';
import '../backend/backendPractice.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';


async function realLoadcheckout() {
	console.log('realLoadCheckout');
	await loadProductsFetch();
	await new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	});
	loadCheckout();
}

realLoadcheckout();

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

