import evalPostfix from '../src/evals';

describe('evalPostfix', () => {
  it('evals sum of two natural numbers', () => {
    expect(evalPostfix('3 0 +')).toBe(3);
    expect(evalPostfix('0 3 +')).toBe(3);
    expect(evalPostfix('3 5 +')).toBe(8);
    expect(evalPostfix('5 3 +')).toBe(8);
    expect(evalPostfix('1 1 +')).toBe(2);
    expect(evalPostfix(' 1 2  + ')).toBe(3);
  });

  it('evals subtraction of two natural numbers', () => {
    expect(evalPostfix('3 0 -')).toBe(3);
    expect(evalPostfix('0 3 -')).toBe(-3);
    expect(evalPostfix('3 5 -')).toBe(-2);
    expect(evalPostfix('5 3 -')).toBe(2);
    expect(evalPostfix('1 1 -')).toBe(0);
    expect(evalPostfix(' 44 2  - ')).toBe(42);
  });

  it('evals multiplication of two natural numbers', () => {
    expect(evalPostfix('3 0 *')).toBe(0);
    expect(evalPostfix('0 3 *')).toBe(0);
    expect(evalPostfix('3 5 *')).toBe(15);
    expect(evalPostfix('5 3 *')).toBe(15);
    expect(evalPostfix('1 1 *')).toBe(1);
    expect(evalPostfix('112214 1 *')).toBe(112214);
    expect(evalPostfix(' 21 2  * ')).toBe(42);
  });

  it('evals division of two natural numbers', () => {
    expect(() => evalPostfix('3 0 /')).toThrow('Division by zero');
    expect(() => evalPostfix('0 0 /')).toThrow('Division by zero');
    expect(evalPostfix('0 3 /')).toBe(0);
    expect(evalPostfix('30 3 /')).toBe(10);
    expect(evalPostfix('1 1 /')).toBe(1);
    expect(evalPostfix('112214 1 /')).toBe(112214);
    expect(evalPostfix(' 84 2  / ')).toBe(42);
  });

  it('evals mixed operations between several natural numbers', () => {
    expect(evalPostfix('1 1 +')).toBe(2);
    expect(evalPostfix('1 1 + 2 +')).toBe(4);
    expect(evalPostfix('1 1 + 2 + 3 +')).toBe(7);
    expect(evalPostfix('1 1 + 2 + 3 + 5 +')).toBe(12);
  });

  it('doesnt care if operators are at the end of the string', () => {
    expect(evalPostfix('1 1 2 + +')).toBe(4);
    expect(evalPostfix('1 1 2 + + 4 *')).toBe(16);
    expect(evalPostfix('1 1 2 + 4 + *')).toBe(7);
  });

  it('evals if there arent blank spaces between numbers and operators', () => {
    expect(evalPostfix('1 1+')).toBe(2);
    expect(evalPostfix('1 1+1+')).toBe(3);
  });

  it('throws error in case of an operator finding insufficient numbers in queue', () => {
    expect(() => evalPostfix('11+')).toThrow('Expected more numbers for binary operator');
    expect(() => evalPostfix('+')).toThrow('Expected more numbers for binary operator');
  });

  it('doesnt get confused with directional tokens similars to operator', () => {
    expect(evalPostfix('-2 2 +')).toBe(0);
    expect(evalPostfix('-2 +2 +')).toBe(0);
  });

  it('behaves as an identity function if a single number is given', () => {
    expect(evalPostfix('1')).toBe(1);
    expect(evalPostfix('  42  ')).toBe(42);
  });
});
