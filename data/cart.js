export let cartCount = getCartCount();
export let cart = getCart();



function getCartCount() {
	let cartCount = JSON.parse(localStorage.getItem('cartCount'));
	if (!cartCount || cartCount <= 0) {
		cartCount = 0;
	} 
	return cartCount;
}

function getCart() {
	let cart = JSON.parse(localStorage.getItem('cart'));
	if (!cart) {
		cart = [];
	} 
	return cart;
}

export function loadCartCounter() {
	document.querySelector('.js-cart-quantity').innerHTML = cartCount;
}



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
			quantity: 1,
			deliveryOptionId: '0'
		});
	}

	updateCartCount('add', 1);
	saveToStorage();
	loadCartCounter();
	console.log(cartCount, cart);
}

function updateCartCount(addOrRemove, count) {
	if (addOrRemove == 'add') {
		cartCount += count;			
	}
	else {
		cartCount -= count;
	}

	localStorage.setItem('cartCount', JSON.stringify(cartCount));
}

export function makeAddToCartInteractive() {
	document.querySelectorAll('.js-add-to-cart').forEach((addToCartButton) => {
		addToCartButton.addEventListener('click', () => {
			const productId = addToCartButton.dataset.productId;
			
			addToCart(productId);
		});
	});
	saveToStorage();
}

export function removeFromCart(productId) {
	const itemToRemove = cart.find(cartItem => cartItem.productId === productId);

	// If it exists, call updateCartCount() with the item’s quantity
	if (itemToRemove) {
	  updateCartCount('remove', itemToRemove.quantity);
	}
	
	// Now actually remove it from the cart
	cart = cart.filter(cartItem => cartItem.productId !== productId);
  
	saveToStorage();
}

export function saveToStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}