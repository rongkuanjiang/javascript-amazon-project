import { cart, removeFromCart, saveToStorage } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import {formatPrice} from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { loadCheckout } from '../checkout.js';
import { loadPaymentSummary } from './paymentSummary.js';
export const currentTime = dayjs();

//takes a cartItem and generates all the HTML for its delivery options
function getDeliveryHTML(cartItem) {
	//console.log('getdeliveryoptions beginning cart: ', cartItem);
	let fullHTML = '';
	deliveryOptions.forEach(deliveryOption => {
		const deliveryDate = currentTime.add(deliveryOption.deliveryTime, 'days');
		const dateString = deliveryDate.format('dddd, MMMM D');
		const checkedAttribute = checkedOrNot(cartItem.deliveryOptionId, deliveryOption.id);
		//console.log(checkedAttribute);
		const html = `
		<div class="delivery-option">
			<input type="radio" ${checkedAttribute} 
				class="delivery-option-input"
				name="delivery-option-${cartItem.productId}"
				data-option-id="${deliveryOption.id}"
				data-product-id="${cartItem.productId}">
			<div>
				<div class="delivery-option-date">
				${dateString}
				</div>
				<div class="delivery-option-price">
				${String(formatPrice(deliveryOption.priceCents))} Shipping
				</div>
			</div>
		</div>`;
		//console.log(html);
		fullHTML += html;
	});
	return fullHTML;
}

export function makeDeliveryOptionButtonsInteractive() {
	// Select all radio buttons with .delivery-option-input
	document.querySelectorAll('.delivery-option-input')
	  .forEach((radio) => {
		radio.addEventListener('change', (event) => {
		  const newOptionId = event.target.dataset.optionId;
		  const productId = event.target.dataset.productId;
		  //console.log(newOptionId, productId);
		  // Update this cartItem in your cart array
		  const cartItem = cart.find(item => item.productId === productId);
		  //console.log(cartItem);
		  if (cartItem) {
			cartItem.deliveryOptionId = String(newOptionId);
		  }
		  //console.log(cartItem);
		  // console.log(cartItem.deliveryOptionId);
		  // Persist to localStorage (or wherever you save)
		  saveToStorage();
		  loadCheckout();
		  loadPaymentSummary();
		});
	  });
}
  
export function makeDeleteButtonsInteractive() {
	document.querySelectorAll('.js-cart-delete')
	.forEach((deleteButton) => {
		deleteButton.addEventListener('click', () => {
			const productId = deleteButton.dataset.productId;
			removeFromCart(productId);

			const cartItemToRemove = document.querySelector(`.js-${productId}`);
			cartItemToRemove.remove();
			loadCheckout();
		});
	});
}

export function loadDeliveryOptions() {
	document.querySelectorAll('.delivery-options-details').forEach((deliveryOptions) => {
		const cartItemId = deliveryOptions.dataset.cartItemId;
		const cartItem = cart.find(item => item.productId === cartItemId);

		const html = getDeliveryHTML(cartItem);
		deliveryOptions.innerHTML = html;

	});
}

function checkedOrNot(deliveryOptionId, optionNumber){
	//console.log('deliveryoptionid and optionnumber', deliveryOptionId, optionNumber);
	if (String(deliveryOptionId) === String(optionNumber)) {
		return 'checked';
	}
	else {
		return '';
	}
}

export function loadOrderSummary() {
	const fullHTML = getOrderSummary();
	document.querySelector('.order-summary').innerHTML = fullHTML;
}

function getOrderSummary() {
	let fullHTML = '';
	
	cart.forEach(cartItem => {
		const productFullSpecification = getProduct(cartItem.productId);
		
		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
		const dateString = currentTime.add(deliveryOption.deliveryTime, 'days').format('dddd, MMMM D');
		
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
			${String(formatPrice(productFullSpecification.priceCents))}
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