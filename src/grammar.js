export const SYMBOL_TYPE = {
  NUMBER: Symbol('Identifies a numeric kind of data'),
  SUM: Symbol('Identifies a sum operator type'),
  SUBSTRACTION: Symbol('Identifies a substraction operator type'),
  MULTIPLICATION: Symbol('Identifies a multiplication operator type'),
  DIVISION: Symbol('Identifies a division operator type'),
};

export const BLANK_CHARSET = new Set([
  ' ',
]);

export const DECIMAL_SEPARATOR_CHARSET = new Set([
  ',',
  '.',
]);

export const NUMERIC_CHARSET = new Set([
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
]);

export const OPERATIONS_CHARSET = new Set([
  '+',
  '-',
  '*',
  '/',
]);
