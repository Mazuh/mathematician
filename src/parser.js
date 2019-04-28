import reduce from 'lodash.reduce';
import {
  SYMBOL_TYPE,
  OPERATIONS_CHARSET,
  NUMERIC_CHARSET,
  BLANK_CHARSET,
  DECIMAL_SEPARATOR_CHARSET,
  DECIMAL_SEPARATOR_REGEX,
} from './syntax';

/**
 * Parse a meaningful symbol (may be an operator or a number).
 * @param {String} substring trimmed part of an expression
 * @returns {Object} symbol entity with type and value or null in case of failure
 */
export const parseSymbol = (substring) => {
  if (!substring) {
    return null;
  }

  const numeric = Number(substring.replace(DECIMAL_SEPARATOR_REGEX, '.'));
  switch (substring) {
    case '+':
      return { type: SYMBOL_TYPE.SUM, value: null };
    case '-':
      return { type: SYMBOL_TYPE.SUBTRACTION, value: null };
    case '*':
      return { type: SYMBOL_TYPE.MULTIPLICATION, value: null };
    case '/':
      return { type: SYMBOL_TYPE.DIVISION, value: null };
    default:
      return Number.isNaN(numeric) ? null : { type: SYMBOL_TYPE.NUMBER, value: numeric };
  }
};

/**
 * Parse all symbols of an arithmetical expression.
 * @param {String} expression text containing possible symbols
 * @returns {Array} of parsed symbols
 * @throws {Error} messaging the index of where an invalid token was found
 */
export const parseExpression = expression => reduce(expression, (accumulator, char, index) => {
  const { buffer, parseds } = accumulator;
  const isOperation = OPERATIONS_CHARSET.has(char);
  const isNumeric = NUMERIC_CHARSET.has(char);
  const isDecimalSeparator = DECIMAL_SEPARATOR_CHARSET.has(char);
  const isBlank = BLANK_CHARSET.has(char);

  if (isOperation) {
    const next = expression[index + 1];
    if (!buffer && next && NUMERIC_CHARSET.has(next)) {
      return { buffer: buffer + char, parseds };
    }

    const symbol = parseSymbol(char);
    const buffered = parseSymbol(buffer);
    return buffered
      ? { buffer: '', parseds: [...parseds, buffered, symbol] }
      : { buffer: '', parseds: [...parseds, symbol] };
  }

  if (isNumeric || isDecimalSeparator) {
    const currentBuffer = buffer + char;
    if (isDecimalSeparator && DECIMAL_SEPARATOR_REGEX.test(buffer)) {
      throw new Error(index);
    }

    return index === (expression.length - 1)
      ? { buffer: '', parseds: [...parseds, parseSymbol(currentBuffer)] }
      : { buffer: currentBuffer, parseds };
  }

  if (isBlank) {
    const symbol = parseSymbol(buffer);
    if (symbol) {
      return { buffer: '', parseds: [...parseds, symbol] };
    }

    return { buffer: '', parseds };
  }

  throw new Error(index);
}, { buffer: '', parseds: [] }).parseds;
