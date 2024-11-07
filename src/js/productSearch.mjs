import { getProductsByCategory } from "./externalServices.mjs";


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
function search(searchTarget) {
  console.log(searchTarget);

  // match string to product name??

  let data = getProductsByCategory(searchTarget);
  console.log(data)

  // redirect to product list page

}
