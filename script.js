const container = document.querySelector(".content-container");
const outTrash = document.querySelector(".trash-out");
const removeTrash = document.querySelector(".remove-trash");
const totalPrice = document.querySelector(".total-price");
const mockData = [
  {
    id: 1,
    title: "CF Moto",
    description: "super bike",
    price: 1000,
    image:
      "https://cfmoto-moto.ru/wp-content/uploads/2020/12/300sr-orange-moto.png",
  },
  {
    id: 2,
    title: "CF Moto",
    description: "super bike",
    price: 1500,
    image:
      "https://cdn.shopify.com/s/files/1/0509/8772/9074/products/IMG_9079_800x.png?v=1668676167",
  },
];

let trashArr = JSON.parse(localStorage.getItem("trash")) || [];

mockData.forEach((item) => {
  const div = document.createElement("div");
  let newCard = `<div class="cards" data-id=${item.id}>
  <div class="card content-card" style="width: 18rem;">
      <img src="${item.image}" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.description}.</p>
      </div>
      <div class="card-body d-flex align-items-center justify-content-between">
          <h6>${item.price}$</h6>
          <button class="btn btn-primary goTrash" data-id=${item.id}>В корзину</button>
      </div>
  </div>
</div>`;
  div.innerHTML = newCard;
  container.append(div);
});

const popup = document.querySelector(".popup");
const trashBtn = document.querySelector(".trash");
const closePopupBtn = document.querySelector(".close-popup");
const cards = document.querySelectorAll(".cards");
const trashOut = document.querySelector(".trash-out");
const removeTrashBtn = document.querySelector(".remove-trash");

// mockData.forEach(function(item) {
// })

function createTrash() {
  let local = JSON.parse(localStorage.getItem("trash"));
  local.forEach(function (item) {
    const div = document.createElement("div");
    div.classList.add("card-trash");
    let cardTrash = `<div class="card" style="width: 13rem;">
    <img src="${item.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${item.price}$</p>
    </div>
  </div>`;
    div.innerHTML = cardTrash;
    outTrash.append(div);
  });
}

function total() {
  let price = 0;
  let local = JSON.parse(localStorage.getItem("trash"));
  local.forEach(function (item) {
    price += item.price;
    // price = price + item.price
  });
  totalPrice.innerText = `${price} $`;
}

trashBtn.addEventListener("click", function () {
  popup.style.display = "block";
  createTrash();
  total();
});

closePopupBtn.addEventListener("click", function () {
  popup.style.display = "none";
});

cards.forEach((card) => {
  card.addEventListener("click", function (event) {
    if (event.target.classList.contains("goTrash")) {
      let id = event.target.getAttribute("data-id");
      let product = { ...mockData.find((item) => item.id === Number(id)) };
      product.id = Date.now();

      // let product = mockData.find((item) => item.id === Number(id));
      // const pr = {
      //   id: Date.now(),
      //   title: product.title,
      //   description: product.description,
      //   price: product.price,
      //   image: product.image,
      // };
      // trashArr.push(pr);
      trashArr.push(product);
      console.log(trashArr);
      localStorage.setItem("trash", JSON.stringify(trashArr));
    }
  });
});
// removeTrashBtn.addEventListener("click", function () {
//   const trashCards = document.querySelectorAll(".product-card");
//   trashCards.forEach(function (item) {
//     item.remove();
//   });
// });

removeTrash.addEventListener("click", function () {
  trashArr = [];
  localStorage.removeItem("trash");
  document.querySelectorAll(".card-trash").forEach(function (card) {
    card.remove();
  });
  totalPrice.innerText = `0 $`;
});
