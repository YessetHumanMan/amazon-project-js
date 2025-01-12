import { cart } from "../../data/cart.js"
import { deliveryOptions } from "../../data/deliveryOptions.js"
import { getProduct } from  "../../data/products.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js"
import { moneyToFixed } from "../utils/money.js" 
export function renderPaymantSummary() {
	let productPriceCents = 0;
	let shippingPriceCents = 0;
	let totalBeforeTax = 0;
	let estimatedTax = 0;
	let orderTotal = 0;
	cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId)
	productPriceCents += product.priceCents * cartItem.quantity
     });

       deliveryOptions.forEach((option) => {
	const deliveryOption = getDeliveryOption(option.id)
        shippingPriceCents += deliveryOption.priceCents
  })    

	totalBeforeTax = productPriceCents + shippingPriceCents
	estimatedTax = totalBeforeTax * 0.1

	 orderTotal = totalBeforeTax + estimatedTax   

     const paymentSummaryHTML = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${moneyToFixed(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${moneyToFixed(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${moneyToFixed(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${moneyToFixed(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${moneyToFixed(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
` 
 document.querySelector(".payment-summary").innerHTML = paymentSummaryHTML;
}
