/**
 * Validates prime numbers
 * @param {Number} num
 * @returns {Boolean}
 */
function validatePrimeNumber(num) {
  try {
    if (typeof num !== "number") {
      throw new Error("A number is required");
    } else {
      if (num === 2 || num === 3) return true;
      if (num <= 1) return false;
      if (num % 2 === 0) return false;
      for (let i = num - 1; i > 1; i--) {
        if (num % i === 0) {
          divisor = i;
          return false;
        }
      }
      return true;
    }
  } catch (error) {
    console.log("Error in validatePrimeNumber: ",error.message);
  }
}

module.exports = { validatePrimeNumber };
