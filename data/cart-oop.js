function Cart(localStorageKey) {
const cart = {

  cartItem: undefined,
init () {
  let cart = JSON.parse(localStorage.getItem(localStorageKey))

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
	localStorage.setItem(localStorageKey, JSON.stringify(cart))
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
	saveToStorage()
},

//export function removeCartItem(productId) {
//	const newCart = [];
//   cart.forEach((cartItem) => {
//	if (cartItem.productId !== productId) {
//	  newCart.push(cartItem)
//	}
//  })
//	cart = newCart

//	saveToStorage();
// }

removeCartItem(productId) {
 this.cartItem = cart.map(cartItem => {
    if (cartItem.productId === productId) {
      if (cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      // Если количество равно 1, товар будет удален
      return null;
    }
    return cartItem;
  }).filter(cartItem => cartItem !== null);

  saveToStorage();
},

 updateDeliveryOptions(productId, deliveryOptionId) {
let machingItem
this.cartItem.forEach((cartItem) => {
  if (productId === cartItem.productId) {
	machingItem = cartItem
  }
})
	machingItem.deliveryOptionId = deliveryOptionId
	saveToStorage()
}

}
cart.init()
return cart

}
const cart = Cart("cart-oop")
console.log(cart)

const businessCart = Cart("business-cart")
console.log(businessCart)
