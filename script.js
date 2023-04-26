const popup = document.querySelector(".popup");
const trashBtn = document.querySelector(".trash");
const closePopupBtn = document.querySelector(".close-popup");
const cards = document.querySelectorAll(".cards");
const trashOut = document.querySelector(".trash-out");

trashBtn.addEventListener("click", function () {
  popup.style.display = "block";
});

closePopupBtn.addEventListener("click", function () {
  popup.style.display = "none";
});

cards.forEach((card) => {
  card.addEventListener("click", function (event) {
    if (event.target.classList.contains("goTrash")) {
      let newCard = card.cloneNode(true);
      trashOut.append(newCard);
    }
  });
});
