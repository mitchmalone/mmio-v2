/**
 * Formats a given date string into a human-readable format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @return {string} The formatted date string in the format "Month Day, Year".
 * @example formatDate("2022-01-01 00:00:00") => Jan 1, 2022;
 */

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${String(day).padStart(2, "0")}, ${year}`;
}

export default formatDate;
