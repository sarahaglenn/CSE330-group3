import productList from "./productList.mjs"

import { loadHeaderFooter, waitForCartCount } from "./utils.mjs"

loadHeaderFooter();

productList(".product-list")

waitForCartCount();