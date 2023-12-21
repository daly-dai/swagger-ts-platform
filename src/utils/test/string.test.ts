import { initialToCapital, removeSpaces, transFormat } from '../string';

describe('initialToCapital', () => {
  it('should convert the first letter of the name to uppercase', () => {
    expect(initialToCapital('john')).toEqual('John');
    expect(initialToCapital('alice')).toEqual('Alice');
    expect(initialToCapital('lucas')).toEqual('Lucas');
  });

  it('should convert the last letter of the name to uppercase if the first letter is not a letter', () => {
    expect(initialToCapital('john123')).toEqual('John123');
    expect(initialToCapital('abc')).toEqual('Abc');
    expect(initialToCapital('123')).toEqual('123');
  });
});

describe('removeSpaces', () => {
  it('should remove all spaces from the given string', () => {
    const str = 'Hello World';
    const result = removeSpaces(str);
    expect(result).toEqual('HelloWorld');
  });

  it('should handle empty string', () => {
    const str = '';
    const result = removeSpaces(str);
    expect(result).toEqual('');
  });

  it('should handle string with multiple spaces', () => {
    const str = 'Hello      World';
    const result = removeSpaces(str);
    expect(result).toEqual('HelloWorld');
  });

  it('should keep other characters unchanged', () => {
    const str = 'Hello, World!';
    const result = removeSpaces(str);
    expect(result).toEqual('Hello,World!');
  });
});

describe('transFormat', () => {
  it('should replace all oldChar with newChar', () => {
    const str = 'hello world';
    const oldChar = 'o';
    const newChar = 'x';
    const result = transFormat(str, oldChar, newChar);
    expect(result).toBe('hellx wxrld');
  });

  it('should not replace any char if oldChar is not found', () => {
    const str = 'hello world';
    const oldChar = 'z';
    const newChar = 'x';
    const result = transFormat(str, oldChar, newChar);
    expect(result).toBe('hello world');
  });

  it('should replace the first oldChar if g flag is not specified', () => {
    const str = 'hello world';
    const oldChar = 'l';
    const newChar = 'x';
    const result = transFormat(str, oldChar, newChar);
    expect(result).toBe('hexxo worxd');
  });
});
