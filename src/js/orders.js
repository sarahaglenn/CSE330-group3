import { checkLogin } from "./auth.mjs";
import { getOrders } from "./externalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const token = await checkLogin();
//await getOrders(token);
