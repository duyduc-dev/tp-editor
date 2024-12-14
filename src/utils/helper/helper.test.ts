import { isStringValid, limitString } from '.';

describe('Helper test', () => {
  it('isStringValid', () => {
    expect(isStringValid('hello')).toBe(true);
  });

  it('limitString', () => {
    expect(limitString('hello1234567890', 10)).toBe('hello12...');
  });
});
