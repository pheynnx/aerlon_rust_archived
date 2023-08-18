export function timeFormatYYYYMMDD(inputDate: string): string {
  const date = new Date(inputDate);

  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return year + "-" + month + "-" + day;
}

export function timeFormatISO(inputDate: string): string {
  let trim = inputDate.split("T");
  const date = new Date(`${trim[0]}T00:00:00.00`);

  return date.toISOString();
}
