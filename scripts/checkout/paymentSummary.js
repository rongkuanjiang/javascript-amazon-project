import { cart } from '../../data/cart.js';
import { calculatePrice } from '../utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { getProduct } from '../../data/products.js';

const tax = 10;

export function loadPaymentSummary() {
	let itemsPrice = 0;
	let numberOfItems = 0;
	let shippingCost = 0;
	
	/* 
		^^ FIX formatPrice
	*/
	cart.forEach((cartItem) => {
		const quantity = cartItem.quantity;
		numberOfItems += quantity;
		const productFullSpecification = getProduct(cartItem.productId);

		const itemPrice = productFullSpecification.priceCents;
		itemsPrice += quantity * itemPrice;


		const shippingCostItem = getDeliveryOption(cartItem.deliveryOptionId).priceCents;
		
	
		shippingCost += shippingCostItem;
	});

	
	const totalBeforeTax = calculatePrice(itemsPrice + shippingCost);
	const estimatedTax = calculatePrice(totalBeforeTax * 10)
	const totalAfterTax = calculatePrice(totalBeforeTax * (100 + tax)); 
	const html = `
		  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${numberOfItems}):</div>
            <div class="payment-summary-money">$${calculatePrice(itemsPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${calculatePrice(shippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (${tax}%):</div>
            <div class="payment-summary-money">$${estimatedTax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalAfterTax}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;


	document.querySelector('.payment-summary').innerHTML = html;
}