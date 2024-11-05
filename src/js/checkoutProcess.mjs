import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs"

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.qty,
    };
  });
  return simplifiedItems;
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  orderTotal: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
    // this.calculateOrderTotal();
  },
  calculateItemSummary: function () {
    // calculate and display subtotal and number of items
    this.itemTotal = 0;
    this.subtotal = 0;
    for (const item of this.list) {
        this.itemTotal += item.qty;
    }
    const prices = this.list.map((item) => item.FinalPrice * item.qty);
    prices.forEach((price) => {
      this.subtotal += price;
    });

    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
    this.outputSelector + " #num-items");
    itemNumElement.innerText = this.itemTotal;
    summaryElement.innerText = `$ ${this.subtotal.toFixed(2)}`
  },
  calculateOrderTotal: function () {
    // calculate shipping and tax and total for the order
    this.tax = 0;
    this.shipping = 0;
    this.shipping = (10 + 2 * (this.itemTotal - 1)).toFixed(2);
    this.tax = (this.subtotal * 0.06).toFixed(2);
    this.orderTotal = (parseFloat(this.subtotal) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
    // display the totals
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    // after calculating, display totals
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);
    shipping.innerText = `$ ${this.shipping}`;
    tax.innerText = `$ ${this.tax}`;
    orderTotal.innerText = `$ ${this.orderTotal}`;
  },
  checkout: async function (form) {
    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");

    } catch (err) {
      console.log(err);
    }
  }
};

export default checkoutProcess;

