export const phoneMissingErrors = (phoneNumber) => {
  const phoneNumberRegex = /^\d{10}$/; // regular expression to match a 10-digit phone number

  if (!phoneNumber) {
    return 'Phone number is required';
  }

  if (!phoneNumberRegex.test(phoneNumber)) {
    return 'Phone number must be 10 digits';
  }

  return '';
};

export function formatDate(dateString) {
  const date = new Date(dateString);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = days[date.getUTCDay()];
  const dateNum = date.getUTCDate();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${day} ${month} ${dateNum}, ${year} ${hours}:${minutes}:${seconds}`;
}
