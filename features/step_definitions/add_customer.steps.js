var loginPage = require('../../pages/LoginPage')
    ,accountsPage = require('../../pages/AccountsPage')
    ,utils = require('../../pages/Utils');

var cucumberSteps = function () {
     this.Given(/^I navigate to (.*) page$/, {timeout: 60000}, function(page) {
         switch (page) {
             case "Accounts":
                 return accountsPage.navigateToPage();
             default:
                 return loginPage.navigateToPage();
         }
    });
    
    this.When(/^I enter valid username '(.*)' and password '(.*)'$/, {timeout: 60000}, function(username, password){
        return loginPage.loginIn(username, password);
    });

    this.Then(/^I should login successfully$/, {timeout:60000}, function(callback){
        loginPage.checkPageAt().then(function(opened){
            if (opened) {
                callback();
            } else {
                callback("Page not opened.");
            }
        });
    });

    this.Given('I select Create new account action', {timeout: 60000}, function() {
        return accountsPage.createAccountAction();
    });

    this.When('I add empty details', {timeout: 60000}, function(){
        return accountsPage.clickAddAccount();
    });

    this.Then(/^I should see (error|success) message '(.*)'$/, { timeout: 60000 }, function(status, msg) {
        return accountsPage.verifyStatusMsg(status, msg);
    });
   
    this.When('I add {name:stringInDoubleQuotes}, {pin:stringInDoubleQuotes}, {balance:float} details', { timeout: 60000 }, function(name, pin, balance, callback){
        accountsPage.enterAccountDetails(name, pin, balance).then(function(){
            accountsPage.clickAddAccount().then(function(){
                callback();
            });
        });
    });

    this.When(/^I (enable|disable) 'Restrict the use of this account when balance drops to zero' option$/, {timeout: 60000}, function(e){
        return accountsPage.checkRestricted(e);
    });

    this.Then(/^I log out$/, {timeout: 60000}, function(){
        return utils.logout();
    });   
};

module.exports = cucumberSteps;
