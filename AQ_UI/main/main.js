const searchButton = document.querySelector(".header__button-search");
const searchInput = document.querySelector(".search-bar__input");
const searchIcon = document.querySelector(".search-icon");
const signUpButton = document.querySelector(".overlay__button-sign-up");
const signInButton = document.querySelector(".overlay__button-sign-in");
const container = document.querySelector(".container");

searchButton.addEventListener("click", () => {
  if (!searchInput.classList.contains("animate-input")) {
    searchInput.classList.add("animate-input");
    searchInput.classList.remove("animate-input-reverse");
    searchIcon.classList.add("fa-times");
    searchButton.classList.add("animate-button");
    searchButton.classList.remove("animate-button-reverse");
  } else {
    searchInput.classList.remove("animate-input");
    searchInput.classList.add("animate-input-reverse");
    searchIcon.classList.remove("fa-times");
    searchButton.classList.remove("animate-button");
    searchButton.classList.add("animate-button-reverse");
  }
});

signUpButton.addEventListener("click", () => {
  container.classList.add("sign-out-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("sign-out-panel-active");
});
