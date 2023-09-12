// const chai = require('chai');
const expect = chai.expect;
const { add } = require('./math'); // Import the function to be tested

describe('Math Utility - add', () => {
  it('should return the sum of two positive numbers', () => {
    const result = add(2, 3);
    expect(result).to.equal(5); // Assert that the result is equal to 5
  });

  it('should return the sum of a positive and a negative number', () => {
    const result = add(5, -2);
    expect(result).to.equal(3); // Assert that the result is equal to 3
  });

  it('should return zero when adding zero to any number', () => {
    const result = add(0, 10);
    expect(result).to.equal(0); // Assert that the result is equal to 0
  });

  it('should return NaN for non-numeric input', () => {
    const result = add('abc', 5);
    expect(result).to.be.NaN; // Assert that the result is NaN
  });
});
