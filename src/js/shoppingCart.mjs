import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const element = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, element, cartItems);
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
