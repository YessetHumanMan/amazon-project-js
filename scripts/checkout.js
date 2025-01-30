import { renderOrderSummary } from "./checkout/orderSummary.js"
import { renderPaymantSummary} from "./checkout/paymantSummary.js"
import { loadProducts } from "../data/products.js"
// import "../data/cart-class.js"
// import "../data/backend-practis.js"

new Promise((resolve) => {
 loadProducts(() => {
 resolve()
}) 
}).then(() => {
   renderOrderSummary();
 renderPaymantSummary();  

})

// loadProducts(() => {
//  })

