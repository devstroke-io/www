// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const projectConfig = {
  basePath: '',
  frameworks: ['jasmine', '@angular-devkit/build-angular'],
  plugins: [
    require('karma-jasmine'),
    require('karma-chrome-launcher'),
    require('karma-jasmine-html-reporter'),
    require('karma-coverage-istanbul-reporter'),
    require('@angular-devkit/build-angular/plugins/karma')
  ],
  customLaunchers: {
    ChromeHeadlessCI: {
      base: 'ChromeHeadless',
      flags: ['--no-sandbox']
    }
  },
  client: {
    clearContext: false // leave Jasmine Spec Runner output visible in browser
  },
  coverageIstanbulReporter: {
    dir: require('path').join(__dirname, '../coverage'),
    reports: ['lcovonly', 'text-summary', 'text'],
    fixWebpackSourcePaths: true
  },
  reporters: ['progress', 'coverage-istanbul'],
  port: 9876,
  colors: true,
  autoWatch: true,
  browsers: ['ChromeHeadless'],
  singleRun: false,
  browserNoActivityTimeout: 60000
};

module.exports = function (config) {
  config.set({...projectConfig, ...{logLevel: config.LOG_INFO}});
};
