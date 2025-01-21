import { loadCheckout } from "./checkoutCore.js";
import { loadProducts } from '../data/products.js';
import { onDeleteClick, onDeliveryChange } from "./utils/eventListeners.js";


async function renderCheckout() {
	try {
		
		await loadProducts();

		//only the model and view
		loadCheckout();

		//add event listeners once
		addEventListeners();
		
	} catch(error) {
		console.log('load checkout error');
	}	
}
renderCheckout();

function addEventListeners() {
	document.addEventListener('change', onDeliveryChange);
	document.addEventListener('click', onDeleteClick);
}


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