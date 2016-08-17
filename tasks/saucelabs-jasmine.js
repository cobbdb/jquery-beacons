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
    platform: 'Windows 7',
    browserName: 'chrome',
    version: '51.0'
}, {
    platform: 'Windows 7',
    browserName: 'firefox',
    version: '47.0'
}, {
    platform: 'Windows 7',
    browserName: 'internet explorer',
    version: '11.0'
}, {
    platform: 'Windows 7',
    browserName: 'opera',
    version: '12.12'
}, {
    platform: 'Windows 10',
    browserName: 'chrome',
    version: '51.0'
}, {
    platform: 'Windows 10',
    browserName: 'MicrosoftEdge',
    version: '13.10586'
}, {
    platform: 'OS X 10.10',
    browserName: 'safari',
    version: '8.0'
}, {
    platform: 'OS X 10.11',
    browserName: 'chrome',
    version: '51.0'
}, {
    platform: 'OS X 10.11',
    browserName: 'safari',
    version: '9.0'
}, {
    deviceName: 'iPhone Simulator',
    deviceOrientation: 'portrait',
    platformName: 'iOS',
    browserName: 'Safari',
    platformVersion: '9.3',
    appiumVersion: '1.5.3'
}, {
    deviceName: 'iPhone Simulator',
    deviceOrientation: 'portrait',
    platformName: 'iOS',
    browserName: 'Safari',
    platformVersion: '8.4',
    appiumVersion: '1.5.3'
}, {
    deviceName: 'iPad Simulator',
    deviceOrientation: 'landscape',
    platformName: 'iOS',
    browserName: 'Safari',
    platformVersion: '9.3',
    appiumVersion: '1.5.3'
}, {
    deviceName: 'Android Emulator',
    deviceType: 'phone',
    deviceOrientation: 'portrait',
    platformName: 'Android',
    browserName: 'Browser',
    platformVersion: '5.1',
    appiumVersion: '1.5.3'
}, {
    deviceName: 'Android Emulator',
    deviceType: 'tablet',
    deviceOrientation: 'landscape',
    platformName: 'Android',
    browserName: 'Browser',
    platformVersion: '5.1',
    appiumVersion: '1.5.3'
}];
