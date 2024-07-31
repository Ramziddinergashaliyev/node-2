const API_URL = "http://localhost:8000";
const wrapper = document.querySelector(".user__cards");

const form = document.querySelector(".form");
const url = document.querySelector(".url");
const firstname = document.querySelector(".firstname");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const age = document.querySelector(".age");

async function fetchData(api) {
  let results = await fetch(`${api}/users`);
  results
    .json()
    .then((res) => userData(res))
    .catch((err) => console.log(err));
}
fetchData(API_URL);

function userData(data) {
  while (wrapper.firstChild) {
    wrapper.firstChild.remove();
  }
  data?.payload.forEach((el) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = el.id;
    card.innerHTML = `
        <div class="user__card__img">
          <img src=${el?.url} alt="">
        </div>
        <div class="user__card__info">
          <h2>${el?.fname}</h2>
          <p>${el?.username}</p>
        </div>
        <div class="user__card__btns">
          <button class="user__delete-btn">Delete</button>
          <button>Edit</button>
        </div>
  `;
    wrapper.appendChild(card);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let users = {
    url: url.value,
    fname: firstname.value,
    username: username.value,
    password: password.value,
    age: age.value,
  };
  fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(users),
  })
    .then((res) => res.json())
    .then((res) => {
      fetchData(API_URL);
    });
});

wrapper.addEventListener("click", (e) => {
  if (e.target.className === "user__delete-btn") {
    let id = e.target.closest(".card").dataset.id;
    fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchData(API_URL);
      });
  }
});
