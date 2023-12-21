import { isDeepEqualReact } from '../object';

describe('isDeepEqualReact', () => {
  it('should return true if the values are equal', () => {
    const a = 1;
    const b = 1;
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(true);
  });

  it('should return false if the values are not objects', () => {
    const a = 1;
    const b = '1';
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return false if the values are not of the same constructor', () => {
    const a = { a: 1 };
    const b = { a: 1 };
    const result = isDeepEqualReact(a, b, [], true);
    expect(result).toBe(true);
  });

  it('should return false if the values are arrays with different lengths', () => {
    const a = [1, 2];
    const b = [1];
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return true if the values are arrays with same elements', () => {
    const a = [1, 2];
    const b = [1, 2];
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(true);
  });

  it('should return false if the values are arrays with different elements', () => {
    const a = [1, 2];
    const b = [2, 1];
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return true if the values are Maps with same size and elements', () => {
    const a = new Map([[1, 2]]);
    const b = new Map([[1, 2]]);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(true);
  });

  it('should return false if the values are Maps with different size', () => {
    const a = new Map([[1, 2]]);
    const b = new Map([
      [1, 2],
      [3, 4],
    ]);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return false if the values are Maps with different elements', () => {
    const a = new Map([[1, 2]]);
    const b = new Map([[1, 3]]);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return true if the values are Sets with same size and elements', () => {
    const a = new Set([1]);
    const b = new Set([1]);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(true);
  });

  it('should return false if the values are Sets with different size', () => {
    const a = new Set([1]);
    const b = new Set([1, 2]);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return false if the values are Sets with different elements', () => {
    const a = new Set([1]);
    const b = new Set([2]);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return true if the values are ArrayBuffer views with same length and elements', () => {
    const a = new Int8Array([1]);
    const b = new Int8Array([1]);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(true);
  });

  it('should return false if the values are ArrayBuffer views with different length', () => {
    const a = new Int8Array([1]);
    const b = new Int8Array([1, 2]);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return false if the values are ArrayBuffer views with different elements', () => {
    const a = new Int8Array([1]);
    const b = new Int8Array([2]);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return true if the values are regular expressions with same source and flags', () => {
    const a = new RegExp('test', 'g');
    const b = new RegExp('test', 'g');
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(true);
  });

  it('should return false if the values are regular expressions with different source', () => {
    const a = new RegExp('test', 'g');
    const b = new RegExp('hello', 'g');
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return false if the values are regular expressions with different flags', () => {
    const a = new RegExp('test', 'g');
    const b = new RegExp('test', 'i');
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return true if the values are objects with same properties and values (usingvalueOf())', () => {
    class Example {
      constructor(value: number) {
        this.value = value;
      }

      value: number;

      valueOf() {
        return this.value;
      }
    }

    const a = new Example(1);
    const b = new Example(1);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(true);
  });

  it('should return false if the values are objects with different properties and values (using valueOf())', () => {
    class Example {
      constructor(value: number) {
        this.value = value;
      }

      value: number;

      valueOf() {
        return this.value;
      }
    }

    const a = new Example(1);
    const b = new Example(2);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(false);
  });

  it('should return true if the values are objects with same properties and values (using toString())', () => {
    class Example {
      constructor(value: number) {
        this.value = value;
      }

      value: number;

      toString() {
        return `Value: ${this.value}`;
      }
    }

    const a = new Example(1);
    const b = new Example(1);
    const result = isDeepEqualReact(a, b);
    expect(result).toBe(true);
  });

  it('should return true if the values are objects with same properties and values (ignoring certain keys)', () => {
    const a = { key1: 1, key2: 2 };
    const b = { key1: 1, key2: 2 };
    const result = isDeepEqualReact(a, b, ['key1']);
    expect(result).toBe(true);
  });

  it('should return false if the values are objects with different properties and values (ignoring certain keys)', () => {
    const a = { key1: 1, key2: 2 };
    const b = { key1: 1, key2: 3 };
    const result = isDeepEqualReact(a, b, ['key1']);
    expect(result).toBe(false);
  });

  it('should return true if the values are objects with same properties and values (debug mode)', () => {
    const a = { key1: 1, key2: 2 };
    const b = { key1: 1, key2: 2 };
    const result = isDeepEqualReact(a, b, [], true);
    expect(result).toBe(true);
  });

  it('should return false if the values are objects with different properties and values (debug mode)', () => {
    const a = { key1: 1, key2: 2 };
    const b = { key1: 1, key2: 3 };
    const result = isDeepEqualReact(a, b, [], true);
    expect(result).toBe(false);
  });
});
