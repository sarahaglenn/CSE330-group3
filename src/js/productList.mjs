import { getData } from "./productData.mjs"

export default async function productList(selector, catagory = "tents") {
  let html = "";
  const topSellers = ["880RR", "985RF", "344YJ", "985PR"]
  const element = document.querySelector(selector);
  const data = await getData(catagory);

  const filteredData = data.filter(item => topSellers.includes(item.Id));

  // Generate HTML outside the filter loop
  for (const item of filteredData) {
    html += renderHtml(item);
  }

  element.innerHTML = html;
}

function renderHtml(productData) {

  const discountPercent = ((productData.SuggestedRetailPrice - productData.FinalPrice) / productData.SuggestedRetailPrice) * 100;

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
