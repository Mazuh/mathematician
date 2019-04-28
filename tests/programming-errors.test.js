describe('evalPostfix', () => {
  it('may throw a programming errors', () => {
    jest.mock('../src/parser', () => ({
      parseExpression: () => [
        { type: require('../src/syntax').SYMBOL_TYPE.NUMBER, value: 2 },
        { type: require('../src/syntax').SYMBOL_TYPE.NUMBER, value: 2 },
        { type: Symbol('Fake symbol'), value: null },
      ],
    }));
    const evalPostfix = require('../src/evals').default;
    expect(() => evalPostfix()).toThrow('Bad programming: unexpected parsed symbol');
  });
});
