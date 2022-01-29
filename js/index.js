/********** THEME **********/

const btn = document.getElementById("theme");
const body = document.getElementsByTagName("body");
const card = document.getElementsByClassName("card");
const ppost = document.getElementsByClassName("post-personal");
const input = document.getElementsByClassName("input-1");

btn.addEventListener("click", () => {
  if (btn.value == "dark") {
    btn.value = "light";
    btn.innerHTML = `<i class="far fa-moon"></i>`;
    body[0].classList.remove("dark");
    body[0].classList.add("light");

    for (let element of card) {
      element.classList.remove("darkCard");
      element.classList.add("lightCard");
    }
    for (let element of ppost) {
      element.classList.remove("darkPost");
      element.classList.add("lightPost");
    }
    for (let element of input) {
      element.classList.remove("darkInput");
      element.classList.add("lightInput");
    }
    localStorage.setItem("theme", "light");
  } else {
    btn.value = "dark";
    btn.innerHTML = `<i class="far fa-sun"></i>`;
    body[0].classList.remove("light");
    body[0].classList.add("dark");

    for (let element of card) {
      element.classList.remove("lightCard");
      element.classList.add("darkCard");
    }
    for (let element of ppost) {
      element.classList.remove("lightPost");
      element.classList.add("darkPost");
    }
    for (let element of input) {
      element.classList.remove("lightInput");
      element.classList.add("darkInput");
    }
    localStorage.setItem("theme", "dark");
  }
});
if (localStorage.getItem("theme") === "dark") {
  btn.value = "dark";
  btn.innerHTML = `<i class="far fa-sun"></i>`;
  body[0].classList.remove("light");
  body[0].classList.add("dark");

  for (let element of card) {
    element.classList.remove("lightCard");
    element.classList.add("darkCard");
  }
  for (let element of ppost) {
    element.classList.remove("lightPost");
    element.classList.add("darkPost");
  }
  for (let element of input) {
    element.classList.remove("lightInput");
    element.classList.add("darkInput");
  }
} else {
  btn.value = "light";
  btn.innerHTML = `<i class="far fa-moon"></i>`;
  body[0].classList.remove("dark");
  body[0].classList.add("light");

  for (let element of input) {
    element.classList.remove("darkInput");
    element.classList.add("lightInput");
  }
  for (let element of card) {
    element.classList.remove("darkCard");
    element.classList.add("lightCard");
  }
  for (let element of ppost) {
    element.classList.remove("darkPost");
    element.classList.add("lightPost");
  }
}

/********** GET API **********/

const feed = document.getElementById("feed");
fetch("http://localhost:8000/news", { method: "get" })
  .then((res) => res.json())
  .then((data) => {
    data.map((element) => {
      const card = document.createElement("div");
      card.classList.add("card");
      if (localStorage.getItem("theme") === "dark")
        card.classList.add("darkCard");
      else card.classList.add("lightCard");
      const title = document.createElement("h3");
      title.innerHTML = element.title;
      title.classList.add("title");
      card.append(title);
      const date = document.createElement("p");
      date.innerHTML = element.date;
      date.classList.add("date");
      card.append(date);
      const content = document.createElement("p");
      content.innerHTML = element.content;
      content.classList.add("content");
      card.append(content);
      console.log(card);
      feed.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });
