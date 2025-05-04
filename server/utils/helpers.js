export function convertEmailStringToArray(emailString) {
  if (!emailString || typeof emailString !== "string") {
    return []; // Return an empty array for null, undefined, or non-string input
  }
  // Split the string by comma and trim whitespace from each email
  const emailArray = emailString.split(",").map((email) => email.trim());
  return emailArray;
}
