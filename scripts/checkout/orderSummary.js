import {cart, removeCartItem, updateDeliveryOptions } from "../../data/cart.js"
import {products} from "../../data/products.js";
import {moneyToFixed} from "./../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js"
import { getDeliveryOption } from  "../../data/deliveryOptions.js"
export function renderOrderSummary() {
let cartItemHTML = ""

cart.forEach((cartItem) => {
        const productId = cartItem.productId;
	const machingProduct = getProduct(productId)
	// let machingProduct
	//products.forEach((product) => {
	//if (product.id === productId) {
	//  machingProduct = product
	// }
	// });
         let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)

        //	deliveryOptions.forEach((option) => {
	//      if (option.id === cartItem.deliveryOptionId) {
	//      deliveryOption = option
        //    }
        //  });
	const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd , MMMM D')

 cartItemHTML += `<div class="cart-item-container js-cart-item-${machingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${machingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${machingProduct.name}
                </div>
                <div class="product-price">
                  $${moneyToFixed(machingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${machingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${deliveryOptionsHTML(machingProduct, cartItem)} 
              </div>
            </div>
          </div>`
});

function deliveryOptionsHTML(machingProduct, cartItem) {
	let html = '';
	deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd , MMMM D')
	const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${deliveryOption.priceCents / 100} -`;
	const isChecking = deliveryOption.id === cartItem.deliveryOptionId
        html += ` <div class="delivery-option" data-product-id="${machingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
		  ${isChecking ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${machingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                     ${priceString} 
                    </div>
                  </div>
                </div>
`
  
});
return html
}

document.querySelector(".order-summary").innerHTML = cartItemHTML

document.querySelectorAll(".delete-quantity-link")
  .forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeCartItem(productId);

      const container = document.querySelector(`.js-cart-item-${productId}`);
      const updatedItem = cart.find(cartItem => cartItem.productId === productId);

      if (updatedItem) {
        const quantityLabel = container.querySelector(".quantity-label");
        quantityLabel.textContent = updatedItem.quantity; // Обновить количество в UI
      } else {
        container.remove(); // Удалить товар из DOM
      }
    });
  });

// document.querySelectorAll(".delete-quantity-link")
// .forEach((link) => {
//    link.addEventListener("click", () => {
//	const productId = link.dataset.productId
 //       removeCartItem(productId)
//	const container = document.querySelector(`.js-cart-item-${productId}`);
//	container.remove()
//	    console.log(container)
 //   })
//  })

document.querySelectorAll(".delivery-option")
     .forEach((element) => {
	element.addEventListener('click', () => {
	 const { productId, deliveryOptionId} = element.dataset
         updateDeliveryOptions(productId, deliveryOptionId);
	 renderOrderSummary()
       })

    })
 };	
