const { Before, After, Status } = require('cucumber');
const { browser } = require('protractor');

var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);

Before(function(scenario) {
   // research - errors in selenium driver changing window state 
   browser
      .manage()
      .window()
      .maximize()
      .catch((err) => {});
});

After(function(testCase) {
   if (testCase.result.status === Status.FAILED) {
      world = this;
      return browser.takeScreenshot().then(function(screenShot) {
         world.attach(screenShot, 'image/png');
      });
   }
});
