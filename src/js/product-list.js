import { getProductsByCategory } from "./externalServices.mjs";
import productList, { quickViewTemplate } from "./productList.mjs";

import { loadHeaderFooter, waitForCartCount, getParam } from "./utils.mjs";

let sortBy = "Name A - Z"; // Default Sort By
const categoryValue = getParam("category");

loadHeaderFooter();

productList(sortBy, ".product-list", categoryValue);

waitForCartCount();

const dropdown = document.getElementById("sort-by");

dropdown.addEventListener("change", () => {
  sortBy = dropdown.value;
  productList(sortBy, ".product-list", categoryValue);
});

const title = document.querySelector("h2");
title.innerHTML = `Top Products: ${categoryValue.replace("-", " ")}`;


/* ==================================================================
 * POP UP logic Below
 * =============================================================== */

// checks all clicks then checks if the id of a click matches our target
//    prevents selecting un-loaded dynamic content
document.addEventListener("click", (event) => {
  if (event.target.id === "quick-details") {
    handlePopUpOpen();
  }
  if (event.target.id === "close-quick-details") {
    const elementToRemove = document.getElementById("quick-view-popup");
    const parentElement = elementToRemove.parentNode;
    parentElement.removeChild(elementToRemove);  
  }
});

/* ====================================================
 * Handel pop up open
 =================================================== */
async function handlePopUpOpen() {
  let itemData = "";

  // get item ID
  const quickDetailsButton = document.getElementById('quick-details');
  const productId = quickDetailsButton.value;
  console.log(productId)

  // find item data using id
  let products = await getProductsByCategory(categoryValue);
  products.forEach(element => {
    if (element.Id === productId) {
      itemData = element;
    }
  });

  // create pop up div
  const newParagraph = document.createElement("div");
  newParagraph.innerHTML = quickViewTemplate(itemData);
  
  // inject pop up
  const element = document.getElementById("item-list");
  element.appendChild(newParagraph);
}
