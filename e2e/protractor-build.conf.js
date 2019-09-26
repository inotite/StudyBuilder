// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

const baseUrl = 'http://localhost:4200';

exports.config = {
   seleniumAddress: 'http://127.0.0.1:4444/wd/hub', // This is targetting your local running instance of the selenium webdriver
   getPageTimeout: 60000,
   allScriptsTimeout: 11000,
   specs: ['./features/**/*.feature'],
   multiCapabilities: [
      {
         browserName: 'chrome',
         shardTestFiles: true,
         maxInstances: 2,
         chromeOptions: {
            args: ['--headless', '--disable-gpu', '--window-size=800,600']
         }
      }
   ],
   plugins: [
      {
         package: require.resolve(
            'protractor-multiple-cucumber-html-reporter-plugin'
         ),
         options: {
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            removeOriginalJsonReportFile: true,
            openReportInBrowser: true
         }
      }
   ],

   directConnect: true,
   baseUrl: baseUrl,
   framework: 'custom',
   frameworkPath: require.resolve('protractor-cucumber-framework'),

   cucumberOpts: {
      require: ['./steps/**/*.ts', './utilities/hooks.js'],
      // <string[]> (expression) only execute the features or scenarios with tags matching the expression
      'no-colors': true,
      tags: ["~@Draft"],
      // <boolean> fail if there are any undefined or pending steps
      strict: true,
      // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
      plugin: ['pretty'],
      // <boolean> invoke formatters without executing steps
      dryRun: false,
      // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
      compiler: [],
      // Tell CucumberJS to save the JSON rep ort
      format: 'json:.e2e-report/results.json',
      strict: true
   },
   onPrepare() {
      require('ts-node').register({
         project: 'e2e/tsconfig.e2e.json'
      });
      return browser.driver.get(baseUrl);
   }
};
