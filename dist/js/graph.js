"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.babelArrow = babelArrow;
exports.babelSet = babelSet;

function babelSet(num) {
  const set1 = new Set([1, 2, 3, 4, 5]);
  return set1.has(num);
}

function babelArrow(one) {
  const returnOne = one => one;

  return returnOne(one);
}