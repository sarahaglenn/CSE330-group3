
import { setLocalStorage, getLocalStorage, updateCartCount, renderListWithTemplate } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart");
export default function shoppingCart() {
  const element = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, element, cartItems);
  const total = calculateListTotal(cartItems);
  showCartTotal(total);
}

function calculateListTotal(list) {
  const prices = list.map((item) => item.FinalPrice * item.qty);
  let total = 0;

  prices.forEach((price) => {
    total += price;
  });

  return total;
}

function showCartTotal(total) {
  // make sure the the total is greater than 0
  if (total > 0) {
    // change the display on the cart footer from none to block
    document.querySelector(".cart-footer").style.display = "block";
    const totalEl = document.querySelector(".cart-footer p");
    // set the innerHTML to reflect the total and formatting
    totalEl.innerHTML = `Total: $${total.toFixed(2)}`;
  } else { // if the total is not > 0, set the cart footer display to none
    document.querySelector(".cart-footer").style.display = "none";
  }
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
  <p class="cart-card__price">$${(item.FinalPrice * item.qty).toFixed(2)}</p>
</li>`;

  return newItem;
}

/* ===========================================
 * This is the "main" function here
 *    Gets the cart items from local and 
 *    transforms it to html templates
=========================================== */
function renderCartContents() {
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
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
  const index = cartItems.findIndex((item) => item.Id === id);

  if (index !== -1) {
    if (isAdding) {
      cartItems[index].qty++;
    } else if (cartItems[index].qty > 1) {
      cartItems[index].qty--;
    }
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
    const total = calculateListTotal(cartItems)
    showCartTotal(total);
    updateCartCount();
  }
}

function removeFromCart(id) {
  const index = cartItems.findIndex((item) => item.Id === id);
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  const total = calculateListTotal(cartItems)
  showCartTotal(total);
  updateCartCount();
}

if (cartItems) {
  renderCartContents();
  const total = calculateListTotal(cartItems)
  showCartTotal(total);
}
