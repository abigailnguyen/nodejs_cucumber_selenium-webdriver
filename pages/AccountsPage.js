var utils = require('./Utils');

var By = utils.By
    ,assert = utils.assert
    ,webdriver = utils.webdriver
    ,until = utils.until
    ,driver = utils.driver;

var actionLinks = {
    newAccount : (function() { 
        return driver.wait(until.elementLocated(By.css('#pageactions a[href*="createAccount"]')), 5 * 1000).then(function(elem) {
            return elem; 
        });
    })
};

var newAccountFields = {
    okBtn : (function() {
        return driver.wait(until.elementLocated(By.name('$Submit$1')), 5 * 1000).then(function(elem) {
            return elem;
        });
    }),

    cancelBtn : (function() {
        return driver.wait(until.elementLocated(By.name('$Submit$2')), 5 * 1000).then(function(elem) {
            return elem;
        });
    }),

    applyBtn : (function() {
        return driver.wait(until.elementLocated(By.name('$Submit$3')), 5 * 1000).then(function(elem) {
            return elem;
        });
    }),

    tabContent: (function() {
        return driver.wait(until.elementLocated(By.className('tabContent')), 5 * 1000).then(function(elem) {
            return elem;
        });
    }),

    accountName: (function() {return driver.findElement(By.name('inputAccountName'));}),
    accountPin: (function() {return driver.findElement(By.name('inputAccountPin'));}),
    balance: (function() {return driver.findElement(By.name('inputBalance'));}),
    restricted: (function() {return driver.findElement(By.id('chkRestricted'));})
    
};



var accountsPage = {
   
    navigateToPage: function () {
        return driver.findElement(By.css("#mainnav ul li a[href*='AccountList'] span.content-wrapper")).then(function(elem){
            driver.actions().mouseMove(elem).perform().then(function() {
                elem.click();
            })
		});
    },

    createAccountAction: function() {
        return actionLinks.newAccount().then(function(elem){
            driver.actions().mouseMove(elem).perform().then(function(){
                elem.click();
            })
        });  
    }, 

    clickAddAccount: function() {
        return newAccountFields.okBtn().then(function(elem) {
            elem.click();
        });
    },

    verifyStatusMsg: function(status, msgText) {
        if (status === 'error') {
             return newAccountFields.tabContent().then(function(elem){
                return elem.findElement(By.className('errorMessage')).then(function(el) {
                    return el;
                });
             }).then(function(elem){
                elem.getAttribute('innerText').then(function(t) {
                    assert.deepStrictEqual(t.trim(), msgText, "Error message is incorrect.");
                });
             });
        } else if (status === 'success') {
             return newAccountFields.tabContent().then(function(elem){
                return elem.findElement(By.css('.infoMessage table')).then(function(el) {
                    return el;
                });
             }).then(function(elem){
                elem.getAttribute('innerText').then(function(t) {
                    assert.deepStrictEqual(t.trim(), msgText, "Success message is incorrect.");
                });
             });
        }
    },

    enterAccountDetails: function(name, pin, balance) {
       return newAccountFields.accountName().sendKeys(name).then(function(){
            newAccountFields.accountPin().sendKeys(pin).then(function(){
                newAccountFields.balance().then(function(elem) {
                    elem.clear();
                    elem.sendKeys(balance);
                });
            });
       });
    },

    checkRestricted: function(action) {
        if (action === 'enable') { return newAccountFields.restricted().click();}
        else { return true;}
    }
};

module.exports = accountsPage;
