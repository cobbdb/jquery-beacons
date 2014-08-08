var request = require('request');
module.exports = function (grunt) {
    grunt.config.merge({
        'saucelabs-jasmine': {
            all: {
                options: {
                    username: process.env.SAUCE_USERNAME,
                    key: process.env.SAUCE_ACCESS_KEY,
                    urls: [
                        'http://127.0.0.1:9999/tests/_SpecRunner.html'
                    ],
                    build: process.env.TRAVIS_JOB_ID,
                    concurrency: 3,
                    testname: 'jquery-beacons',
                    browsers: browsers,
                    onTestComplete: function (result, callback) {
                        var user = process.env.SAUCE_USERNAME;
                        var pass = process.env.SAUCE_ACCESS_KEY;
                        request.put({
                            url: [
                                'https://saucelabs.com/rest/v1',
                                user,
                                'jobs',
                                result.job_id
                            ].join('/'),
                            auth: {
                                user: user,
                                pass: pass
                            },
                            json: {
                                passed: result.passed
                            }
                        }, function (error, response, body) {
                            console.log('Result: %s', JSON.stringify(result));
                            if (error) {
                                callback(error);
                            } else if (response.statusCode !== 200) {
                                callback(new Error('Unexpected response status'));
                            } else {
                                callback(null, result.passed);
                            }
                        });
                    }
                }
            }
        }
    });
};

var browsers = [{
    browserName: 'firefox',
    platform: 'Linux',
    version: '28'
}, {
    browserName: 'firefox',
    platform: 'Windows 8',
    version: '29'
}, {
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '34'
}, {
    browserName: 'chrome',
    platform: 'Windows XP',
    version: '33'
}, {
    browserName: 'internet explorer',
    platform: 'Windows XP',
    version: '8'
}, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9'
}, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '10'
}, {
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10'
}, {
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
}, {
    browserName: 'safari',
    platform: 'OS X 10.6',
    version: '5'
}, {
    browserName: 'safari',
    platform: 'OS X 10.8',
    version: '6'
}, {
    browserName: 'safari',
    platform: 'OS X 10.9',
    version: '7'
}, {
    browserName: 'opera',
    platform: 'Linux',
    version: '12'
}, {
    browserName: 'opera',
    platform: 'Windows 7',
    version: '12'
}, {
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '7.1',
    deviceName: 'iPhone',
    'device-orientation': 'portrait'
}, {
    browserName: 'ipad',
    platform: 'OS X 10.9',
    version: '7.0',
    deviceName: 'iPad',
    'device-orientation': 'portrait'
}, {
    browserName: 'ipad',
    platform: 'OS X 10.8',
    version: '6.1',
    deviceName: 'iPad',
    'device-orientation': 'landscape'
}, {
    browserName: 'android',
    platform: 'Linux',
    version: '4.3',
    deviceName: 'Android',
    'device-orientation': 'portrait'
}];
