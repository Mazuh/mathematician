import { SYMBOL_KIND } from './constants';

/**
 * Parse a meaningful symbol (may be an operator or a number).
 * @param {string} substring trimmed part of an expression
 */
export const parseSymbol = (substring) => {
  if (!substring) {
    return null;
  }

  const numeric = Number(substring);
  switch (substring) {
    case '+':
      return { type: SYMBOL_KIND.SUM, value: null };
    case '-':
      return { type: SYMBOL_KIND.SUBSTRACTION, value: null };
    case '*':
      return { type: SYMBOL_KIND.MULTIPLICATION, value: null };
    case '/':
      return { type: SYMBOL_KIND.DIVISION, value: null };
    default:
      return Number.isNaN(numeric) ? null : { type: SYMBOL_KIND.NUMBER, value: numeric };
  }
};

export const parseExpression = (expression) => {
  // todo
  return expression;
};
