import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, createErrorMsg, loadHeaderFooter, updateCartCount } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  await loadHeaderFooter();

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
}

function addToCart() {
  let cartItems = [];
  
  // add qty to every item added to cart
  product.qty = 1;
  
  if (getLocalStorage("so-cart")) {
    cartItems = getLocalStorage("so-cart");
    cartItems = addCartItemQty(product, cartItems)
  } else {
    cartItems.push(product);
  }

  setLocalStorage("so-cart", cartItems);

  updateCartCount();

  runCartIconAnimation();
}

/* ===========================================
 * If an item is already in the cart, just
 *  add to the qty not the cartList
=========================================== */
function addCartItemQty(productN, cartItems) {
  let isItemInCart = false;
  
  cartItems.forEach(item => {
    if (item.Id == productN.Id) {
      item.qty++;
      isItemInCart = true
    } 
  });

  if (!isItemInCart) {
    cartItems.push(productN);
  }

  return cartItems;
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
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productRetailPrice").innerText = `Retail price: $${product.SuggestedRetailPrice}`;
  document.querySelector("#productDiscount").innerText = `Discount: -$${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}`;
  document.querySelector("#productFinalPrice").innerText = `Final price: $${product.FinalPrice}`;
  document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
