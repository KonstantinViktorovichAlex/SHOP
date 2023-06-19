const container = document.querySelector(".content-container");
const outTrash = document.querySelector(".trash-out");
const removeTrash = document.querySelector(".remove-trash");
const totalPrice = document.querySelector(".total-price");
const loginBtn = document.querySelector(".login-btn");
const popupLogin = document.querySelector(".popup-login");
const modelClose = document.querySelector(".modelClose");
const productTable = document.querySelector(".product-table");

const allProducts = [];
const trashProducts = [];

function init() {
  getData();
}

async function getData() {
  const result = await fetch("https://dummyjson.com/products?limit=5").then(
    (res) => res.json()
  );

  result.products.forEach((item) => allProducts.push(item));
  renderData(result);
}

function renderData({ products }) {
  products.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
    <th scope="row">${product.id}</th>
    <td><img class='imageTable' src="${product.images[0]}"/></td>
    <td>${product.brand}</td>
    <td>${product.category}</td>
    <td>${product.price}$</td>
    <td>
    <button type="button" class="btn btn-success btn-sm">pay</button>
    <button type="button" class="btn btn-warning btn-sm more" data-id=${product.id}>Подробнее</button>
    </td>
    </tr>
    `;
    productTable.append(tr);
  });
  generateMoreEvents();
}

const popup = document.querySelector(".popup");
const trashBtn = document.querySelector(".trash");
const closePopupBtn = document.querySelector(".close-popup");
const cards = document.querySelectorAll(".cards");
const trashOut = document.querySelector(".trash-out");
const removeTrashBtn = document.querySelector(".remove-trash");

removeTrash.addEventListener("click", function () {
  trashArr = [];
  localStorage.removeItem("trash");
  document.querySelectorAll(".card-trash").forEach(function (card) {
    card.remove();
  });
  totalPrice.innerText = `0 $`;
});

loginBtn.addEventListener("click", function () {
  popupLogin.style.display = "flex";
});
modelClose.addEventListener("click", function () {
  popupLogin.style.display = "none";
});

function generateMoreEvents() {
  document.querySelectorAll(".more").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      console.log(event.target.getAttribute("data-id"));
      getSingleProduct(event.target.getAttribute("data-id"));
    });
  });
}

async function getSingleProduct(id) {
  const result = await fetch(`https://dummyjson.com/products/${id}`).then(
    (res) => res.json()
  );
  renderSingleProduct(result);
}

function renderSingleProduct(product) {
  const imageOut = document.querySelector(".images");
  const description = document.querySelector(".description");
  product.images.forEach(function (item) {
    const img = document.createElement("img");
    img.style.width = "150px";
    img.src = item;
    imageOut.appendChild(img);
  });
  const descriptionInfo = document.createElement("h3");
  descriptionInfo.innerText = product.description;
  description.appendChild(descriptionInfo);
}

init();
