const navbar = document.querySelector(".navigation-container");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
