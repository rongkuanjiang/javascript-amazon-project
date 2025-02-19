import { cart } from '../../data/cart-oop.js';
import { calculatePriceCentsToDollars, calculateItemsPrice, calculateShippingPrice } from '../utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { getFullProduct } from '../../data/products.js';

const TAX_RATE = 10;

//returns an array of objects. each object contains:
//{
//  itemPrice: number,
//  shippingPrice: number
//} 
//itemPrice is the actual item's price multiplied by the quantity 
function getPaymentSummaryData() {
  return cart.cartItems.map(({productId, deliveryOptionId, quantity}) => {
    
    const productFullSpecification = getFullProduct(productId);
    const itemPrice = productFullSpecification.priceCents * quantity;
    const shippingPrice = getDeliveryOption(deliveryOptionId).priceCents;

    return {
      itemPrice,
      shippingPrice,
    }
  });
}




//
function getPaymentSummaryTotals (paymentSummaryData) {
  
	const itemsPriceCents = calculateItemsPrice(paymentSummaryData);
	const shippingPriceCents = calculateShippingPrice(paymentSummaryData);
  
  const itemsPrice = calculatePriceCentsToDollars(itemsPriceCents);
  const shippingPrice = calculatePriceCentsToDollars(shippingPriceCents);
	const totalBeforeTax = calculatePriceCentsToDollars(itemsPriceCents + shippingPriceCents);
	const estimatedTax = calculatePriceCentsToDollars(totalBeforeTax * 10);
	const totalAfterTax = calculatePriceCentsToDollars(totalBeforeTax * (100 + TAX_RATE)); 

  return {
    itemsPrice,
    shippingPrice,
    totalBeforeTax,
    estimatedTax,
    totalAfterTax
  }
}

function getPaymentSummaryHTML(paymentSummaryTotals) {
  return `
  <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cart.getCartCount()}):</div>
        <div class="payment-summary-money">$${paymentSummaryTotals.itemsPrice}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${paymentSummaryTotals.shippingPrice}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${paymentSummaryTotals.totalBeforeTax}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (${TAX_RATE}%):</div>
        <div class="payment-summary-money">$${paymentSummaryTotals.estimatedTax}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${paymentSummaryTotals.totalAfterTax}</div>
      </div>

      <a href="orders.html">
      <button class="place-order-button button-primary js-place-order">
        Place your order
      </button>
      </a>
      `;
}


export function loadPaymentSummary() {
  const paymentSummaryData = getPaymentSummaryData();
  const paymentSummaryTotals = getPaymentSummaryTotals(paymentSummaryData);
	
  const html = getPaymentSummaryHTML(paymentSummaryTotals);

	document.querySelector('.js-payment-summary').innerHTML = html;
  /*
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
  }); */
}