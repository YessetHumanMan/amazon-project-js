function Cart(localStorageKey) {
const cart = {
	cartItem: undefined,
init() {
	 this.cartItem = JSON.parse(localStorage.getItem(localStorageKey))

if (!this.cartItem) {
  this.cartItem = [
	{
	 productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
	 quantity: 2,
	 deliveryOptionId: "1"
	},
	{
	 productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
	 quantity: 1,
 	 deliveryOptionId: "2"
	}
]; 
}
},

 saveToStorage() {
	localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem))
},

 addToCart(productId) {
	let machingItem
	this.cartItem.forEach((cartItem) => {
	if (productId === cartItem.productId) {
	  machingItem = cartItem
      }
	});

	if (machingItem) {
	  machingItem.quantity += 1
     } else {
	 this.cartItem.push({
    	 productId: productId,
	 quantity: 1,
	 deliveryOptionId: "1"
      })
     }
	this.saveToStorage()
},


 removeCartItem(productId) {
 this.cartItem = this.cartItem.map(cartItem => {
    if (cartItem.productId === productId) {
      if (cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      // Если количество равно 1, товар будет удален
      return null;
    }
    return cartItem;
  }).filter(cartItem => cartItem !== null);

  this.saveToStorage();
},


updateDeliveryOptions(productId, deliveryOptionId) {
let machingItem
this.cartItem.forEach((cartItem) => {
  if (productId === cartItem.productId) {
	machingItem = cartItem
  }
})
	machingItem.deliveryOptionId = deliveryOptionId
	this.saveToStorage()
},

}
cart.init()
return cart
}


const cart = Cart("caet-oop")
const businessCart = Cart("cart-business")

console.log(cart)
console.log(businessCart)
