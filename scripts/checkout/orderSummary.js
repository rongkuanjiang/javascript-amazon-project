import { cart, removeFromCart, saveToStorage } from '../../data/cart.js';
import {formatPrice} from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const currentTime = dayjs();

//takes a cartItem and generates all the HTML for its delivery options
function getDeliveryOptions(cartItem) {
	console.log('getdeliveryoptions beginning cart: ', cartItem);
	let fullHTML = '';
	deliveryOptions.forEach(deliveryOption => {
		const deliveryDate = currentTime.add(deliveryOption.deliveryTime, 'days');
		const dateString = deliveryDate.format('dddd, MMMM D');
		const checkedAttribute = checkedOrNot(cartItem.deliveryOptionId, deliveryOption.id);
		console.log(checkedAttribute);
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
				${formatPrice(deliveryOption.priceCents)} Shipping
				</div>
			</div>
		</div>`;
		console.log(html);
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
		  console.log(newOptionId, productId);
		  // Update this cartItem in your cart array
		  const cartItem = cart.find(item => item.productId === productId);
		  console.log(cartItem);
		  if (cartItem) {
			cartItem.deliveryOptionId = String(newOptionId);
		  }
		  console.log(cartItem);
		  // console.log(cartItem.deliveryOptionId);
		  // Persist to localStorage (or wherever you save)
		  saveToStorage();
		  loadCheckout();
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
		});
	});
}

export function loadDeliveryOptions() {
	document.querySelectorAll('.delivery-options-details').forEach((deliveryOptions) => {
		const cartItemId = deliveryOptions.dataset.cartItemId;
		const cartItem = cart.find(item => item.productId === cartItemId);

		const html = getDeliveryOptions(cartItem);
		deliveryOptions.innerHTML = html;

	});
}

function checkedOrNot(deliveryOptionId, optionNumber){
	console.log('deliveryoptionid and optionnumber', deliveryOptionId, optionNumber);
	if (String(deliveryOptionId) === String(optionNumber)) {
		return 'checked';
	}
	else {
		return '';
	}
}