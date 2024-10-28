import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
  updateCartCount,
  waitForCartCount,
} from "./utils.mjs";

/* ===========================================
 * This is the "main" function here
 *    Gets the cart items from local and 
 *    transforms it to html templates
=========================================== */
function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <button class="cart-quantity__button
  cart-quantity__button--minus" data-id=${item.Id}>-</button>
  <p class="cart-item__quantity">${item.qty}</p>
  <button class="cart-quantity__button cart-quantity__button--plus" data-id=${
    item.Id
  }>+</button>
  <button class="cart-remove__button" data-id=${item.Id}>❌</button>
  <p class="cart-card__price">$${item.FinalPrice * item.qty}</p>
</li>`;

  return newItem;
}

document.addEventListener("click", (event) => {
  if (event.target.matches(".cart-quantity__button")) {
    const id = event.target.getAttribute("data-id");
    const isAdding = event.target.classList.contains(
      "cart-quantity__button--plus"
    );
    updateQuantity(id, isAdding);
  } else if (event.target.matches(".cart-remove__button")) {
    removeFromCart(event.target.getAttribute("data-id"));
  }
});

function updateQuantity(id, isAdding) {
  let cartItems = getLocalStorage("so-cart");
  const index = cartItems.findIndex((item) => item.Id === id);

  if (index !== -1) {
    if (isAdding) {
      cartItems[index].qty++;
    } else if (cartItems[index].qty > 1) {
      cartItems[index].qty--;
    }
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
    showTotal();
    updateCartCount();
  }
}

function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart");
  const index = cartItems.findIndex((item) => item.Id === id);
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  showTotal();
  updateCartCount();
}

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart");
  const cartPrices = cartItems.map((item) => item.FinalPrice * item.qty);
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
    total.innerHTML = `Total: $${calculateCartTotal().toFixed(2)}`;
  } else {
    document.querySelector(".cart-footer").style.display = "none";
  }
}

if (getLocalStorage("so-cart")) {
  renderCartContents();
  showTotal();
}

loadHeaderFooter();

waitForCartCount();
