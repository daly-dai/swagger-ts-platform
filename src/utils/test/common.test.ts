import { createArray, createCode, dispatchFileName } from '../common';

describe('createCode', () => {
  it('should generate a code with default number of 4', () => {
    const result = createCode();
    expect(result.length).toBe(4);

    const regResult = /^[A-Za-z0-9]+$/.test(result);

    expect(regResult).toBe(true);
  });

  it('should generate a code with specified number', () => {
    const number = 6;
    const result = createCode(number);
    expect(result.length).toBe(number);
    expect(/^[A-Za-z0-9]+$/.test(result)).toBe(true);
  });
});

describe('dispatchFileName', () => {
  it('should return empty string if name is empty', () => {
    const result = dispatchFileName('', 10);
    expect(result).toBe('');
  });

  it('should return modified file name with three dots and file extension', () => {
    const result = dispatchFileName('example.txt', 10);
    expect(result).toBe('example.txt');

    const result2 = dispatchFileName('example照片.txt', 10);
    expect(result2).toBe('example照片.txt');

    const result3 = dispatchFileName('example123照片.txt', 10);
    expect(result3).toBe('exa...3照片.txt');
  });

  it('should return original file name if it does not exceed the name limit', () => {
    const result = dispatchFileName('abcdefgh照片', 10);
    expect(result).toBe('abcdefgh照片');
  });
});

describe('createArray', () => {
  it('should return an array with length of 4 by default', () => {
    const result = createArray();
    expect(result).toEqual([0, 1, 2, 3]);
  });

  it('should return an array with length specified by num parameter', () => {
    const result = createArray(5);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('should return an empty array if num parameter is 0', () => {
    const result = createArray(0);
    expect(result).toEqual([]);
  });
});
