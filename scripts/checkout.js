import { loadCheckout } from "./checkoutCore.js";
import '../backend/backendPractice.js';
import { loadProducts } from '../data/products.js';


async function renderCheckout() {
	try {
		
		await loadProducts();
		loadCheckout();
	} catch(error) {
		console.log('load checkout error');
	}	
}
renderCheckout();




/*
loadProductsFetch().then(() => {
	return new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	});
}).then(() => {
	loadCheckout();
}); 
*/

//loadProducts(loadCheckout);
//load checkout