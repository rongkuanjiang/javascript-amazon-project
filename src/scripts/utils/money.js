export function formatPrice(priceCents) {
	if(priceCents == 0) {
		return 'FREE';
	}
	else {
		return `$${calculatePriceCentsToDollars(priceCents)}`;
	}
}

export function calculatePriceCentsToDollars(priceCents) {
	return (Math.round(priceCents) / 100).toFixed(2);
}	


//sums item prices from getPaymentSummaryData
export function calculateItemsPrice(paymentSummaryData) {
	let itemsPrice = 0;
	paymentSummaryData.forEach(itemPaymentData => itemsPrice += itemPaymentData.itemPrice);
	return itemsPrice;
  }
  //sums shipping prices from getPaymentSummaryData
export function calculateShippingPrice(paymentSummaryData) {
	let shippingPrice = 0;
	paymentSummaryData.forEach(itemPaymentData => shippingPrice += itemPaymentData.shippingPrice);
	return shippingPrice;
  }