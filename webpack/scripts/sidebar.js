// let theme = localStorage.getItem("theme");
// let themeSwitcherInput = document.querySelector("#themeSwitch");

// if (theme === "light") {
//   document.documentElement.setAttribute("data-theme", "light");
//   themeSwitcherInput.checked = false;
// } else {
//   document.documentElement.setAttribute("data-theme", "dark");
//   themeSwitcherInput.checked = true;
// }

// themeSwitcherInput.addEventListener("change", (e) => {
//   if (e.target.checked) {
//     localStorage.setItem("theme", "dark");
//     document.documentElement.setAttribute("data-theme", "dark");
//   } else {
//     localStorage.setItem("theme", "light");
//     document.documentElement.setAttribute("data-theme", "light");
//   }
// });

let dropdownButton = document.querySelector("#themer-dropdown-button");
let dropdownContent = document.querySelector("#themer-dropdown-content");

dropdownButton.addEventListener("click", (e) => {
  dropdownContent.classList.toggle("show");
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (e.target.closest("#themer-dropdown-content")) return;
  dropdownContent.classList.remove("show");
});

document.addEventListener("touchmove", (e) => {
  if (e.target.closest("#themer-dropdown-content")) return;
  dropdownContent.classList.remove("show");
});
