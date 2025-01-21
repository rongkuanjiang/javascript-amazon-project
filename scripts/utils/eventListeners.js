import {cart} from '../../data/cart-oop.js';
import { loadCheckout } from '../checkoutCore.js';


//controller
//takes no arguments and returns nothing. 
//adds an event listener to the Document that tracks delivery option radio buttons.
//if the delivery option id is changed, makeDeliveryOptionButtonsInteractive saves
//the new data to storage and then reloads checkout. 
export function onDeliveryChange(event) {
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
export function onDeleteClick(event) {
	if (!event.target.matches('.js-cart-delete')) return;
	const productId = event.target.dataset.productId;
	cart.removeFromCart(productId);
	loadCheckout();
}