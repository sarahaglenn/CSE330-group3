import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage, createErrorMsg } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  
  if (product != undefined) {
    renderProductDetails();

  } else {
    const button = document.getElementById("addToCart");
    const main = document.querySelector("main");

    const errMsg = createErrorMsg("This Item is Unavailable");
    main.innerHTML = errMsg;
    button.remove();
  }

  document.getElementById("addToCart").addEventListener("click", addToCart);

  updateCartItemCount();
}

function addToCart() {
  let cartItems = [];
  if (getLocalStorage("so-cart")) {
    cartItems = getLocalStorage("so-cart");
  }
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);

  updateCartItemCount();

  runCartIconAnimation();
}

function runCartIconAnimation() {
  const icon = document.getElementById("cart-icon");
  icon.classList.add("cart-icon-animate");
  setTimeout(() => {
    icon.classList.remove("cart-icon-animate");
  }, 2000);
}

function updateCartItemCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCountElement = document.getElementById("cart-count");

  if (cartItems.length > 0) {
    cartCountElement.innerText = cartItems.length;
    cartCountElement.style.display = "inline"; 
  } else {
    cartCountElement.style.display = "none";
  }
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productRetailPrice").innerText = `Retail price: $${product.SuggestedRetailPrice}`;
  document.querySelector("#productDiscount").innerText = `Discount: -$${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}`;
  document.querySelector("#productFinalPrice").innerText = `Final price: $${product.FinalPrice}`;
  document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
