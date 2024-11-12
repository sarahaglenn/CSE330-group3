import { login } from "./auth.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const redirect = getParam("redirect");

const loginButton = document.getElementById("login-button");

// check login form
loginButton.addEventListener("click", () => {
  const email = document.getElementById("email").value; //the name of these variables has to match what the server is expecting
  const password = document.getElementById("password").value;
  login({ email, password }, redirect);
});
