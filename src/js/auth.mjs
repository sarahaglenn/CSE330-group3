import { jwtDecode } from "jwt-decode";
import { loginRequest } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (err) {
    console.log(err);
  }
}

function isTokenValid(token) {
  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);
  const exp = decoded.exp * 1000;
  const todayDate = new Date();

  if (exp < todayDate.getTime()) {
    console.log("Token Expired");
    return false;
  }

  console.log("Valid token");
  return true;
}

export function checkLogin() {
  const token = getLocalStorage(tokenKey);

  if (!isTokenValid(token)) {
    localStorage.removeItem(tokenKey)
    const currentPage = window.location;
    console.log(currentPage);
    window.location = `/login/index.html?redirect=${currentPage.pathname}`;
  } else return token;
}
