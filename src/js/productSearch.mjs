import { getProductsByCategory } from "./externalServices.mjs";
import { setLocalStorage } from "./utils.mjs";

// checks all clicks then checks if the id of a click matches our target
//    prevents selecting un-loaded dynamic content
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("search-button-class")) {
    const searchBar = document.getElementById("search-bar");
    search(searchBar.value);
  }
});

// updates search target on enter press
//    and prevents selecting un-loaded dynamic content
document.addEventListener("keydown", (event) => {
  if (event.target.classList.contains("search-input") && event.key === "Enter") {
    const searchBar = document.getElementById("search-bar");
    search(searchBar.value);
  }
});

/* ====================================================
 * Handel Product Search
 =================================================== */
async function search(searchTarget) {
  searchTarget = searchTarget.toLowerCase();
  let targetMatches = [];

  const allProducts = [
    await getProductsByCategory("tents"),
    await getProductsByCategory("hammocks"),
    await getProductsByCategory("backpacks"),
    await getProductsByCategory("sleeping-bags")
  ];

  // loop through each category to find matches
  allProducts.forEach(category => {
    category.forEach(item => {
      const name = item.Name.toLowerCase();

      if (name.includes(searchTarget)) {
        targetMatches.push(item);
      }
    });
  });

  // store items and redirect to product list page
  setLocalStorage("searchedProducts", targetMatches);
  window.location.href = "../product-list/index.html?category=search";
}
