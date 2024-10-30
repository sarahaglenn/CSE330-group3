import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".order-summary");

document.querySelector("#zip").addEventListener("blur", checkoutProcess.calculateOrderTotal.bind(checkoutProcess));

document.forms["checkout"].addEventListener("submit", (event) => {
  event.preventDefault();
  checkoutProcess.checkout(event.target);
});
