export function getDateParams(date = new Date()) {
  return {
    month: String(date.getMonth() + 1).padStart(2, "0"),
    year: String(date.getFullYear()),
    day: String(date.getDate()).padStart(2, "0"),
  };
}
