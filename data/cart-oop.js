
import { products, Product, Clothing } from "./products.js";



class Cart {
	cartItems;
	#localStorageKey;
	#cartCount;

	constructor(localStorageKey) {
		this.#localStorageKey = localStorageKey;
		this.loadCart();
	}



	//loads cartItems from localStorage
	loadCart() {
		const storedCart = localStorage.getItem(this.#localStorageKey);
	  
		if (storedCart) {
		  try {
			this.cartItems = JSON.parse(storedCart);
			this.#cartCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
		  } catch (error) {
			console.error("Parsing error:", error);
			this.cartItems = [];
			this.#cartCount = 0;
		  }
		} else {
		  // If cart is not yet set in localStorage, use an empty array
		  this.cartItems = [];
		  this.#cartCount = 0;
		}	
	}

	//saves cartItems to localStorage
	saveToStorage() {
		localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
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
		this.#cartCount++;
	
		this.saveToStorage();
		this.renderCartCount();
	}

	makeAddToCartInteractive() {
		document.querySelectorAll('.js-add-to-cart').forEach((addToCartButton) => {
			addToCartButton.addEventListener('click', () => {
				const productId = addToCartButton.dataset.productId;

				this.addToCart(productId);
			});
		});
		this.saveToStorage();
	}

	removeFromCart(productId) {
		this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
		this.saveToStorage();
		this.#cartCount--;
	}
}


export let cart;

try {
	cart = new Cart('cart');
} catch (error) {
	console.log('cart initialization error', error);
}
export let businessCart = new Cart('businessCart'); 