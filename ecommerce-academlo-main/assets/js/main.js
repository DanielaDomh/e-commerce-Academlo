import cart from "./components/cart.js";
import loader from "./components/loader.js";
import products from "./components/products.js";
import showCart from "./components/showCart.js";
import showMenu from "./components/showMenu.js";
import getProducts from "./helpers/getProducts.js";
import showModal from "./components/showModal.js";
import navAnimation from "./components/navAnimation.js";

/* UI Element */

/* Ocultar loader */
loader();

/* Mostrar Menu */
showMenu();

/* Mostrar Carrito */
showCart();


/* End UI Element */

/* Products */
const { db, printProducts } = products(await getProducts());

/* Carrito */
cart(db, printProducts);

/* Mostrar Modal */
showModal(db);
/* navBar Animation*/
navAnimation();

const body = document.querySelector("body");
const btn = document.querySelector(".btn_dark");
const icon = document.querySelector(".btn__icon");

/* save the dark mode use "local storage"*/
function keep(svdrack) {
  localStorage.setItem("darkmode", svdrack);
}

function loadd() {
  const darkmode = localStorage.getItem("darkmode");
  /***** condition if the dark mode was never activated */
  if (!darkmode) {
    keep(false);
    icon.classList.add("bxs-sun");
  } else if (darkmode == "true") {
    body.classList.add("darkmode");
    icon.classList.add("bxs-moon");
  } else if (darkmode == "false") {
    icon.classList.add("bxs-sun");
  }
}

loadd();
btn.addEventListener("click", () => {
  body.classList.toggle("darkmode");
  icon.classList.add("animated");

  /***** LOCAL STORAGE ******/
  keep(body.classList.contains("darkmode"));

  if (body.classList.contains("darkmode")) {
    icon.classList.remove("bxs-sun");
    icon.classList.add("bxs-moon");
  } else {
    icon.classList.remove("bxs-moon");
    icon.classList.add("bxs-sun");
  }

  setTimeout(() => {
    icon.classList.remove("animated");
  }, 500);
});
