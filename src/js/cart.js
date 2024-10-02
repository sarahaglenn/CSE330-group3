import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart");
  const cartPrices = cartItems.map((item) => item.FinalPrice);
  let total = 0;
  cartPrices.forEach((price) => {
    total += price;
  });
  return total;
}

function showTotal() {
  document.querySelector(".cart-footer").style.display = "block";
  const total = document.querySelector(".cart-footer p");
  total.innerHTML = `Total: $${calculateCartTotal()}`;
}

if (getLocalStorage("so-cart")) {
  renderCartContents();
  showTotal();
}
