import { parseSymbol } from '../src/parser';
import { SYMBOL_KIND } from '../src/constants';

describe('parseSymbol', () => {
  it('not parse invalid symbols, returning null instead', () => {
    expect(parseSymbol('garbage')).toBe(null);
    expect(parseSymbol('?')).toBe(null);
    expect(parseSymbol('x')).toBe(null);
    expect(parseSymbol('a')).toBe(null);
    expect(parseSymbol('')).toBe(null);
  });

  it('parses number', () => {
    expect(parseSymbol('-69')).toEqual({ type: SYMBOL_KIND.NUMBER, value: -69 });
    expect(parseSymbol('-1')).toEqual({ type: SYMBOL_KIND.NUMBER, value: -1 });
    expect(parseSymbol('0')).toEqual({ type: SYMBOL_KIND.NUMBER, value: 0 });
    expect(parseSymbol('1')).toEqual({ type: SYMBOL_KIND.NUMBER, value: 1 });
    expect(parseSymbol('69')).toEqual({ type: SYMBOL_KIND.NUMBER, value: 69 });
  });

  it('parses operator', () => {
    expect(parseSymbol('+')).toEqual({ type: SYMBOL_KIND.SUM, value: null });
    expect(parseSymbol('-')).toEqual({ type: SYMBOL_KIND.SUBSTRACTION, value: null });
    expect(parseSymbol('*')).toEqual({ type: SYMBOL_KIND.MULTIPLICATION, value: null });
    expect(parseSymbol('/')).toEqual({ type: SYMBOL_KIND.DIVISION, value: null });
  });
});
