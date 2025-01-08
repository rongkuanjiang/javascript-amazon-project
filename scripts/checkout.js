import {makeDeliveryOptionButtonsInteractive, makeDeleteButtonsInteractive, loadDeliveryOptions, loadOrderSummary } from './checkout/orderSummary.js';
import {loadPaymentSummary} from './checkout/paymentSummary.js';
import '../backend/backendPractice.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

loadProductsFetch().then(() => {
	return new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	});
}).then(() => {
	loadCheckout();
}); 


//loadProducts(loadCheckout);
//load checkout
export function loadCheckout() {
	loadOrderSummary();
	loadDeliveryOptions();	
	loadPaymentSummary();
	
	makeDeleteButtonsInteractive();
	makeDeliveryOptionButtonsInteractive();
}

