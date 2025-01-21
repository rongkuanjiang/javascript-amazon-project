import { loadOrderSummary } from './checkout/orderSummary.js';
import { loadPaymentSummary } from './checkout/paymentSummary.js';
import { cart } from '../data/cart-oop.js';


export function loadCheckout() {
	try {
		loadOrderSummary();
		loadPaymentSummary();

		cart.renderCartCount();
	} catch (error) {
		console.log(error);
	}	
}