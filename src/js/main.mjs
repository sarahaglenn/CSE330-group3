import productList from "./productList.mjs"

import { loadHeaderFooter, waitForCartCount } from "./utils.mjs"

// Default Sort By
let sortBy = "Name A - Z";

loadHeaderFooter();

productList(sortBy, ".product-list")

waitForCartCount();

const dropdown = document.getElementById("sort-by");

dropdown.addEventListener("change", () => {
  sortBy = dropdown.value;
  productList(sortBy, ".product-list")
});


