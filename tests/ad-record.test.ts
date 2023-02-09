import { AdRecord } from "../records/ad.record";

export const defaultAd = new AdRecord({
    name: "Test name",
    description: 'very long desc',
    url: 'https://test.test.pl',
    lat: 50,
    lon: 50,
    price: 70
});

test('Can build AdRecord', () => {

    expect(defaultAd.id).toBeDefined();
    expect(defaultAd.name).toEqual('Test name');
    expect(defaultAd.description).toBe('very long desc');
    expect(defaultAd.url).toBe('https://test.test.pl');
    expect(defaultAd.price).toEqual(70);
    expect(defaultAd.lon).toEqual(50);
    expect(defaultAd.lat).toEqual(50);

});

test('Validates invalid price', () => {
    expect(() => new AdRecord({
        ...defaultAd,
        price: -1,
    })).toThrow('Ad price should be between 0 - 9999999 EUR');

    expect(() => new AdRecord({
        ...defaultAd,
        price: 10999999,
    })).toThrow('Ad price should be between 0 - 9999999 EUR')
});

test('Validates invalid name', () => {
    expect(() => new AdRecord({
        ...defaultAd,
        name: '',
    })).toThrow('Ad name should be between 1 and 100 characters long');

    expect(() => new AdRecord({
        ...defaultAd,
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    })).toThrow('Ad name should be between 1 and 100 characters long')
});

test(')Validates invalid description', () => {
    expect(() => new AdRecord({
        ...defaultAd,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    })).toThrow('Ad description cannot be longer then 1000 characters')
});

test('Validates invalid url', () => {
    expect(() => new AdRecord({
        ...defaultAd,
        url: ''
    })).toThrow();

});

test('validates invalid lat and lon', () => {

    expect(() => new AdRecord({
        ...defaultAd,
        lat: 0,
        lon: 0,
    })).toThrow('We cannot locate the ad')
});
