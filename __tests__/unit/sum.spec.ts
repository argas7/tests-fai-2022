describe('Firsts Test', () => {
  beforeAll(() => {
    console.log('########## I was called before start a block of tests ###########');
  });

  beforeEach(() => {
    console.log('===> After that, a test will begin');
  });

  afterEach(() => {
    console.log('===> A test was finished right now');
  });

  afterAll(() => {
    console.log('####### I was called after finish a entire block of tests #######');
  });

  it('should sum two numbers', () => {
    console.log('# This is being called inside a test');
    const a = 10;
    const b = 20;

    const result = a + b;

    expect(result).toBe(30);
  });

  it('should test a string value', () => {
    console.log('# This is being called inside a test');
    const myString = 'Hello world';

    expect(myString).toBe('Hello world');
    expect(myString).toHaveLength(11);
    expect(myString).toBeTruthy();
    expect(myString.split(' ')).toHaveLength(2);
  });

  it('show compare properties from two objects', () => {
    console.log('# This is being called inside a test');
    const result = {
      a: 'this',
      b: 'is',
      c: 1,
      d: 'test',
      e: 'example',
    };

    expect(result).toEqual({
      a: 'this',
      b: 'is',
      c: 'one',
      d: 'test',
      e: 'example'
    });
  });
});
