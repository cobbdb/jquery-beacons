module.exports = function (grunt) {
    grunt.config.merge({
        'saucelabs-jasmine': {
            all: {
                options: {
                    testname: 'jquery-beacons',
                    urls: [
                        'http://127.0.0.1:9999/tests/_SpecRunner-global.html',
                        'http://127.0.0.1:9999/tests/_SpecRunner-single.html',
                        'http://127.0.0.1:9999/tests/_SpecRunner-other.html'
                    ],
                    throttled: 6
                }
            },
            options: {
                username: process.env.SAUCE_USERNAME,
                key: process.env.SAUCE_ACCESS_KEY,
                build: process.env.TRAVIS_JOB_ID,
                concurrency: 3,
                browsers: browsers
            }
        }
    });
};

var browsers = [{
    browserName: 'firefox',
    platform: 'Linux',
    version: '39.0'
}, {
    browserName: 'firefox',
    platform: 'Windows 10',
    version: '39.0'
}, {
    browserName: 'firefox',
    platform: 'Windows 8.1',
    version: '39.0'
}, {
    browserName: 'chrome',
    platform: 'Windows 10',
    version: '43.0'
}, {
    browserName: 'chrome',
    platform: 'Windows 8.1',
    version: '43.0'
}, {
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '43.0'
}, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '8.0'
}, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '10.0'
}, {
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10.0'
}, {
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11.0'
}, {
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11.0'
}, {
    browserName: 'safari',
    platform: 'OS X 10.8',
    version: '6.0'
}, {
    browserName: 'safari',
    platform: 'OS X 10.9',
    version: '7.0'
}, {
    browserName: 'safari',
    platform: 'OS X 10.10',
    version: '8.0'
}, {
    browserName: 'opera',
    platform: 'Linux',
    version: '12.15'
}, {
    browserName: 'opera',
    platform: 'Windows 7',
    version: '12.12'
}, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '8.2',
    deviceName: 'iPhone Simulator',
    'device-orientation': 'portrait'
}, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '8.1',
    deviceName: 'iPhone Simulator',
    'device-orientation': 'landscape'
}, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '7.1',
    deviceName: 'iPad Simulator',
    'device-orientation': 'landscape'
}, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '7.0',
    deviceName: 'iPad Simulator',
    'device-orientation': 'portrait'
}, {
    browserName: 'android',
    platform: 'Linux',
    version: '5.1',
    deviceName: 'Android Emulator',
    'device-orientation': 'portrait'
}, {
    browserName: 'android',
    platform: 'Linux',
    version: '5.0',
    deviceName: 'Android Emulator',
    'device-orientation': 'landscape'
}, {
    browserName: 'android',
    platform: 'Linux',
    version: '4.4',
    deviceName: 'Android Emulator',
    'device-orientation': 'portrait'
}];
