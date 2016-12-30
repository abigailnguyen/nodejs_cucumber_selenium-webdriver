var webdriver = require('selenium-webdriver')
    ,assert = require('assert')
    ,By = webdriver.By
    ,until = webdriver.until;


var chromeCapabilities = webdriver.Capabilities.chrome();
var chromeOptions = {
    'args': ['--test-type', '--start-maximized']
};
chromeCapabilities.set('chromeOptions', chromeOptions);

//Testing with Chrome driver
var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();

var utils = {
    logout: function() {
        return driver.findElement(By.className('logout')).then(function(elem){
            driver.actions().mouseMove(elem).perform().then(function(){
                elem.click();
            });
        });
    }, 
    checkAtLogInPage : function() {
        return driver.wait(until.elementLocated(By.id('login22')), 5000, "Logout unsuccessfully.");
    },
    driver : driver,
    webdriver : webdriver,
    assert : assert,
    By : By,
    until : until
};

module.exports = utils;