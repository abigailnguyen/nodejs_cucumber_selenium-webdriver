Feature: a Feature
    Scenario: Test login page
        Given   I navigate to Login page
        When    I enter valid username 'admin' and password '!Password1'
        Then    I should login successfully

    Scenario: Test Add Customer with empty details
        Given   I navigate to Accounts page
        And     I select Create new account action
        When    I add empty details
        Then    I should see error message 'The account name is not unique'
    
    Scenario Outline: Test Add Customer with valid details   
        Given   I navigate to Accounts page
        And     I select Create new account action
        When    I enable 'Restrict the use of this account when balance drops to zero' option
        And     I add "<name>", "<pin>", <balance> details
        Then    I should see success message 'Saved successfully'
        
        Examples:
            | name              | pin               | balance| 
            | james.higin       | @test!Cod3        | 300.80 |
            | Andrew Seys       | <!5897537>        | -55.00 |
    
    Scenario Outline: Test Add Customer with valid details   
        Given   I navigate to Accounts page
        And     I select Create new account action
        When    I disable 'Restrict the use of this account when balance drops to zero' option
        And     I add "<name>", "<pin>", <balance> details
        Then    I should see success message 'Saved successfully'
        
        Examples:
            | name              | pin               | balance| 
            | Anna Suie         | Pin_Code_Temp #   | 150    |
            | Susan Brander     | 23598             | 25.54  |
    @last
    Scenario: Log Out and close browser
        Then I log out 