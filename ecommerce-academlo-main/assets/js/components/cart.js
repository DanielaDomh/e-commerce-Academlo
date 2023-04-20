function cart(db, printProducts) {
  let cart = [];

  // Elemento del DOM
  const productsDOM = document.querySelector(".products__container");
  const notifyDOM = document.querySelector(".notify");
  const cartDOM = document.querySelector(".cart__body");
  const countDOM = document.querySelector(".cart__count--item");
  const totalDOM = document.querySelector(".cart__total--item");
  const checkoutDOM = document.querySelector(".btn--buy");
  const modalDOM = document.querySelector(".modal");

  const subtotalDOM = document.querySelector(".cart__subtotal--item");
  const ivaDOM = document.querySelector(".cart__iva--item");
  const discDOM = document.querySelector(".cart__disc--item");
  const inputDisc = document.querySelector(".input--disc");
  const btnDisc = document.querySelector(".btn--disc");
  const messageDisc = document.querySelector(".message--disc");

  // Funciones
  function printCart() {
    let htmlCart = "";

    if (cart.length === 0) {
      htmlCart += `
        <div class="cart__empty">
          <i class='bx bx-cart'></i>
          <p class="cart__empty--text">No hay productos en el carrito</p>
        </div>
      `;
      notifyDOM.classList.remove("show--notify");
    } else {
      for (const item of cart) {
        const product = db.find((p) => p.id === item.id);
        htmlCart += `
          <article class="article">
            <div class="article__image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="article__content">
              <h3 class="article__title">${product.name}</h3>
              <span class="article__price">$${product.price}</span>
              <div class="article__quantity">
                <button type="button" class="article__quantity-btn article--minus" data-id="${item.id}">
                  <i class='bx bx-minus'></i>
                </button>
                <span class="article__quantity-text">${item.qty}</span>
                <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}">
                  <i class='bx bx-plus'></i>
                </button>
              </div>
              <button type="button" class="article__btn remove-from-cart" data-id="${item.id}">
                <i class='bx bx-trash'></i>
              </button>
            </div>
          </article>
        `;
      }
      notifyDOM.classList.add("show--notify");
    }

    cartDOM.innerHTML = htmlCart;
    notifyDOM.innerHTML = showItemsCount();
    countDOM.innerHTML = showItemsCount();
    totalDOM.innerHTML = showTotal();
    subtotalDOM.innerHTML = showSubtotal();
  }

  function addToCart(id, qty = 1) {
    const itemFinded = cart.find((i) => i.id === id);

    if (itemFinded) {
      itemFinded.qty += qty;
    } else {
      cart.push({ id, qty });
    }
    printCart();
  }

  function removeFromCart(id, qty = 1) {
    const itemFinded = cart.find((i) => i.id === id);
    const result = itemFinded.qty - qty;

    if (result > 0) {
      itemFinded.qty -= qty;
    } else {
      cart = cart.filter((i) => i.id !== id);
    }

    printCart();
  }

  function deleteFromCart(id) {
    cart = cart.filter((i) => i.id !== id);
    printCart();
  }

  function showItemsCount() {
    let suma = 0;
    for (const item of cart) {
      suma += item.qty;
    }
    return suma;
  }

  function showTotal() {
    let total = 0;
    for (const item of cart) {
      const productFinded = db.find((p) => p.id === item.id);
      total += item.qty * productFinded.price;
      total = total;
    }

    return '$' + total;
  }

  function showSubtotal() {
    let subtotal = 0;
    for (const item of cart) {
      const productFound = db.find((p) => p.id === item.id);
      subtotal += productFound.price * item.qty;
    }

    let taxes = 0.16;
    let calculatedTaxes = subtotal * taxes;
    let taxes2 = +calculatedTaxes.toFixed(2);
    ivaDOM.innerHTML = `$${taxes2}`;

    let CalcDiscount = subtotal * 0.5;
    let finalTotal = taxes2 + subtotal;
    let totalWithDisc = (finalTotal - CalcDiscount).toFixed(2);
    totalDOM.innerHTML = `$${finalTotal}`;

    btnDisc.addEventListener("click", (e) => {
      e.preventDefault();
      if (inputDisc.value.toUpperCase() === "APRIL2023") {
        messageDisc.innerHTML = "Se aplicó un 50% de descuento";
        (discDOM.innerHTML = `$${CalcDiscount}`),
          (totalDOM.innerHTML = `$${totalWithDisc}`);
      } else {
        messageDisc.innerHTML = "Intenta de nuevo";
      }
    });

    return `$${subtotal}`;
  }

  function checkout() {
    for (const item of cart) {
      const productFinded = db.find((p) => p.id === item.id);
      productFinded.quantity -= item.qty;
    }

    cart = [];
    printCart();
    printProducts();
    window.alert("Gracias por su compra");
    discDOM.innerHTML = `$0`;
    document.getElementById("form").reset();
    messageDisc.innerHTML = "";
  }

  printCart();

  // Eventos
  productsDOM.addEventListener("click", function (e) {
    if (e.target.closest(".add--to--cart")) {
      const id = +e.target.closest(".add--to--cart").dataset.id;
      addToCart(id);
    }
  });

  modalDOM.addEventListener("click", function (e) {
    if (e.target.closest(".modal--add")) {
      const id = +e.target.dataset.id;
      addToCart(id);
    }
  });

  cartDOM.addEventListener("click", function (e) {
    if (e.target.closest(".article--minus")) {
      const id = +e.target.closest(".article--minus").dataset.id;
      removeFromCart(id);
    }

    if (e.target.closest(".article--plus")) {
      const id = +e.target.closest(".article--plus").dataset.id;
      addToCart(id);
    }

    if (e.target.closest(".remove-from-cart")) {
      const id = +e.target.closest(".remove-from-cart").dataset.id;
      deleteFromCart(id);
    }
  });

  checkoutDOM.addEventListener("click", function () {
    checkout();
  });


  
}

export default cart;


