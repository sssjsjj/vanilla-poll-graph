const graph = require('../lib/graph');

test('set has 5', () => {
  expect(graph(5)).toBe(true);
});