import { cart } from '../../data/cart-oop.js';
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
	cart.cartItems.forEach((cartItem) => {
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

          <a href="orders.html">
          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
          </a>
          `;


	document.querySelector('.js-payment-summary').innerHTML = html;
  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
  
      const order = await response.json(); 
    } catch (error) {
      console.log('error');
    }
  
    //window.location.href = 'orders.html';
  });
}