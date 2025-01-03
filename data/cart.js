export let cart = [
{
	productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
	quantity: 2
},
{
	productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
	quantity: 1
}];

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

export function removeFromCart(productId) {
	cart = cart.filter(cartItem => cartItem.productId !== productId);
}