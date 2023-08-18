const navbar = document.querySelector(".navigation-container");
const navDropDownButton = document.querySelector("#dropdown-navigation-button");
const navbarLinks = document.querySelector("#navbar-links");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 10) {
    navbar.classList.add("scrolled");
    // if (navbarLinks.classList.contains("expanded")) {
    // }
    navbarLinks.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
    navbarLinks.classList.remove("scrolled");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 530) {
    navbar.classList.remove("expanded");
    navbarLinks.classList.remove("expanded");
  }
});

navDropDownButton.addEventListener("click", (e) => {
  navbar.classList.toggle("expanded");
  navbarLinks.classList.toggle("expanded");
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (e.target.closest("#navbar")) return;
  navbar.classList.remove("expanded");
  navbarLinks.classList.remove("expanded");
});

// document.addEventListener("touchmove", (e) => {
//   if (e.target.closest("#navbar")) return;
//   navbar.classList.remove("expanded");
//   navbarLinks.classList.remove("expanded");
// });
