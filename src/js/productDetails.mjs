import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);

  renderProductDetails();

  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let cartItems = [];
  if (getLocalStorage("so-cart")) {
    cartItems = getLocalStorage("so-cart");
  }
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);

  runCartIconAnimation();
}

function runCartIconAnimation() {
  const icon = document.getElementById("cart-icon");
  icon.classList.add("cart-icon-animate");
  setTimeout(() => {
    icon.classList.remove("cart-icon-animate");
  }, 2000);
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
