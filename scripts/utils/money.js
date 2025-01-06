export function formatPrice(priceCents) {
	if(priceCents == 0) {
		return 'FREE';
	}
	else {
		return `$${(priceCents / 100).toFixed(2)}`;
	}
}