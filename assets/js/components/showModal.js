function showModal(db) {
  const productsDOM = document.querySelector(".products__container");
  const modalProducto = document.querySelector(".modal");

  productsDOM.addEventListener("click", function (e) {
    if (e.target.closest(".product__title")) {
      const id = +e.target.dataset.id;
      const productFinded = db.find((p) => p.id === id);
      console.log(productFinded);
      document
        .querySelector(".modal__image > img")
        .setAttribute("src", productFinded.image);
      document
        .querySelector(".modal__image > img")
        .setAttribute("alt", productFinded.name);
      document
        .querySelector(".modal--add")
        .setAttribute("data-id", productFinded.id);
      document.querySelector(".modal__title").innerHTML = productFinded.name;
      document.querySelector(
        ".modal__price"
      ).innerHTML = `$ ${productFinded.price}`;
      document.querySelector(".modal__description").innerHTML =
        productFinded.description;
      document.querySelector(".modal__category").innerHTML =
        productFinded.category;
      document.querySelector(
        ".modal__stock"
      ).innerHTML = `Cantidad: ${productFinded.quantity}`;
      modalProducto.classList.toggle("show_modal");
    }
  });

  modalProducto.addEventListener("click", function (e) {
    if (e.target.closest(".modal--close")) {
      modalProducto.classList.toggle("show_modal");
    }
  });
}

export default showModal;
