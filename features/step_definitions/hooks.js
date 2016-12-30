var utils = require('../../pages/Utils');

var cucumberSteps = function () {
    this.After("@last",function(){
        utils.checkAtLogInPage().then(function(){
            utils.driver.quit();
        });
    });
}

module.exports = cucumberSteps;