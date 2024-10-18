import { getData } from "./productData.mjs";
import{ renderListWithTemplate, productSorting } from "./utils.mjs";

export default async function productList(sortBy, selector, category = "tents") {
  const topSellers = ["880RR", "985RF", "344YJ", "985PR"]

  const element = document.querySelector(selector);
  const products = await getData(category);

  const filteredProducts = products.filter(item => topSellers.includes(item.Id));
  // Generate HTML outside the filter loop
  
  const sortedProducts = productSorting(sortBy, filteredProducts);

  renderListWithTemplate(productCardTemplate, element, sortedProducts);
}

function productCardTemplate(productData) {

  const discountPercent = (
      (productData.SuggestedRetailPrice - productData.FinalPrice) / 
      productData.SuggestedRetailPrice) * 100;

    return `</li>
      <li class="product-card">
        <a href="product_pages/index.html?product=${productData.Id}">
          <img
            src="${productData.Image}"
            alt="${productData.NameWithoutBrand}"
          />
          <h3 class="card__brand">${productData.Brand.Name}</h3>
          <h2 class="card__name">${productData.NameWithoutBrand}</h2>
          <p class="product-card__discount">Now ${discountPercent.toFixed(0)}% off!</p>
          <p class="product-card__price">${productData.FinalPrice}</p></a
        >
      </li>`;
}
