export function formatPrice(priceCents) {
	if(priceCents == 0) {
		return 'FREE';
	}
	else {
		return `$${(Math.round(priceCents) / 100).toFixed(2)}`;
	}
}

export function calculatePrice(priceCents) {
	return (Math.round(priceCents) / 100).toFixed(2);
}	