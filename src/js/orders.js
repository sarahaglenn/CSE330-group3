import { checkLogin } from "./auth.mjs";
import { getOrders } from "./externalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const token = checkLogin();
if (token) {
  getOrders(token);
} else {
  console.log("Redirecting to login page, no valid token available");
}
