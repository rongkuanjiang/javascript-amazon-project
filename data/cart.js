export let cartCount = getCartCount();
export let cart;
getCart();


function getCartCount() {
	let cartCount = JSON.parse(localStorage.getItem('cartCount'));
	if (!cartCount || cartCount <= 0) {
		cartCount = 0;
	} 
	return cartCount;
}

// export function getCart() {
// 	let cart = JSON.parse(localStorage.getItem('cart'));
// 	if (!cart) {
// 		cart = [];
// 	} 
// 	return cart;
// }

export function getCart() {
  const storedCart = localStorage.getItem('cart');

  if (storedCart) {
    try {
      cart = JSON.parse(storedCart);
    } catch (error) {
      console.error("Parsing error:", error);
      cart = [];
    }
  } else {
    // If cart is not yet set in localStorage, use an empty array
    cart = [];
  }
}


export function loadCartCounter() {
	document.querySelector('.js-cart-quantity').innerHTML = cartCount;
}



export function addToCart(productId) {
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

	saveToStorage();
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
			
			updateCartCount('add', 1);	
			addToCart(productId);
			loadCartCounter();
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

let cartExperiment;

export function loadCart(fun) {
	const xhr = new XMLHttpRequest();
	
	xhr.addEventListener('load', () => {
		cartExperiment = xhr.response;
		console.log(cartExperiment);
		fun();
	});
	
	xhr.open('GET', 'https://supersimplebackend.dev/cart');
	xhr.send();
}






