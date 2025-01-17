class Cart {
	cartItems;
	#localStorageKey;
	#cartCount;

	constructor(localStorageKey) {
		this.#localStorageKey = localStorageKey;
		this.loadCart();
		this.#cartCount = this.loadCartCount();
		this.renderCartCount();
	}



	//loads cartItems from localStorage 
	loadCart() {
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

	//saves cartItems to localStorage
	saveToStorage() {
		localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
	}



	//helper function for renderCartCount
	loadCartCount() {
		return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
	}
	
	renderCartCount() {
		document.querySelector('.js-cart-quantity').textContent = this.#cartCount;
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
}


export let cart = new Cart('cart');
export let businessCart = new Cart('businessCart'); 