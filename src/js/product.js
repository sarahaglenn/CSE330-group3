import { getParam, waitForCartCount } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { getProductsByCategory } from "./externalServices.mjs";
import { recommendedTemplate } from "./productList.mjs";

const productId = getParam("product");

productDetails(productId);

waitForCartCount();

/* ====================================================
 Fill in recommended products' details
 =================================================== */
document.addEventListener("DOMContentLoaded", async () => {
  const recommendedEl = document.querySelector(".recommendedProducts");
  let html = "";

  const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
  for (let i = 0; i < 3; i++) {
    // choose 3 products
    // choose a random category from tents, hammocks, sleeping bags, and backpacks
    let category = categories[Math.floor(Math.random() * categories.length)];
    let recProducts = await getProductsByCategory(category);

    //choose a random product from that category
    let recommendedProduct =
      recProducts[Math.floor(Math.random() * recProducts.length)];

    // render with template
    html += await recommendedTemplate(recommendedProduct);
  }
  recommendedEl.insertAdjacentHTML("beforeend", html);
});
