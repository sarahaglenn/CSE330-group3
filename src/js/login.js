import { login } from "./auth.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const redirect = getParam("redirect");

const loginButton = document.getElementById("login-button");

// check login form
loginButton.addEventListener("click", () => {
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;
  login({ emailInput, passwordInput }, redirect);
});
