//Given an Id (0, 1, or 2), 
//Returns the entire the delivery option specification
export function getDeliveryOption(deliveryOptionId) {
	let option;
	deliveryOptions.forEach((deliveryOption) => {
	  if (String(deliveryOption.id) === String(deliveryOptionId)) {
		option = deliveryOption;
	  }
	});
	return option;
}

export const deliveryOptions = [
	{
		id: 0,
		deliveryTime: 1,
		priceCents: 999,
	},
	{
		id: 1,
		deliveryTime: 3,
		priceCents: 499,
	},
	{
		id: 2,
		deliveryTime: 7,
		priceCents: 0,
	}
]
