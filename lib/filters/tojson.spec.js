import tojson from './tojson';

describe('tojson', () => {
    it('converts data to JSON', () => {
        expect(tojson({ foo: 1 }).toString()).toBe('{"foo":1}');
    });
    it('escapes complex data', () => {
        expect(tojson('"ba&r\'').toString()).toBe('"\\"ba\\u0026r\\u0027"');
        expect(tojson('<bar>').toString()).toBe('"\\u003cbar\\u003e"');
        expect(tojson("'''").toString()).toBe('"\\u0027\\u0027\\u0027"');
    });
});
