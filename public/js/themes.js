let theme = localStorage.getItem("theme");
let themes = document.getElementsByName("themes");

if (theme === "light") {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
} else {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
}

themes.forEach((el) => {
  el.addEventListener("click", (e) => {
    let theme = e.target.attributes["data-theme"].value;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });
});

let color = localStorage.getItem("color");
let colors = document.getElementsByName("colors");

if (!color) {
  localStorage.setItem("color", "green");
  document.querySelector("#green").checked = true;
}

switch (color) {
  case "green":
    document.documentElement.setAttribute("data-color", "green");
    break;
  case "blue":
    document.documentElement.setAttribute("data-color", "blue");
    break;
  case "red":
    document.documentElement.setAttribute("data-color", "red");
    break;
  case "orange":
    document.documentElement.setAttribute("data-color", "orange");
    break;
  default:
    document.documentElement.setAttribute("data-color", "green");
}

colors.forEach((el) => {
  el.addEventListener("click", (e) => {
    let color = e.target.attributes["data-color"].value;

    document.documentElement.setAttribute("data-color", color);
    localStorage.setItem("color", color);
  });
});

let dropdownButton = document.querySelector("#themer-dropdown-button");
let dropdownContent = document.querySelector("#themer-dropdown-content");

dropdownButton.addEventListener("click", (e) => {
  dropdownContent.classList.toggle("show");
  dropdownButton.classList.toggle("spun");
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (e.target.closest("#themer-dropdown-content")) return;

  dropdownContent.classList.remove("show");
  dropdownButton.classList.remove("spun");
});
