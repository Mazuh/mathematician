import flow from 'lodash.flow';
import last from 'lodash.last';
import takeRight from 'lodash.takeright';
import dropRight from 'lodash.dropright';
import reduce from 'lodash.reduce';
import { parseExpression } from './parser';
import { SYMBOL_TYPE } from './syntax';

/**
 * Evaluates an arithmetical expression that follows postfix (reverse polish) notation.
 * @param {String} expression arithmetical expression using postfix notation
 * @returns {Number} resulting of the evaluated expression
 * @throws {Error} messaging the index of where an invalid token was found
 * or messaging some inconsistente usage of arithmetics.
 */
export default expression => flow(
  parseExpression,
  symbols => (symbols.length ? symbols : [{ type: SYMBOL_TYPE.NUMBER, value: 0 }]),
  symbols => reduce(symbols, (numbers, symbol, index) => {
    if (symbol.type === SYMBOL_TYPE.NUMBER) {
      const isLast = index === (symbols.length - 1);
      if (isLast && numbers.length) {
        throw new Error('Unexpected end of expression');
      }

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
        throw new Error('Bad programming: unexpected parsed symbol');
    }
  }, []),
  last,
)(expression);
