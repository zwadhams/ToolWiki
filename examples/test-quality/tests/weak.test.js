const { qualifiesForDiscount } = require('../src/discount');

test('values away from the threshold', () => {
  expect(qualifiesForDiscount(50)).toBe(false);
  expect(qualifiesForDiscount(150)).toBe(true);
});
