import evalPostfix from './evals';
import { parseExpression } from './parser';
import * as syntax from './syntax';

export default {
  evalPostfix,
  parseExpression,
  ...syntax,
};
