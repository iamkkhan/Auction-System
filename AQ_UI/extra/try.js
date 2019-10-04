const searchButton = document.querySelector(".header__button-search");
const searchInput = document.querySelector(".search-bar__input");
const searchIcon = document.querySelector(".search-icon");

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
searchButton.addEventListener("click", () => {
  if (!searchButton.classList.contains("animate-button")) {
  } else {
  }
});
