import extend from './extend';

describe('extend', () => {
    it('extends an array', () => {
        const array = ['light', 'air', 'fish'];
        extend(array, 'jam');
        expect(array).toEqual(['light', 'air', 'fish', 'jam']);
    });
    it('throws an error if the first argument is not an array', () => {
        // This is to ensure the same signature as the Jinja2 equivalent.
        expect(() => extend('not an array', 'soup')).toThrow('extend() expects an array');
    });
    it('has no return value', () => {
        // This is to ensure the same signature as the Jinja2 equivalent.
        const array = ['potatoes', 'haircuts', 'arguments'];
        expect(extend(array, 'small things')).toBeUndefined();
    });
});
