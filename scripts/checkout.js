import { loadProducts } from '../data/products.js';
import { cart } from '../data/cart-oop.js';
import { loadOrderSummary } from './checkout/orderSummary.js';
import { loadPaymentSummary } from './checkout/paymentSummary.js';

async function renderCheckout() {
	try {
		
		await loadProducts();

		//only the model and view
		loadCheckout();

		//add event listeners once
		addCheckoutEventListeners();
		
	} catch(error) {
		console.log('load checkout error');
	}	
}
renderCheckout();

function loadCheckout() {
	try {
		loadOrderSummary();
		loadPaymentSummary();

		cart.renderCartCount();
	} catch (error) {
		console.log(error);
	}	
}


function addCheckoutEventListeners() {
	document.addEventListener('change', onDeliveryChange);
	document.addEventListener('click', onDeleteClick);
}


//controller
//takes no arguments and returns nothing. 
//adds an event listener to the Document that tracks delivery option radio buttons.
//if the delivery option id is changed, makeDeliveryOptionButtonsInteractive saves
//the new data to storage and then reloads checkout. 
function onDeliveryChange(event) {
	if (!event.target.matches('.delivery-option-input')) return;
	
	const newOptionId = event.target.dataset.optionId;
	const productId = event.target.dataset.productId;
	const cartItem = cart.findItem(productId);
	if (cartItem) {
		cartItem.deliveryOptionId = String(newOptionId);
		cart.saveToStorage();
		loadCheckout();
	}
}

//controller
//takes no arguments and returns nothing.
//adds an event listener to the Document that tracks the delete button.
//if the delete button is clicked, makeDeleteButtonsInteractive saves
//the new data to storage and then reloads checkout. 
function onDeleteClick(event) {
	if (!event.target.matches('.js-cart-delete')) return;
	const productId = event.target.dataset.productId;
	cart.removeFromCart(productId);
	loadCheckout();
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