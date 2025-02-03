import { renderOrderSummary } from "./checkout/orderSummary.js"
import { renderPaymantSummary} from "./checkout/paymantSummary.js"
import { loadProducts } from "../data/products.js"
import { loadCart } from "../data/cart.js"
// import "../data/cart-class.js"
// import "../data/backend-practis.js"

new Promise((resolve) => {
 loadProducts(() => {
 resolve()
}) 
}).then(() => {
return new Promise((resolve) => {
  loadCart(() => {
   resolve()
     })
   })	
}).then(() => {
   renderOrderSummary();
   renderPaymantSummary(); 
})   


// loadProducts(() => {
//  })
 

