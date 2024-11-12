import { login } from "./auth.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const redirect = getParam("redirect");

const emailInput = document.getElementById("email-input").value;
const passwordInput = document.getElementById("password-input").value;
const loginButton = document.getElementById("login-button");

// check login form
loginButton.addEventListener("click", () => {
  login({emailInput, passwordInput}, redirect);
})
