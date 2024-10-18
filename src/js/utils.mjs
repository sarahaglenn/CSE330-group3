// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function createErrorMsg(msg) {
  return `<div class="error-div">
            <p class="error-msg">${msg}<p/>
         <div/>`;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = "true") {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlString = await templateFn(data);

  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }

}


function loadTemplate(path) {
  return async function() {
    const res = await fetch(path);
    if(res.ok) {
      const html = await res.text();
      return html;
   }
  };
}

// const headerTemplateFn = loadTemplate("/partials/header.html");
// const footerTemplateFn = loadTemplate("/partials/footer.html");

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html"); 

  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");

  renderWithTemplate(headerTemplateFn, header);
  renderWithTemplate(footerTemplateFn, footer);
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCountElement = document.getElementById("cart-count");

  if (cartCountElement) {
    if (cartItems.length > 0) {
      cartCountElement.innerText = cartItems.length;
      cartCountElement.style.display = "inline";
    } else {
      cartCountElement.style.display = "none";
    }
  }
}

export function waitForCartCount() {
  const observer = new MutationObserver((mutations, observer) => {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      updateCartCount();
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

export function productSorting(sortBy, productsList) {
  let sortedProducts = [];

  if (sortBy == "Name A - Z") {
    sortedProducts = productsList.sort(
      (item1, item2) => item1.NameWithoutBrand.
        toLowerCase().
        localeCompare(item2.NameWithoutBrand.toLowerCase(), 'en-US') 
    );

  } else if (sortBy == "Price - Descending"){
    sortedProducts = productsList.sort(
      (item1, item2) => item2.FinalPrice - item1.FinalPrice
    );

  } else if (sortBy == "Price - Ascending"){
    sortedProducts = productsList.sort(
      (item1, item2) => item1.FinalPrice - item2.FinalPrice
    );
  }
  return sortedProducts;
}
