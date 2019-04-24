import evalRPN from '../src/evals';

describe('evalRPN', () => {
  it('evals sum of two natural numbers', () => {
    expect(evalRPN('3 0 +')).toBe(3);
    expect(evalRPN('0 3 +')).toBe(3);
    expect(evalRPN('3 5 +')).toBe(8);
    expect(evalRPN('5 3 +')).toBe(8);
    expect(evalRPN('1 1 +')).toBe(2);
    expect(evalRPN(' 1 2  + ')).toBe(3);
  });

  it('evals subtraction of two natural numbers', () => {
    expect(evalRPN('3 0 -')).toBe(3);
    expect(evalRPN('0 3 -')).toBe(-3);
    expect(evalRPN('3 5 -')).toBe(-2);
    expect(evalRPN('5 3 -')).toBe(2);
    expect(evalRPN('1 1 -')).toBe(0);
    expect(evalRPN(' 44 2  - ')).toBe(42);
  });

  it('evals multiplication of two natural numbers', () => {
    expect(evalRPN('3 0 *')).toBe(0);
    expect(evalRPN('0 3 *')).toBe(0);
    expect(evalRPN('3 5 *')).toBe(15);
    expect(evalRPN('5 3 *')).toBe(15);
    expect(evalRPN('1 1 *')).toBe(1);
    expect(evalRPN('112214 1 *')).toBe(112214);
    expect(evalRPN(' 21 2  * ')).toBe(42);
  });

  it('evals division of two natural numbers', () => {
    expect(() => evalRPN('3 0 /')).toThrow('Division by zero');
    expect(() => evalRPN('0 0 /')).toThrow('Division by zero');
    expect(evalRPN('0 3 /')).toBe(0);
    expect(evalRPN('30 3 /')).toBe(10);
    expect(evalRPN('1 1 /')).toBe(1);
    expect(evalRPN('112214 1 /')).toBe(112214);
    expect(evalRPN(' 84 2  / ')).toBe(42);
  });

  it('evals mixed operations between several natural numbers', () => {
    expect(evalRPN('1 1 +')).toBe(2);
    expect(evalRPN('1 1 + 2 +')).toBe(4);
    expect(evalRPN('1 1 + 2 + 3 +')).toBe(7);
    expect(evalRPN('1 1 + 2 + 3 + 5 +')).toBe(12);
  });

  it('doesnt care if operators are at the end of the string', () => {
    expect(evalRPN('1 1 2 + +')).toBe(4);
    expect(evalRPN('1 1 2 + + 4 *')).toBe(16);
    expect(evalRPN('1 1 2 + 4 + *')).toBe(7);
  });

  it('evals if there arent blank spaces between numbers and operators', () => {
    expect(evalRPN('1 1+')).toBe(2);
    expect(evalRPN('1 1+1+')).toBe(3);
  });
});
