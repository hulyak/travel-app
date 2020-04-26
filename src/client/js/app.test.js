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

test('onCreate should be a function', () => {
    expect(typeof onCreate).toBe('function');
});

test(' allGeoNameAPI shoud be a function', () => {
    expect(typeof callGeoNameAPI).toBe('function');
});

test('getWeatherData shoud be a function', () => {
    expect(typeof getWeatherData).toBe('function');
});

test('getPixabayImages shoud be a function', () => {
    expect(typeof getPixabayImages).toBe('function');
});

test('updateUI shoud be a function', () => {
    expect(typeof updateUI).toBe('function');
});

test('fetchLatLang should be a function', () => {
    expect(typeof fetchLatLang).toBe('function');
});

test('postDataToServer should be a function', () => {
    expect(typeof postDataToServer).toBe('function');
});

test('getDataFromServer should be a function', () => {
    expect(typeof getDataFromServer).toBe('function');
});