import productList from "./productList.mjs";

import { loadHeaderFooter, waitForCartCount, getParam } from "./utils.mjs";

// Default Sort By
let sortBy = "Name A - Z";
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
title.innerHTML = `Top Products: ${categoryValue
  .toUpperCase()
  .replace("-", " ")}`;
