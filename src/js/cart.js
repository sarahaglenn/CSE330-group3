import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

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
  <button class="cart-remove__button" data-id=${item.Id}>❌</button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

document.addEventListener("click", (event) => {
  if (event.target.matches(".cart-remove__button")) {
    removeFromCart(event.target.getAttribute("data-id"));
  }
});

function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart");
  const index = cartItems.findIndex((item) => item.Id === id);
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  showTotal();
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
  if (calculateCartTotal() > 0) {
    document.querySelector(".cart-footer").style.display = "block";
    const total = document.querySelector(".cart-footer p");
    total.innerHTML = `Total: $${calculateCartTotal()}`;
  } else {
    document.querySelector(".cart-footer").style.display = "none";
  }
}

if (getLocalStorage("so-cart")) {
  renderCartContents();
  showTotal();
}

loadHeaderFooter();
