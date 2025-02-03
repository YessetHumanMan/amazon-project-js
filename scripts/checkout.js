import { renderOrderSummary } from "./checkout/orderSummary.js"
import { renderPaymantSummary} from "./checkout/paymantSummary.js"
import { loadProductsFetch } from "../data/products.js"
import { loadCart } from "../data/cart.js"
// import "../data/cart-class.js"
// import "../data/backend-practis.js"

Promise.all([
loadProductsFetch(),
 new Promise((resolve) => {
  loadCart(() => {
   resolve()
     })
   })	
]).then(() => {
   renderOrderSummary();
   renderPaymantSummary(); 
})   

 

