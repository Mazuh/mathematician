# mathematician
Arithmetical expressions parser for JavaScript. 数学者！

> Available on NPM: https://www.npmjs.com/package/mathematician

## Examples

It splits expressions into atomic symbols for easy programming handling.

```js
parseExpression('-3,14 0.57 +');
// returns them:
[
  { type: SYMBOL_TYPE.NUMBER, value: -3.14 },
  { type: SYMBOL_TYPE.NUMBER, value: 0.57 },
  { type: SYMBOL_TYPE.SUM, value: null },
]

parseExpression('42c');
// throws error indexing failing token:
Error('2')
```

And may also safely evaluate whole expressions following
[postfix notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation):

```js
evalPostfix('1 1 + 2 + 3 +');
// returns the result:
7

evalPostfix('42 0 /');
// throws error messaging arithmetical inconsistency:
Error('Division by zero')
```
