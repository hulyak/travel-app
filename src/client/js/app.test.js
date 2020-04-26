const {
    callGeoNameAPI,
    getWeatherData,
    getPixabayImages,
    updateUI,
    fetchLatLang,
    postDataToServer,
    getDataFromServer,
    onCreate
} = require('./formvalidator.js');

describe('onCreate() function', () => {
    test("should be defined", async () => {
        expect(onCreate).toBeDefined();
    });
    test('should be a function', async () => {
        expect(typeof onCreate).toBe('function');
    });
});
describe('callGeoNameApi() function', () => {
    test('shoud be a defined ', async () => {
        expect(callGeoNameAPI).toBeDefined();
    });
    test('should be a function', async () => {
        expect(typeof callGeoNameAPI).toBe('function');
    });
});

describe('getWeatherData() function', () => {
    test('shoud be a defined ', async () => {
        expect(getWeatherData).toBeDefined();
    });
    test('getWeatherData shoud be a function', () => {
        expect(typeof getWeatherData).toBe('function');
    });
});

describe('getPixabayImages() function', () => {
    test('shoud be a defined ', async () => {
        expect(getPixabayImages).toBeDefined();
    });
    test('getPixabayImages shoud be a function', () => {
        expect(typeof getPixabayImages).toBe('function');
    });
});

describe('updateUI() function', () => {
    test('shoud be a defined', async () => {
        expect(updateUI).toBeDefined();
    });
    test('updateUI shoud be a function', () => {
        expect(typeof updateUI).toBe('function');
    });
});

describe('fetchLatLang() function', () => {
    test('shoud be a defined ', async () => {
        expect(fetchLatLang).toBeDefined();
    });
    test('fetchLatLang should be a function', () => {
        expect(typeof fetchLatLang).toBe('function');
    });
});

describe('postDataToServer() function', () => {
    test('shoud be a defined ', async () => {
        expect(postDataToServer).toBeDefined();
    });
    test('postDataToServer should be a function', () => {
        expect(typeof postDataToServer).toBe('function');
    });
});

describe('getDataFromServer() function', () => {
    test('shoud be a defined ', async () => {
        expect(getDataFromServer).toBeDefined();
    });
    test('getDataFromServer should be a function', () => {
        expect(typeof getDataFromServer).toBe('function');
    });
});