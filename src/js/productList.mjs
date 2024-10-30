import { getProductsByCategory } from "./externalServices.mjs";
import{ renderListWithTemplate, productSorting } from "./utils.mjs";

// const topSellers = ["880RR", "985RF", "344YJ", "985PR"]

export default async function productList(sortBy, selector, category = "tents", topSellers = null) {
  const element = document.querySelector(selector);
  let products = await getProductsByCategory(category);
  

  if (topSellers) {
    products = products.filter(item => topSellers.includes(item.Id));
    // Generate HTML outside the filter loop
  }
  
  const sortedProducts = productSorting(sortBy, products);

  renderListWithTemplate(productCardTemplate, element, sortedProducts);
}

function productCardTemplate(productData) {

  const discountPercent = (
      (productData.SuggestedRetailPrice - productData.FinalPrice) / 
      productData.SuggestedRetailPrice) * 100;

    return `</li>
      <li class="product-card">
      <a href="/product_pages/index.html?product=${productData.Id}">

          <img
            src="${productData.Images.PrimaryMedium}"
            alt="${productData.NameWithoutBrand}"
          />
          <h3 class="card__brand">${productData.Brand.Name}</h3>
          <h2 class="card__name">${productData.NameWithoutBrand}</h2>
          <p class="product-card__discount">Now ${discountPercent.toFixed(0)}% off!</p>
          <p class="product-card__price">$${productData.FinalPrice.toFixed(2)}</p></a
        >
      </li>`;
}

{/* <a href="product_pages/index.html?product=${productData.Id}"> */}
