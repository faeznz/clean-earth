export function convertToInternationalFormat(phoneNumber) {
  // Check if phoneNumber is defined and not null
  if (!phoneNumber) {
    return ""; // or handle the case accordingly
  }

  // Remove unwanted characters (e.g., spaces, dashes)
  phoneNumber = phoneNumber.replace(/[\s\-]/g, "");

  // Check if phoneNumber starts with "0"
  if (phoneNumber.startsWith("0")) {
    // Remove the first "0" and add the country code
    phoneNumber =
      "+62 " +
      phoneNumber.slice(1, 5) +
      "-" +
      phoneNumber.slice(5, 9) +
      "-" +
      phoneNumber.slice(9);
  } else {
    // If it doesn't start with "0", assume it's already in international format
    phoneNumber = "+" + phoneNumber;
  }

  return phoneNumber;
}
