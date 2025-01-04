import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import {formatPrice} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const currentTime = dayjs();
const deliveryDate = currentTime.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));


loadCheckout();

//load cart
function loadCheckout() {
	let fullHTML = '';
	cart.forEach(cartItem => {
		let productFullSpecification;

		products.forEach((product) => {
			if (cartItem.productId === product.id) {
				productFullSpecification = product;
			}
		});

		/*
		let shippingCost;

		if ((productFullSpecification.priceCents / 100).toFixed(2) < 40) {
			shippingCost = '$4.99 - ';
		} else {
			shippingCost = 0;
		} 
		
		*/
		const html = `<div class="cart-item-container js-${cartItem.productId}">
		<div class="delivery-date">
		Delivery date: IDK
		</div>

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
			<div class="delivery-option">
			<input type="radio" checked
				class="delivery-option-input"
				name="delivery-option-${productFullSpecification.id}">
			<div>
				<div class="delivery-option-date">
				Tuesday, June 21
				</div>
				<div class="delivery-option-price">
				FREE Shipping
				</div>
			</div>
			</div>
			<div class="delivery-option">
			<input type="radio"
				class="delivery-option-input"
				name="delivery-option-${productFullSpecification.id}">
			<div>
				<div class="delivery-option-date">
				Wednesday, June 15
				</div>
				<div class="delivery-option-price">
				$4.99 - Shipping
				</div>
			</div>
			</div>
			<div class="delivery-option">
			<input type="radio"
				class="delivery-option-input"
				name="delivery-option-${productFullSpecification.id}">
			<div>
				<div class="delivery-option-date">
				Monday, June 13
				</div>
				<div class="delivery-option-price">
				$9.99 - Shipping
				</div>
			</div>
			</div>
		</div>
		</div>
	</div>`;

	fullHTML += html; 
	});

	document.querySelector('.order-summary').innerHTML = fullHTML;
}



makeDeleteButtonsInteractive();
function makeDeleteButtonsInteractive() {
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