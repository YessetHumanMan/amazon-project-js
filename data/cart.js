export const cart = [];

export function addCartItem(productId) {
	let machingItem;
 cart.forEach((cartItem) => {
   if (productId === cartItem.productId) {
	machingItem = cartItem
   }

	 if (machingItem)  {
	  machingItem += 1
	 } else {
	   cart.push({
		productId: productId,
		quantity: 1
	   })
	 }
 })
}
