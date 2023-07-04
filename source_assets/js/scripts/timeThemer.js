const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

const currentTime = parseInt(
  new Date().toLocaleString("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: tz,
  })
);

// document.documentElement.setAttribute("data-sky", currentTime);

if (currentTime <= 7 || currentTime >= 19) {
  document.documentElement.setAttribute("data-time", "night");
} else {
  document.documentElement.setAttribute("data-time", "day");
}
