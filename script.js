const container = document.querySelector(".content-container");
const btnbuy = document.getElementById("btn-success");
const modalbuy = document.getElementById("modalreg");
const closemodalwind = document.getElementsByClassName("close_modal_window")[0];
const form1 = document.querySelector('form1');
const mockData = [
  {
    id: 1,
    title: "CF Moto",
    description: "super bike",
    price: "1000",
    image:
      "https://cfmoto-moto.ru/wp-content/uploads/2020/12/300sr-orange-moto.png",
  },
  {
    id: 2,
    title: "CF Moto",
    description: "super bike",
    price: "1500",
    image:
      "https://cdn.shopify.com/s/files/1/0509/8772/9074/products/IMG_9079_800x.png?v=1668676167",
  },
];

const trashArr = [];

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

trashBtn.addEventListener("click", function () {
  popup.style.display = "block";
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
    }
  });
});
// removeTrashBtn.addEventListener("click", function () {
//   const trashCards = document.querySelectorAll(".product-card");
//   trashCards.forEach(function (item) {
//     item.remove();
//   });
// });
btnbuy.addEventListener("click", function () {
  modalbuy.style.display = "block";
});

btnbuy.addEventListener('click', () => {
  form1.classList.add('text');
});

closemodalwind.addEventListener("click", function () {
  modalbuy.style.display = "none";
});









window.addEventListener("click", function (event) {
  if (event.target == modalbuy) {
      modalbuy.style.display = "none";
  }
});
