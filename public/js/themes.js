let theme = localStorage.getItem("theme");
let themeSwitcherInput = document.querySelector("#themeSwitch");

if (theme === "light") {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
  themeSwitcherInput.checked = false;
} else {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
  themeSwitcherInput.checked = true;
}

themeSwitcherInput.addEventListener("change", (event) => {
  if (event.target.checked) {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  }
});

let color = localStorage.getItem("color");
// let form = document.querySelector("#themeColor");
let radios = document.getElementsByName("colorRadio");

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

radios.forEach((el) => {
  el.addEventListener("click", (e) => {
    let color = e.target.attributes["data-color"].value;

    document.documentElement.setAttribute("data-color", color);
    localStorage.setItem("color", color);
  });
});

let dropdownButton = document.querySelector("#themer-dropdown-button");
let dropdownContent = document.getElementById("themer-dropdown-content");

dropdownButton.addEventListener("click", () => {
  dropdownContent.classList.toggle("show");
  dropdownButton.classList.toggle("spun");
  dropdownContent.focus();
});

dropdownContent.addEventListener("focusout", (e) => {
  if (!e.currentTarget.contains(e.relatedTarget)) {
    dropdownContent.classList.remove("show");
    dropdownButton.classList.remove("spun");
  }
});
