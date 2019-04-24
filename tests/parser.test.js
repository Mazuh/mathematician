import { parseSymbol, parseExpression } from '../src/parser';
import { SYMBOL_TYPE } from '../src/grammar';

describe('parseSymbol', () => {
  it('not parse invalid symbol, returning null instead', () => {
    expect(parseSymbol('garbage')).toBe(null);
    expect(parseSymbol('?')).toBe(null);
    expect(parseSymbol('x')).toBe(null);
    expect(parseSymbol('a')).toBe(null);
    expect(parseSymbol('')).toBe(null);
  });

  it('parses number', () => {
    expect(parseSymbol('-3.14')).toEqual({ type: SYMBOL_TYPE.NUMBER, value: -3.14 });
    expect(parseSymbol('-69')).toEqual({ type: SYMBOL_TYPE.NUMBER, value: -69 });
    expect(parseSymbol('-1')).toEqual({ type: SYMBOL_TYPE.NUMBER, value: -1 });
    expect(parseSymbol('0')).toEqual({ type: SYMBOL_TYPE.NUMBER, value: 0 });
    expect(parseSymbol('1')).toEqual({ type: SYMBOL_TYPE.NUMBER, value: 1 });
    expect(parseSymbol('69')).toEqual({ type: SYMBOL_TYPE.NUMBER, value: 69 });
    expect(parseSymbol('1.1')).toEqual({ type: SYMBOL_TYPE.NUMBER, value: 1.1 });
  });

  it('parses operator', () => {
    expect(parseSymbol('+')).toEqual({ type: SYMBOL_TYPE.SUM, value: null });
    expect(parseSymbol('-')).toEqual({ type: SYMBOL_TYPE.SUBSTRACTION, value: null });
    expect(parseSymbol('*')).toEqual({ type: SYMBOL_TYPE.MULTIPLICATION, value: null });
    expect(parseSymbol('/')).toEqual({ type: SYMBOL_TYPE.DIVISION, value: null });
  });

  it('also considers comma as a decimal separator', () => {
    expect(parseSymbol('3,14')).toEqual({ type: SYMBOL_TYPE.NUMBER, value: 3.14 });
    expect(parseSymbol('-3,14')).toEqual({ type: SYMBOL_TYPE.NUMBER, value: -3.14 });
    expect(parseSymbol('3,1,4')).toEqual(null);
  });
});

describe('parseExpression', () => {
  it('returns an empty list if no symbol was interpreted', () => {
    expect(parseExpression('')).toEqual([]);
    expect(parseExpression('  ')).toEqual([]);
  });

  it('throws an error indicating where an invalid token was found', () => {
    expect(() => parseExpression('?')).toThrow('0');
    expect(() => parseExpression('42 69 ; 21')).toThrow('6');
    expect(() => parseExpression(' ;42')).toThrow('1');
    expect(() => parseExpression('4;2 ')).toThrow('1');
    expect(() => parseExpression('42;')).toThrow('2');
  });

  it('returns list of interpreted operators', () => {
    expect(parseExpression('+ - * /')).toEqual([
      { type: SYMBOL_TYPE.SUM, value: null },
      { type: SYMBOL_TYPE.SUBSTRACTION, value: null },
      { type: SYMBOL_TYPE.MULTIPLICATION, value: null },
      { type: SYMBOL_TYPE.DIVISION, value: null },
    ]);
  });

  it('returns list of interpreted numbers', () => {
    expect(parseExpression(' 1 ')).toEqual([
      { type: SYMBOL_TYPE.NUMBER, value: 1 },
    ]);
    expect(parseExpression('1')).toEqual([
      { type: SYMBOL_TYPE.NUMBER, value: 1 },
    ]);
    expect(parseExpression('1 1 2 3 5 8')).toEqual([
      { type: SYMBOL_TYPE.NUMBER, value: 1 },
      { type: SYMBOL_TYPE.NUMBER, value: 1 },
      { type: SYMBOL_TYPE.NUMBER, value: 2 },
      { type: SYMBOL_TYPE.NUMBER, value: 3 },
      { type: SYMBOL_TYPE.NUMBER, value: 5 },
      { type: SYMBOL_TYPE.NUMBER, value: 8 },
    ]);
  });

  it('returns list of interpreted mixed symbols and numbers', () => {
    expect(parseExpression('1 1 + 2 + 3 / 5 * 8 -')).toEqual([
      { type: SYMBOL_TYPE.NUMBER, value: 1 },
      { type: SYMBOL_TYPE.NUMBER, value: 1 },
      { type: SYMBOL_TYPE.SUM, value: null },
      { type: SYMBOL_TYPE.NUMBER, value: 2 },
      { type: SYMBOL_TYPE.SUM, value: null },
      { type: SYMBOL_TYPE.NUMBER, value: 3 },
      { type: SYMBOL_TYPE.DIVISION, value: null },
      { type: SYMBOL_TYPE.NUMBER, value: 5 },
      { type: SYMBOL_TYPE.MULTIPLICATION, value: null },
      { type: SYMBOL_TYPE.NUMBER, value: 8 },
      { type: SYMBOL_TYPE.SUBSTRACTION, value: null },
    ]);
  });
});
