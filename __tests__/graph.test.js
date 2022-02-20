const { babelSet, babelArrow } = require('../lib/graph');

test('babel Set', () => {
  expect(babelSet(5)).toBe(true);
});
test('babel arrow', () => {
  expect(babelArrow(1)).toBe(1);
});