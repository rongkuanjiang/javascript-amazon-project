import {makeDeliveryOptionButtonsInteractive, makeDeleteButtonsInteractive, loadDeliveryOptions, loadOrderSummary } from './checkout/orderSummary.js';
import {loadPaymentSummary} from './checkout/paymentSummary.js';
import '../backend/backendPractice.js';
import { loadProducts } from '../data/products.js';
import { cart } from '../data/cart-oop.js';


async function renderCheckout() {
	try {
		
		await loadProducts();
		loadCheckout();
	} catch(error) {
		console.log('load checkout error');
	}	
}
renderCheckout();


export function loadCheckout() {
	try {
		loadOrderSummary();
		loadPaymentSummary();

		cart.renderCartCount();
	} catch (error) {
		console.log(error);
	}	
}


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