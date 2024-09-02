import 'dotenv/config'
import { validatePrimeNumber } from "./exports.cjs";

let number = 2;

const validation = validatePrimeNumber(number);

validation
  ? console.log(`El número ${number} es primo`)
  : console.log(`El número ${number} no es primo`);
