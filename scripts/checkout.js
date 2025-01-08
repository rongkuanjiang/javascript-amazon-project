import {makeDeliveryOptionButtonsInteractive, makeDeleteButtonsInteractive, loadDeliveryOptions, loadOrderSummary } from './checkout/orderSummary.js';
import {loadPaymentSummary} from './checkout/paymentSummary.js';
import '../backend/backendPractice.js';
import { loadProducts } from '../data/products.js';


loadProducts(loadCheckout);	


//load checkout
export function loadCheckout() {
	loadOrderSummary();
	loadDeliveryOptions();	
	loadPaymentSummary();
	
	makeDeleteButtonsInteractive();
	makeDeliveryOptionButtonsInteractive();
}

