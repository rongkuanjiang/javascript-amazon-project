export const cart = [];

let cartCount = 0;

function addToCart(productId) {
	let matched = false;

	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) {
			matched = cartItem;
		}
	});

	if (matched) {
		matched.quantity++;
	}		
	else {
		cart.push({
			productId: productId,
			quantity: 1
		});
	}
}

function updateCartCount(addOrRemove, count) {
	if (addOrRemove == 'add') {
		cartCount += count;			
	}
	else {
		cartCount -= count;
	}
	document.querySelector('.js-cart-quantity').innerHTML = cartCount;
}

export function makeAddToCartInteractive() {
	document.querySelectorAll('.js-add-to-cart').forEach((addToCartButton) => {
		addToCartButton.addEventListener('click', () => {
			const productId = addToCartButton.dataset.productId;
			
			addToCart(productId);
			updateCartCount('add', 1);

			console.log(cart);	
		});
	});
}