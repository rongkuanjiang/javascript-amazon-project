import { cart } from '../../data/cart-oop.js';
import { getProduct } from '../../data/products.js';
import {formatPrice} from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { loadCheckout } from '../checkout.js';
import { loadPaymentSummary } from './paymentSummary.js';
export const currentTime = dayjs();



//DELIVERY SECTION

//helper function for prepareDeliveryOptionsFor
//takes the deliveryOptionId of the cartItem in question and
//matches it with the optionNumber from the HTML generated 
function checkedOrNot(deliveryOptionId, optionNumber){
	//console.log('deliveryoptionid and optionnumber', deliveryOptionId, optionNumber);
	if (String(deliveryOptionId) === String(optionNumber)) {
		return 'checked';
	}
	else {
		return '';
	}
}


//helper function for getDeliveryHTMLFor; 
//returns an array of objects. each object contains information 
//about the specifics of one delivery option.
function prepareDeliveryOptionsFor(cartItem) {
	return deliveryOptions.map((deliveryOption) => {
		const deliveryDate = currentTime.add(deliveryOption.deliveryTime, 'days');
		const dateString = deliveryDate.format('dddd, MMMM D');
		const checkedAttribute = checkedOrNot(cartItem.deliveryOptionId, deliveryOption.id);
		const priceString = String(formatPrice(deliveryOption.priceCents));
		return {
			id: deliveryOption.id,
			productId: cartItem.productId,
			isChecked: checkedAttribute,
			dateString: dateString,
			priceString: priceString
		}
	});	
}

//takes a cartItem and returns all the HTML for its delivery options
function getDeliveryHTMLFor(cartItem) {
	const deliveryOptionsDetails = prepareDeliveryOptionsFor(cartItem);

	return deliveryOptionsDetails.map((deliveryOptionDetails) => {
		return `
		<div class="delivery-option"
				data-option-id="${deliveryOptionDetails.id}"
				data-product-id="${deliveryOptionDetails.productId}">
			<input type="radio" ${deliveryOptionDetails.isChecked} 
				class="delivery-option-input"
				name="delivery-option-${cartItem.productId}">
			<div>
				<div class="delivery-option-date">
				${deliveryOptionDetails.dateString}
				</div>
				<div class="delivery-option-price">
				${deliveryOptionDetails.priceString} Shipping
				</div>
			</div>
		</div>`;
	}).join('');
	
	/*
	let fullHTML = '';
	forEach(deliveryOption => {
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
	*/
}

export function makeDeliveryOptionButtonsInteractive() {
	document.addEventListener('change', (event) => {
		if (!event.target.matches('.delivery-option')) return;
		
		const newOptionId = event.target.dataset.optionId;
		const productId = event.target.dataset.productId;
		const cartItem = cart.cartItems.find(item => item.productId === productId);
		if (cartItem) {
			cartItem.deliveryOptionId = String(newOptionId);
		}
		cart.saveToStorage();
		loadCheckout();
	});

	/*
	// Select all radio buttons with .delivery-option-input
	document.querySelectorAll('.delivery-option-input')
	  .forEach((radio) => {
		radio.addEventListener('change', (event) => {
		  const newOptionId = event.target.dataset.optionId;
		  const productId = event.target.dataset.productId;
		  //console.log(newOptionId, productId);
		  // Update this cartItem in your cart array
		  const cartItem = cart.cartItems.find(item => item.productId === productId);
		  //console.log(cartItem);
		  if (cartItem) {
			cartItem.deliveryOptionId = String(newOptionId);
		  }
		  //console.log(cartItem);
		  // console.log(cartItem.deliveryOptionId);
		  // Persist to localStorage (or wherever you save)
		  cart.saveToStorage();
		  loadCheckout();
		  loadPaymentSummary();
		});
	  });
	*/
}

//renders the HTML for the delivery options of all cart items.
//doesn't return anything.
export function loadDeliveryOptions() {
	document.querySelectorAll('.delivery-options-details').forEach((deliveryOptions) => {
		const cartItemId = deliveryOptions.dataset.cartItemId;
		const cartItem = cart.cartItems.find(item => item.productId === cartItemId);

		const html = getDeliveryHTMLFor(cartItem);
		deliveryOptions.innerHTML = html;
	});
}





export function makeDeleteButtonsInteractive() {
	document.querySelectorAll('.js-cart-delete')
	.forEach((deleteButton) => {
		deleteButton.addEventListener('click', () => {
			const productId = deleteButton.dataset.productId;
			cart.removeFromCart(productId);

			const cartItemToRemove = document.querySelector(`.js-${productId}`);
			cartItemToRemove.remove();
			loadCheckout();
		});
	});
}

//main function here !! 
// 
export function loadOrderSummary() {
	try {
		//helper function 1: model
		const orderData = getOrderSummaryData();

		//helper function 2: view
		renderOrderSummary(orderData);
		loadDeliveryOptions();	

		//helper function 3: controller
		makeOrderSummaryInteractive();

	} catch (error) {
		console.log('Error loading order summary: ', error);
	}
}


function renderOrderSummary(orderData) {
	try {
	if (orderData.length === 0) {
		document.querySelector('.js-order-summary').innerHTML = `
		<div>Your cart is empty</div>
		<div class="view-products-link"> 
			<a href="./amazon.html">
				View products
			</a>
		</div>
		`;
		return;
	} else {
		let orderSummaryHTML = buildOrderSummary(orderData);
		document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;
	}
	} catch (e) {
		console.log('renderOrderSummary error', e);
	}
}

function getOrderSummaryData() {
	return cart.cartItems;
}

function buildOrderSummary(orderData) {
	let orderSummaryHTML = '';
	
	orderData.forEach(cartItem => {
		const productFullSpecification = getProduct(cartItem.productId);
		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
		const dateString = currentTime.add(deliveryOption.deliveryTime, 'days').format('dddd, MMMM D');
		
		const htmlOneProductOrderSummary = `<div class="cart-item-container js-${cartItem.productId}">
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
	
	orderSummaryHTML += htmlOneProductOrderSummary; 
	});

	return orderSummaryHTML;
}

function makeOrderSummaryInteractive() {
	makeDeleteButtonsInteractive();
	makeDeliveryOptionButtonsInteractive();
}