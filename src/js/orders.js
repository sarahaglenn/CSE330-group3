import { checkLogin } from "./auth.mjs";
import { getOrders } from "./externalServices.mjs";
import { orderTemplate, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const token = checkLogin();
if (token) {
  const orders = await getOrders(token);
  // console.log(orders);
  // trying to filter for unique orders
  const seenOrders = new Set();
  const uniqueOrders = orders.filter((order) => {
    //exclude id when comparing
    const orderDetails = JSON.stringify({
      fname: order.fname,
      lname: order.lname,
      street: order.street,
      city: order.city,
      state: order.state,
      zip: order.zip,
      cardNumber: order.cardNumber,
      expiration: order.expiration,
      code: order.code,
      // orderDate: order.orderDate, //commented out because many orders are identical except for the date
      orderTotal: order.orderTotal,
      tax: order.tax,
      shipping: order.shipping,
      items: order.items
    });
    if (seenOrders.has(orderDetails)) {
      // if the order details have already been seen, it's a duplicate, so throw it out.
      return false;
    }

    // otherwise, add the details to the set and keep the order
    seenOrders.add(orderDetails);
    return true;
  });
// console.log(uniqueOrders);
  const firstTenUniqueOrders = uniqueOrders.slice(2, 12); //limiting to ten to spend up page rendering
  populateTable(firstTenUniqueOrders);
  // const firstTenOrders = orders.slice(2, 12);
  // populateTable(firstTenOrders);
  // populateTable(orders);
} else {
  console.log("Redirecting to login page, no valid token available");
}


  function populateTable(orders) {
    const tableBody = document.querySelector("#orderTable tbody");
    orders.forEach(order => {
      const row = orderTemplate(order);
      tableBody.innerHTML += row;
    });
  }
