import {cart, updateDeliveryOptions} from "../data/cart.js"
import {products} from "../data/products.js";
import {moneyToFixed} from "./utils/money.js";
import { removeCartItem } from "../data/cart.js";
import {deliveryOptions} from "../data/deliveryOptions.js"
let cartItemHTML = "";

cart.forEach((cartItem) => {
        const productId = cartItem.productId;
	let machingProduct

	products.forEach((product) => {
	if (product.id === productId) {
	  machingProduct = product
	}
	})

	let deliveryOption
	deliveryOptions.forEach((option) => {
	  if (option.id === cartItem.deliveryOptionsId) {
		deliveryOption = option
	  }
	})
	 const today = dayjs();
	 const deliveryDay = today.add(deliveryOption.deliveryDay, 'days')
	 const deliveryString = deliveryDay.format('dddd, MMMM D');


 cartItemHTML += `<div class="cart-item-container js-cart-item-${machingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryString}
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
	  const deliveryDay = today.add(deliveryOption.deliveryDay, 'days')
	  const deliveryString = deliveryDay.format('dddd, MMMM D');
	  const isChecking = deliveryOption.id === cartItem.deliveryOptionsId;
	  const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${deliveryOption.priceCents / 100}`
html +=` <div class="delivery-option" data-product-id="${machingProduct.id}" data-delivery-options-id="${deliveryOptions.id}">
                  <input type="radio"
                   ${isChecking ? 'checked' : '' }
                    class="delivery-option-input"
                    name="delivery-option-${machingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryString}
                    </div>
                    <div class="delivery-option-price">
                      $${deliveryOption.priceCents / 100}
                    </div>
                  </div>
                </div> `

  })
	return html
}

document.querySelector(".order-summary").innerHTML = cartItemHTML

document.querySelectorAll(".delete-quantity-link")
 .forEach((link) => {
    link.addEventListener("click", () => {
	const productId = link.dataset.productId
        removeCartItem(productId)
	const container = document.querySelector(`.js-cart-item-${productId}`);
	container.remove()
	    console.log(container)
    })
 })

document.querySelectorAll(".delivery-option")
.forEach((element) => {
  element.addEventListener("click", () => {
  const { productId,deliveryOptionsId} = element.dataset;
  updateDeliveryOptions(productId, deliveryOptionsId)	
  })
})
