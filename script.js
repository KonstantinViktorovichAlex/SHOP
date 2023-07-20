const container = document.querySelector(".content-container");
const outTrash = document.querySelector(".trash-out");
const removeTrash = document.querySelector(".remove-trash");
const loginBtn = document.querySelector(".login-btn");
const popupLogin = document.querySelector(".popup-login");
const modelClose = document.querySelector(".modelClose");
const productTable = document.querySelector(".product-table");
// TRASH
const popup = document.querySelector(".popup");
const trashBtn = document.querySelector(".trash");
const closePopupBtn = document.querySelector(".close-popup");
const trashOut = document.querySelector(".trash-out");
const totalTrash = document.querySelector(".total-price");
const clearAllTrash = document.querySelector(".remove-trash");

const allProducts = [];
let trashProducts = JSON.parse(localStorage.getItem("products")) || [];

function init() {
  getData();
}

async function getData() {
  const result = await fetch("https://dummyjson.com/products?limit=5").then(
    (res) => res.json()
  );

  result.products.forEach((item) => allProducts.push(item));
  renderData(result);
  payListeners();
  // JSON.parse(localStorage.getItem("products")).forEach(function (item) {
  //   trashProducts.push(item);
  // });
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
    <button type="button" class="btn btn-success btn-sm pay" data-id=${product.id}>pay</button>
    <button type="button" class="btn btn-warning btn-sm more" data-id=${product.id}>Подробнее</button>
    </td>
    </tr>
    `;
    productTable.append(tr);
  });
  generateMoreEvents();
}

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

// TRASH FUNCTIONS --------------------------------

trashBtn.addEventListener("click", function (e) {
  popup.style.display = "block";
  renderTrash();
});

closePopupBtn.addEventListener("click", function (e) {
  popup.style.display = "none";
  trashOut.innerHTML = "";
});

function payListeners() {
  const payBtns = document.querySelectorAll(".pay");
  payBtns.forEach(function (item) {
    item.addEventListener("click", addToTrash);
  });
}

function addToTrash() {
  let idProduct = this.getAttribute("data-id");
  // const product = allProducts.find(item => item.id === idProduct)
  const product = {
    ...allProducts.find(function (item) {
      if (item.id === Number(idProduct)) {
        return item;
      }
    }),
  };
  product.id = new Date().getTime();
  trashProducts.push(product);
  localStorage.setItem("products", JSON.stringify(trashProducts));
}

function renderTrash() {
  trashOut.innerHTML = "";
  trashProducts.forEach(function (product) {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="wrapper-card">
      <div class="image">
        <img class="image-card" src=${product.images[0]} alt="">
      </div>
      <div class="content-card">
        <h3>${product.brand} $${product.price}</h3>
        <button type="button" class="btn btn-sm btn-danger remove-btn" data-id=${product.id}>remove</button>
      </div>
    </div>`;
    trashOut.append(div);
  });
  totalPrice();
  removeItemTrash();
  removeAll();
}

function totalPrice() {
  let count = 0;
  trashProducts.forEach(function (product) {
    count += product.price;
  });
  totalTrash.innerText = count;
}

function removeItemTrash() {
  const trashBtns = document.querySelectorAll(".remove-btn");
  trashBtns.forEach(function (item) {
    item.addEventListener("click", removeItem);
  });
}

function removeItem() {
  let idProduct = this.getAttribute("data-id");
  console.log(idProduct);

  trashProducts = trashProducts.filter((item) => item.id !== Number(idProduct));
  localStorage.setItem("products", JSON.stringify(trashProducts));
  console.log(trashProducts);
  renderTrash();
}
function removeAll() {
  clearAllTrash.addEventListener("click", function () {
    localStorage.removeItem("products");
    trashOut.innerHTML = "";
    totalTrash.innerText = 0;
  });
}
init();
