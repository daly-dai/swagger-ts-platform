import { formatPrice } from '../number';

describe('formatPrice', () => {
  it('should format the price correctly', () => {
    // Test case 1: Test with a positive number
    expect(formatPrice(9.99)).toEqual('9.99');

    // Test case 2: Test with a negative number
    expect(formatPrice(-100.5)).toEqual('-100.5');

    // Test case 3: Test with a decimal number
    expect(formatPrice(456.78)).toEqual('456.78');

    // Test case 4: Test with a large number
    expect(formatPrice(1000000)).toEqual('1,000,000');

    // Test case 5: Test with a small number
    expect(formatPrice(0.000001)).toEqual('0');
  });
});
