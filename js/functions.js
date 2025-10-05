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

