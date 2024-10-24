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
  cartItems = combineDuplacates(cartItems);

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

/* ===========================================
 * Finds and removes duplicate items in 
 *  cartItems returns the array with count 
 *  added to each item
=========================================== */
function combineDuplacates(cartItems) {
  const map = new Map();
  const uniqueArray = [];

  // add only 1 of each item to uniqueArray
  for (const item of cartItems) {
    if (!map.has(item.Id)) {
      map.set(item.Id, 1);
      uniqueArray.push(item);

    } else {
      // count each item
      map.set(item.Id, map.get(item.Id) + 1);
    }
  }
  
  // add the map count to the uniqueArray items
  uniqueArray.forEach((item) => {
    item.qty = map.get(item.Id);
  });

  return uniqueArray;
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
  <p class="cart-card__quantity">qty: ${item.qty}</p>
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
  updateCartCount();
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

waitForCartCount();
