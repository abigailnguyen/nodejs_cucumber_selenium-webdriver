var utils = require('./Utils');
var By = utils.By
    ,webdriver = utils.webdriver
    ,until = utils.until
    ,driver = utils.driver;

function navigateToPage() {
    var url = "http://localhost:9191";
    return driver.get(url);
}

function loginIn(username, password) {
    driver.findElement(By.id('inputUsername')).sendKeys(username); 
    driver.findElement(By.id('inputPassword')).sendKeys(password);
    driver.findElement(By.name('$Submit$0')).click();
    return true;
}

function checkPageAt() {
    return driver.wait(check_title, 3000);
}

function check_title() {
    var promise = driver.getTitle().then(function(title) {
       if (title === "PaperCut NG : Dashboard : Dashboard")
        {
            console.log("Login successfully.");
            return true;
        } else {
            console.log("Logging in ...");
        }
    });
    return promise;
}           


module.exports = {
   loginIn : loginIn,
   navigateToPage : navigateToPage,
   checkPageAt: checkPageAt
};