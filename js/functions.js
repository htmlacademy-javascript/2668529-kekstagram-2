// Задание 1
const checkStringLength = (string, maxLength) => (string.length <= maxLength);

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 10);

// Задание 2
const checkPalindrome = (string) => {
  const modifiedString = string.toLowerCase().replaceAll(' ', '');
  let reversedString = '';
  for (let i = modifiedString.length - 1; i >= 0; i--) {
    reversedString += modifiedString[i];
  }
  return modifiedString === reversedString;
};

checkPalindrome('дОВОд');
checkPalindrome('Кекс');

//Задание 3
const extractNumbers = (string) => {
  let result = '';
  string = string.toString();
  for (let i = 0; i < string.length; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }
  return result === '' ? NaN : Number(result);
};

extractNumbers('ECMAScript 2022');
extractNumbers('а я томат');
extractNumbers(2023);

//Задание 2 (модуль 5)
function isMeetingMatchesWorkingHours(startWorkTime, endWorkTime, startMeetingTime, meetingDuration) {
  function convertTimeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  const startWorkMinutes = convertTimeToMinutes(startWorkTime);
  const endWorkMinutes = convertTimeToMinutes(endWorkTime);
  const startMeetingMinutes = convertTimeToMinutes(startMeetingTime);
  const endMeetingMinutes = startMeetingMinutes + meetingDuration;

  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
}

isMeetingMatchesWorkingHours('08:00', '17:30', '14:00', 90); // true
isMeetingMatchesWorkingHours('8:00', '17:30', '08:00', 900); // false

