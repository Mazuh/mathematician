import last from 'lodash.last';
import takeRight from 'lodash.takeright';
import dropRight from 'lodash.dropright';
import reduce from 'lodash.reduce';
import { parseExpression } from './parser';
import { SYMBOL_TYPE } from './grammar';

/**
 * Parse a meaningful symbol (may be an operator or a number).
 * @param {String} expression arithmetical expression using reverse polish notation
 * @returns {Number} resulting of the evaluated expression
 * @throws {Error} messaging the index of where an invalid token was found
 */
export default expression => last(reduce(parseExpression(expression), (numbers, symbol) => {
  if (symbol.type === SYMBOL_TYPE.NUMBER) {
    return [...numbers, symbol.value];
  }

  const remainings = dropRight(numbers, 2);
  const lastings = takeRight(numbers, 2);
  if (lastings.length !== 2) {
    throw new Error('Expected more numbers for binary operator');
  }

  const [a, b] = lastings;
  switch (symbol.type) {
    case SYMBOL_TYPE.SUM:
      return [...remainings, a + b];
    case SYMBOL_TYPE.SUBTRACTION:
      return [...remainings, a - b];
    case SYMBOL_TYPE.MULTIPLICATION:
      return [...remainings, a * b];
    case SYMBOL_TYPE.DIVISION:
      if (b === 0) {
        throw new Error('Division by zero');
      } else {
        return [...remainings, a / b];
      }
    default:
      throw new Error('Bad programming: unexpected parsed operator');
  }
}, [])) || 0;
