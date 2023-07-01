const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

const currentTime = parseInt(
  new Date().toLocaleString("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: tz,
  })
);

document.documentElement.setAttribute("data-sky", currentTime);

if (currentTime <= 6 || currentTime >= 8) {
  document.documentElement.setAttribute("data-time", "night");
} else {
  document.documentElement.setAttribute("data-time", "day");
}
