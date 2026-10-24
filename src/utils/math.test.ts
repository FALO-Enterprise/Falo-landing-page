import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMarqueeOffset,
  calculateCardScale,
  calculateCardTop,
  calculateMagnetOffset,
  calculateCharOpacity,
} from './math';

test('calculateMarqueeOffset computes correctly based on scroll and section offset', () => {
  const offset = calculateMarqueeOffset(1000, 500, 800, 0.3);
  // (1000 - 500 + 800) * 0.3 = 1300 * 0.3 = 390
  assert.equal(offset, 390);
});

test('calculateCardScale calculates target scale for stacking correctly', () => {
  // 3 total cards:
  // index 0: 1 - (3 - 1 - 0) * 0.03 = 1 - 0.06 = 0.94
  // index 1: 1 - (3 - 1 - 1) * 0.03 = 1 - 0.03 = 0.97
  // index 2: 1 - (3 - 1 - 2) * 0.03 = 1 - 0 = 1.00
  assert.equal(calculateCardScale(0, 3), 0.94);
  assert.equal(calculateCardScale(1, 3), 0.97);
  assert.equal(calculateCardScale(2, 3), 1.0);
});

test('calculateCardTop offsets cards by index step', () => {
  assert.equal(calculateCardTop(0, 28), 0);
  assert.equal(calculateCardTop(1, 28), 28);
  assert.equal(calculateCardTop(2, 28), 56);
});

test('calculateMagnetOffset calculates delta inside bounds and zeroes outside', () => {
  const elem = { left: 100, top: 100, width: 200, height: 200 };
  // Center is (200, 200). Cursor at (260, 230) -> deltaX = (260 - 200) / 3 = 20, deltaY = 30 / 3 = 10
  const inside = calculateMagnetOffset(260, 230, elem, 150, 3);
  assert.equal(inside.active, true);
  assert.equal(inside.x, 20);
  assert.equal(inside.y, 10);

  // Far away cursor
  const outside = calculateMagnetOffset(1000, 1000, elem, 150, 3);
  assert.equal(outside.active, false);
  assert.equal(outside.x, 0);
  assert.equal(outside.y, 0);
});

test('calculateCharOpacity transitions from 0.2 to 1 based on relative scroll', () => {
  const total = 10;
  // char index 5: threshold = 0.5 to 0.6
  assert.equal(calculateCharOpacity(5, total, 0.4), 0.2);
  assert.equal(calculateCharOpacity(5, total, 0.7), 1);
  const mid = calculateCharOpacity(5, total, 0.55);
  assert.ok(mid > 0.2 && mid < 1.0);
});
