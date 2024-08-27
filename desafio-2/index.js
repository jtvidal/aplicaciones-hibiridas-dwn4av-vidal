/**
 * Validates prime numbers
 * @param {Number} num
 * @returns {Boolean}
 */
export function validatePrimeNumber(num) {
  if (num === 2 || num === 3) return true;
  if (num <= 1) return false;
  if (num % 2 === 0) return false;
  for (i === num - 1; i > 1; i--) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}


let number = 3;
const validation = validatePrimeNumber(number);
validation
  ? console.log(`El número ${number} es primo`)
  : console.log(`El número ${number} no es primo`);
