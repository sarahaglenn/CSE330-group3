import { getProductsByCategory } from "./externalServices.mjs";
import{ renderListWithTemplate, productSorting, getLocalStorage } from "./utils.mjs";

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


/* ====================================================
 * render the page of searched items
 =================================================== */
export function searchedProductList(sortBy, selector) {
  const element = document.querySelector(selector);
  let products = getLocalStorage("seachedProducts")
  console.log("items", products)

  const sortedProducts = productSorting(sortBy, products);
  renderListWithTemplate(productCardTemplate, element, sortedProducts);
}


/* ====================================================
 * Calculate the discount for a product and return it
 =================================================== */
function calcProductDiscount(productData) {
    return ((productData.SuggestedRetailPrice - productData.FinalPrice) /
      productData.SuggestedRetailPrice) * 100;
}

/* ====================================================
 * Generates HTML for a product card, displaying image,
 *    brand, name, discount, price,
 *    and a "Quick Details" button.
 =================================================== */
function productCardTemplate(productData) {

  const discountPercent = calcProductDiscount(productData);

    return `</li>
      <li class="product-card">
      <a href="/product_pages/index.html?product=${productData.Id}">

          <img
            srcset="${ productData.Images.PrimarySmall } 80w, ${ productData.Images.PrimaryMedium } 160w, ${ productData.Images.PrimaryLarge } 320w"
            sizes="(max-width: 400px) 120px (max-width: 768px) 160px, 100vw"
            src="${productData.Images.PrimaryMedium}"
            alt="${productData.NameWithoutBrand}"
          />
          <h3 class="card__brand">${productData.Brand.Name}</h3>
          <h2 class="card__name">${productData.NameWithoutBrand}</h2>
          <p class="product-card__discount">Now ${discountPercent.toFixed(0)}% off!</p>
          <p class="product-card__price">$${productData.FinalPrice.toFixed(2)}</p></a
        >
        <button class="quick-details" value="${productData.Id}" >Quick Details</button>
      </li>`;
}

/* ====================================================
 * Generates HTML for a quick view popUp
 =================================================== */
export function quickViewTemplate(productData) {

  const discountPercent = calcProductDiscount(productData);

  return `<div id="quick-view-popup">
          <h3 id="productName">${productData.Name}</h3>

          <a href="/product_pages/index.html?product=${productData.Id}">
          <img
            src="${productData.Images.PrimaryLarge}"
            alt="${productData.NameWithoutBrand}"
          /></a>
          <p class="product-card__price">$${productData.FinalPrice.toFixed(2)}</p>
          <p class="product-card__discount">Now ${discountPercent.toFixed(0)}% off!</p>
          <button id="close-quick-details">Close Quick View</button>
          <h3 class="card__brand">${productData.Brand.Name}</h3>
          <h2 class="card__name">${productData.NameWithoutBrand}</h2>

          <p>${productData.Colors[0].ColorName}</p>
          <p>${productData.DescriptionHtmlSimple}</p>
      </div>`;
}

{/* <a href="product_pages/index.html?product=${productData.Id}"> */ }

/* ====================================================
 * Generates HTML limited product details of recommended products
 =================================================== */
export function recommendedTemplate(productData) {

  return `</li>
    <li class="product-card">
    <a href="/product_pages/index.html?product=${productData.Id}">
        <img
          srcset="${ productData.Images.PrimarySmall } 80w, ${ productData.Images.PrimaryMedium } 160w, ${ productData.Images.PrimaryLarge } 320w"
          sizes="(max-width: 400px) 120px (max-width: 768px) 160px, 100vw"
          src="${productData.Images.PrimaryMedium}"
          alt="${productData.NameWithoutBrand}"
        />
        <h3 class="card__brand">${productData.Brand.Name}</h3>
        <h2 class="card__name">${productData.NameWithoutBrand}</h2>
        <p class="product-card__price">$${productData.FinalPrice.toFixed(2)}</p>
    </li>`;
}
