import { cart } from '../data/cart.js';
import { products } from '../data/products.js';
import {formatPrice} from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import {makeDeliveryOptionButtonsInteractive, makeDeleteButtonsInteractive, loadDeliveryOptions, currentTime} from './checkout/orderSummary.js';


console.log('cart at page load:', cart);

//load cart
export function loadCheckout() {
	loadMainHTML();
	loadDeliveryOptions();	
	
	makeDeleteButtonsInteractive();
	makeDeliveryOptionButtonsInteractive();
}

function loadMainHTML() {
	const fullHTML = getMainHTML();
	document.querySelector('.order-summary').innerHTML = fullHTML;
}

function getMainHTML() {
	let fullHTML = '';
	cart.forEach(cartItem => {
		let productFullSpecification = products.find((product) => {
			return cartItem.productId === product.id;
		});
		

		const dateString = currentTime.add(deliveryOptions[cartItem.deliveryOptionId].deliveryTime, 'days').format('dddd, MMMM D');
		
		const html = `<div class="cart-item-container js-${cartItem.productId}">
		<div class="delivery-date">${dateString}</div>

		<div class="cart-item-details-grid">
		<img class="product-image"
			src="${productFullSpecification.image}">

		<div class="cart-item-details">
			<div class="product-name">
			${productFullSpecification.name}
			</div>
			<div class="product-price">
			${formatPrice(productFullSpecification.priceCents)}
			</div>
			<div class="product-quantity">
			<span>
				Quantity: <span class="quantity-label">${cartItem.quantity}</span>
			</span>
			<span class="update-quantity-link link-primary">
				Update
			</span>
			<span class="delete-quantity-link link-primary js-cart-delete" 
			data-product-id="${cartItem.productId}">
				Delete
			</span>
			</div>
		</div>

		<div class="delivery-options">
			<div class="delivery-options-title">
			Choose a delivery option:
			</div>
			<div class="delivery-options-details"
			data-cart-item-id="${cartItem.productId}">
			</div>
		</div>
		</div>
	</div>`;

	fullHTML += html; 
	});
	return fullHTML;
}



loadCheckout();