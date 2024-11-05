// import productList from "./productList.mjs"

import { loadHeaderFooter, waitForCartCount } from "./utils.mjs"

// Default Sort By
// let sortBy = "Name A - Z";

loadHeaderFooter();

// productList(sortBy, ".product-list");

waitForCartCount();

// const dropdown = document.getElementById("sort-by");

// dropdown.addEventListener("change", () => {
//   sortBy = dropdown.value;
//   productList(sortBy, ".product-list")
// });

// Newsletter sign-up dialog elements
const subscribeBtn = document.querySelector(".subscribe");
const signupBox = document.querySelector(".newsletter dialog");
const closeBtn = document.querySelector(".newsletter dialog button");
const submitBtn = document.querySelector("#submitBtn");

// Function to dismiss the dialog when clicking anywhere outside it
const dismiss = ({target:dialogBox}) => {
    if (dialogBox.nodeName === "DIALOG")
        dialogBox.close("dismiss")
}

// Open the newsletter sign-up dialog
if (submitBtn) {
  subscribeBtn.addEventListener("click", () => {
    signupBox.showModal();
    signupBox.addEventListener("click", dismiss);
  })
};

if (closeBtn) {
  closeBtn.addEventListener("click", () => signupBox.close());
}
// Display a thank you message to confirm subscription
if (submitBtn) {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const form = signupBox.querySelector("form");
    if (form.checkValidity()) {

      const thanksMsg = document.createElement("p");
      thanksMsg.textContent = `${form.name.value}, thanks for subscribing to the Sleep Outside Newsletter!`;
  
      //replace form with the thanks message
      form.replaceWith(thanksMsg);
      // close the dialog after 3 seconds
      setTimeout(() => signupBox.close(), 3000);
    } else {
      form.reportValidity();
    }
  })
};
