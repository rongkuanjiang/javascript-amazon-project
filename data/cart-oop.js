/*class Cart {
	cartItems;
	#localStorageKey;

	constructor(localStorageKey) {
		this.#localStorageKey = localStorageKey;
		this.getCart();
		this.loadCartCounter;
	}

	getCartCount() {
		return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
	}
	
	loadCartCounter() {
		const currentCount = this.getCartCount();
		document.querySelector('.js-cart-quantity').textContent = currentCount;
	}

	getCart() {
		const storedCart = localStorage.getItem(this.#localStorageKey);
	  
		if (storedCart) {
		  try {
			this.cartItems = JSON.parse(storedCart);
		  } catch (error) {
			console.error("Parsing error:", error);
			this.cartItems = [];
		  }
		} else {
		  // If cart is not yet set in localStorage, use an empty array
		  this.cartItems = [];
		}
	}

	addToCart(productId) {
		let matched = false;
	
		this.cartItems.forEach((cartItem) => {
			if (productId === cartItem.productId) {
				matched = cartItem;
			}
		});
	
		if (matched) {
			matched.quantity++;
		}		
		else {
			this.cartItems.push({
				productId: productId,
				quantity: 1,
				deliveryOptionId: '0'
			});
		}
	
		this.saveToStorage();
	}

	makeAddToCartInteractive() {
		document.querySelectorAll('.js-add-to-cart').forEach((addToCartButton) => {
			addToCartButton.addEventListener('click', () => {
				const productId = addToCartButton.dataset.productId;

				this.addToCart(productId);
				this.loadCartCounter();
			});
		});
		this.saveToStorage();
	}

	removeFromCart(productId) {
		this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
		this.saveToStorage();
	}

	saveToStorage() {
		localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
	}
}


export let cart = new Cart('cart');
export let businessCart = new Cart('businessCart'); */