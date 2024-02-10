import { format, parseISO } from "date-fns";

export const formatDate = (date, formatType) => {
  // Check if the date is a string format
  if (typeof date === "string") {
    // Parse the string to a Date object
    const parsedDate = parseISO(date);
    // Format the Date object as based on format passed by user ex.'yyyy-MM-dd'
    return format(parsedDate, formatType);
  } else {
    return format(date, formatType);
  }
};
