@StudySettings
Feature: StudySettings

    # PBI 50127 Study Settings - Feature File

  
    #1
    # This scenario will test that when User clicks on General link, Appropriate fields are displayed
    Scenario: With "eCOA" Study Type selected, Appropriate Fields are displayed when we click on General Link
        Given I select "eCOA" Study Type
        And I navigate to "StudySettings" page
        When I click on "General" link under "Study Wide" CategoryType on the left pane
        Then middle pane should display
            | label                            | Fieldtype    | Defaultvalue | Help Icon | Placeholder       | Enabled |
            | Sponsor Name                     | Inputtextbox |              | True      |                   | True    |
            | Study Name                       | Inputtextbox |              | True      |                   | True    |
            | Protocol Number                  | Inputtextbox |              | True      | Max 60 Characters | True    |
            | Study ID                         | Inputtextbox |              | True      |                   | True    |
            | Site Number Length               | Numberinput  | 4            | True      |                   | True    |
            | Data Export Delimiter            | Dropdown     | comma (,)    | True      |                   | True    |
            | Screening Cap (Global)           | Numberinput  |              | True      |                   | True    |
            | Randomization Cap (Global)       | Numberinput  |              | True      |                   | True    |
            | Attach PDF Confirmation to eMail | Togglebutton | False        | True      |                   | True    |
            | YPrime Logo URL                  | Inputtextbox |              | True      |                   | True    |
            | ZenDesk DCF URL                  | Inputtextbox |              | True      |                   | True    |
            | ZenDesk DCF User ID              | Inputtextbox |              | True      |                   | True    |
            | ZenDesk DCF User Token           | Inputtextbox |              | True      |                   | True    |
            | ZenDesk DCF Group ID             | Inputtextbox |              | True      |                   | True    |
            | ZenDesk DCF Custom Fields        | Inputtextbox |              | True      |                   | True    |
        And "Click the corresponding question mark for more information" text is displayed on the right pane
        And "= MANDATORY" text is displayed in the middle pane
        And asterick symbol is displayed near "= MANDATORY" text
        And Study Settings "CANCEL" button is displayed
        And Study Settings "SAVE CHANGES" button is displayed

    @Draft
    #2
    # This scenario will test that when User clicks on Subject ID link, Appropriate fields are displayed
    Scenario: With "eCOA" Study Type selected, Appropriate Fields are displayed when we click on Subject ID Link
        Given I select "eCOA" Study Type
        And I navigate to "StudySettings" page
        When I click on "Subject ID" link under "Study Wide" CategoryType on the left pane
        Then middle pane should display
            | label                        | Fieldtype    | Defaultvalue | Enabled | Help Icon | Placeholder       |
            | Study Wide Subject ID        | Togglebutton | False        | True    | True      |                   |
            | Subject ID Prefix            | Inputtextbox |              | True    | True      | Max 10 Characters |
            | Prefix/Site ID Seperator     | Inputtextbox |              | True    | True      |                   |
            | Include Site ID              | Togglebutton | False        | True    | True      |                   |
            | Site ID/Subject ID Seperator | Inputtextbox |              | True    | True      |                   |
            | Subject ID Length            | Numberinput  | 4            | True    | True      |                   |
        And "Click the corresponding question mark for more information" text is displayed on the right pane
        And "= MANDATORY" text is displayed in the middle pane
        And asterick symbol is displayed near "= MANDATORY" text
        And Study Settings "CANCEL" button is displayed
        And Study Settings "SAVE CHANGES" button is displayed

    @Draft
    #3
    # This scenario will test that when User clicks on General link, Appropriate fields are displayed
    Scenario: With "eCOA" Study Type selected, Appropriate Fields are displayed when we click on General Link
        Given I select "eCOA" Study Type
        And I navigate to "StudySettings" page
        When I click on "General" link under "eCOA" CategoryType on the left pane
        Then middle pane should display
            | Label                                      | Fieldtype          | Defaultvalue | Enabled | Help Icon |
            | Maximum Incorrect PIN Attempts             | Numberinput        | 10           | True    | True      |
            | BYOD Enabled                               | Togglebutton       | False        | True    | True      |
            | Enable Caregiver Functions                 | Numberinput        | 10           | True    | True      |
            | Allow Caregivers to Complete Subject Forms | Numberinput        | 10           | True    | True      |
        And "Click the corresponding question mark for more information" text is displayed on the right pane
        And "= MANDATORY" text is displayed in the middle pane
        And asterick symbol is displayed near "= MANDATORY" text
        And Study Settings "CANCEL" button is displayed
        And Study Settings "SAVE CHANGES" button is displayed

    @Draft
    #4
    # This scenario will test that when User click on Tablet, Appropriate fields are displayed
    Scenario: With "eCOA" Study Type selected, Appropriate Fields are displayed when we click on Tablet Link
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        When I click on "Tablet" link under "eCOA" CategoryType on the left pane
        Then middle pane should display
            | Label                                  | Fieldtype     | Defaultvalue | Enabled | Help Icon |
            | User Inactivity Timeout                | Numberinput   | 10           | True    | True      |
            | Scheduled Data Sync Interval (minutes) | Numberinput   |              | True    | True      |
            | Critical Battery Percentage            | Numberinput   |              | True    | True      |
            | Allow Subject Setup on Device          | Togglebutton  | False        | True    | True      |
            | Change Subject Status                  | Togglebutton  | False        | True    | True      |
            | Ignore Visit Schedule                  | Togglebutton  | False        | True    | True      |
            | Show Questionnaire Progress Bar        | Togglebutton  | False        | True    | True      |
            | Show Visit Progress Bar                | Togglebutton  | False        | True    | True      |
            | Web Backup Expiration (days)           | Numberinput   |              | True    | True      |
            | Web Backup Key                         | Inputtextbox  |              | True    | True      |
        And "Click the corresponding question mark for more information" text is displayed on the right pane
        And "= MANDATORY" text is displayed in the middle pane
        And asterick symbol is displayed near "= MANDATORY" text
        And Study Settings "CANCEL" button is displayed
        And Study Settings "SAVE CHANGES" button is displayed

    @Draft
    #5
    # This scenario will test that when User clicks on Handheld link Appropriate fields are displayed
    Scenario: With "eCOA" Study Type selected, Appropriate Fields are displayed when we click on Handheld Link
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        When I click on "Handheld" link under "eCOA" CategoryType on the left pane
        Then middle pane should display
            | Label                                     | Fieldtype    | Defaultvalue | Enabled | Help Icon |
            | User Inactivity Timeout                   | Numberinput  | 10           | True    | True      |
            | Scheduled Data Sync Interval (minutes)    | Numberinput  |              | True    | True      |
            | Allow Subject Setup on Device             | Togglebutton | False        | True    | True      |
            | Manage Subject Status During Unassignment | Togglebutton | False        | True    | True      |
            | Daisy Chain Required Questionnaires       | Togglebutton | False        | True    | True      |
            | Handheld Visit Activation                 | Togglebutton | False        | True    | True      |
            | Web Backup Key                            | Inputtextbox | 0            | True    | True      |
            | Web Backup Expiration (days)              | Numberinput  | 0            | True    | True      |
        And "Click the corresponding question mark for more information" text is displayed on the right pane
        And "= MANDATORY" text is displayed in the middle pane
        And asterick symbol is displayed near "= MANDATORY" text
        And Study Settings "CANCEL" button is displayed
        And Study Settings "SAVE CHANGES" button is displayed

    @Draft
    #6
    # This scenario will test that when User clicks in the Subject Pin Length dropdown following option is displayed
    Scenario: With "eCOA" study type selected, User clicks in the Subject Pin Length dropdown following Options is displayed in the field
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        When I click on "General" link under "eCOA" CategoryType on the left pane
        When I click in the "Subject Pin Length" dropdown
        Then "Subject Pin Length" is displayed in the dropdown
            | Value   |
            | 4       |
            | 6       |

    @Draft
    #7
    # This scenario will test that Fields should accepts only Characters within the min and max value
    Scenario Outline: With "eCOA" study type selected, Fields should accepts only Characters within the Min and Max value
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        When I click on "<Links>" link under "<CategoryType>" CategoryType on the left pane
        And I enter the "<Field>" with "<Value>"
        Then the "<Field>" should display "<DisplayValue>"

            Examples:
                | CategoryType | Links      | Field                        | Value                                                                                                                                                                                                                                                                                                         | DisplayValue                                                                                                                                                                                                                                                                                                  | Fieldtype    |
                | Study Wide   | General    | Sponsor Name                 | laq4fk6ht6dWNTsze15k7WsEVRYhBDYvm6cryWHAgq4HPe86FBAh5b7zu3Grz                                                                                                                                                                                                                                                 | laq4fk6ht6dWNTsze15k7WsEVRYhBDYvm6cryWHAgq4HPe86FBAh5b7zu3Gr                                                                                                                                                                                                                                                  | Inputtextbox |
                | Study Wide   | General    | Study Name                   | laq4fk6ht6dWNTsze15k7WsEVRYhBDYvm6cryWHAgq4HPe86FBAh5b7zu3Grz                                                                                                                                                                                                                                                 | laq4fk6ht6dWNTsze15k7WsEVRYhBDYvm6cryWHAgq4HPe86FBAh5b7zu3Gr                                                                                                                                                                                                                                                  | Inputtextbox |
                | Study Wide   | General    | Protocol Number              | oRLoBlgjyzSLysA4cOs9y9RM9gv6HdwIZ9d0X6logloQzJyDeH8                                                                                                                                                                                                                                                           | oRLoBlgjyzSLysA4cOs9y9RM9gv6HdwIZ9d0X6logloQzJyDeH                                                                                                                                                                                                                                                            | Inputtextbox |
                | Study Wide   | General    | Study ID                     | sJjX8EjHz4SI1lCbFtdP9NwpCUGfcG3N                                                                                                                                                                                                                                                                              | sJjX8EjHz4SI1lCbFtdP9NwpCUGfcG3                                                                                                                                                                                                                                                                               | Inputtextbox |
                | Study Wide   | General    | YPrime Logo URL              | UKd6y3096mIDXkaCsmc6AhpyYzJA8CQwhIoBale8tiHi9wC3VU7xFc0xPiweUYXje3eXD0yzi1Hhi3XwJjIJ4qFn1f7qFrLITfufIEOYZUSvgyb0b4LfEOQ1GOMiwRGUjr5iIo2LtFjUZ1FTNnmjfB7Djx2cWNSr260yXqmlSL1EiYZjVkrVWG1BKzR6qAv1BLxUZ37HdvJ27X8b1erhoUfcU8hOmbgm5WNmFVOc4dg91V187MNFjHRwvPbplFwYkVrsuBJLWrrSaPvd3YHaPFgBuAxRjEf8cgyz2t6PxheXn | UKd6y3096mIDXkaCsmc6AhpyYzJA8CQwhIoBale8tiHi9wC3VU7xFc0xPiweUYXje3eXD0yzi1Hhi3XwJjIJ4qFn1f7qFrLITfufIEOYZUSvgyb0b4LfEOQ1GOMiwRGUjr5iIo2LtFjUZ1FTNnmjfB7Djx2cWNSr260yXqmlSL1EiYZjVkrVWG1BKzR6qAv1BLxUZ37HdvJ27X8b1erhoUfcU8hOmbgm5WNmFVOc4dg91V187MNFjHRwvPbplFwYkVrsuBJLWrrSaPvd3YHaPFgBuAxRjEf8cgyz2t6PxheXn | Inputtextbox |
                | Study Wide   | Subject ID | Prefix/Site ID Seperator     | Sg                                                                                                                                                                                                                                                                                                            | S                                                                                                                                                                                                                                                                                                             | Inputtextbox |
                | Study Wide   | Subject ID | Site ID/Subject ID Seperator | Sg                                                                                                                                                                                                                                                                                                            | S                                                                                                                                                                                                                                                                                                             | Inputtextbox |
                | Study Wide   | Subject ID | Subject ID Prefix            | k2cbabaRsoW                                                                                                                                                                                                                                                                                                   | k2cbabaRso                                                                                                                                                                                                                                                                                                    | Inputtextbox |

    @Draft
    #8
    # This scenario will test that when error message is displayed when user enter value greater then the Min Max Value
    Scenario Outline: With "eCOA" study type selected, Error message  be displayed when User enters number greater than the Min Max value
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        When I click on "<Links>" link under "<CategoryType>" CategoryType on the left pane
        And  I enter the "<Field>" with "<Value>"
        When I remove focus from "<Field>"
        Then  "<Error>" message is displayed near "<Field>"

            Examples:
            | CategoryType | Links       | Field                                  | Error                            | Value | Fieldtype   |
            | Study Wide   | General     | Site Number Length                     | Value must be between 0 - 20     | -1    | Numberinput |
            | Study Wide   | General     | Site Number Length                     | Value must be between 0 - 20     | 21    | Numberinput |
            | Study Wide   | Subject ID  | Subject ID Length                      | Value must be between 0 - 20     | -1    | Numberinput |
            | Study Wide   | Subject ID  | Subject ID Length                      | Value must be between 0 - 20     | 21    | Numberinput |
            | eCOA         | General     | Maximum Incorrect PIN Attempts         | Value must be between 0 - 100    | -1    | Numberinput |
            | eCOA         | General     | Maximum Incorrect PIN Attempts         | Value must be between 0 - 100    | 101   | Numberinput |
            | eCOA         | Tablet      | User Inactivity Timeout                | Value must be between 0 - 60     | 61    | Numberinput |
            | eCOA         | Tablet      | User Inactivity Timeout                | Value must be between 0 - 60     | -1    | Numberinput |
            | eCOA         | Tablet      | Scheduled Data Sync Interval (minutes) | Value must be between 60 - 10080 | 10081 | Numberinput |
            | eCOA         | Tablet      | Scheduled Data Sync Interval (minutes) | Value must be between 60 - 10080 | 59    | Numberinput |
            | eCOA         | Tablet      | Critical Battery Percentage            | Value must be between 0 - 100    | 101   | Numberinput |
            | eCOA         | Tablet      | Critical Battery Percentage            | Value must be between 0 - 100    | -1    | Numberinput |
            | eCOA         | Tablet      | Web Backup Expiration (days)           | Value must be between 0 - 365    | 366   | Numberinput |
            | eCOA         | Handheld    | User Inactivity Timeout                | Value must be between 0 - 60     | 61    | Numberinput |
            | eCOA         | Handheld    | User Inactivity Timeout                | Value must be between 0 - 60     | -1    | Numberinput |
            | eCOA         | Handheld    | Scheduled Data Sync Interval (minutes) | Value must be between 60 - 10080 | -1    | Numberinput |
            | eCOA         | Handheld    | Scheduled Data Sync Interval (minutes) | Value must be between 60 - 10080 | 10081 | Numberinput |
            | eCOA         | Handheld    | Web Backup Expiration (days)           | Value must be between 0 - 365    | 366   | Numberinput |

    @Draft
    #9
    # This scenario will test that when User enters a value within the min and max limit then error message should not be displayed
    Scenario Outline: With "eCOA" study type selected, When a user enters a value within the Min or Max limit, then error message should not be displayed near "Site Number Length" field
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        When I click on "<Links>" link under "<CategoryType>" CategoryType on the left pane
        And  I enter the "<Field>" with "<Value>"
        When I remove focus from "<Field>"
        Then no error message is displayed near "<Field>"

            Examples:
            | CategoryType | Links      | Field                                  | Error | Value | Fieldtype   |
            | Study Wide   | General    | Site Number Length                     |       | 0     | Numberinput |
            | Study Wide   | General    | Site Number Length                     |       | 20    | Numberinput |
            | Study Wide   | Subject ID | Subject ID Length                      |       | 0     | Numberinput |
            | Study Wide   | Subject ID | Subject ID Length                      |       | 20    | Numberinput |
            | eCOA         | General    | Maximum Incorrect PIN Attempts         |       | 1     | Numberinput |
            | eCOA         | General    | Maximum Incorrect PIN Attempts         |       | 100   | Numberinput |
            | eCOA         | Tablet     | User Inactivity Timeout                |       | 60    | Numberinput |
            | eCOA         | Tablet     | Scheduled Data Sync Interval (minutes) |       | 10080 | Numberinput |
            | eCOA         | Tablet     | Critical Battery Percentage            |       | 100   | Numberinput |
            | eCOA         | Tablet     | Web Backup Expiration (days)           |       | 365   | Numberinput |
            | eCOA         | Handheld   | User Inactivity Timeout                |       | 60    | Numberinput |
            | eCOA         | Handheld   | Scheduled Data Sync Interval (minutes) |       | 60    | Numberinput |
            | eCOA         | Handheld   | Web Backup Expiration (days)           |       | 365   | Numberinput |

    @Draft
    #10
    # This scenario will test that when User clicks in the Data Export Delimiter dropdown following option is displayed
    Scenario: With "eCOA" study type selected, User clicks in the Data Export Delimiter dropdown following Options is displayed in the field
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        When I click on "General" link under "Study Wide" CategoryType on the left pane
        When I click in the "Data Export Delimiter" dropdown
        Then "Data Export Delimiter" is displayed in the dropdown
        |Value                |
        |comma (,)            |
        |pipe (\|)            |
        |semicolon (;)        |
       
    @Draft
    #11
    # This scenario will test that when Users do not enter value in the Mandatory Field then MandatoryFields are highlighted and error message is displayed
    Scenario: With "Unified" Study Type selected, MandatoryFields are highlighted when Users do not enter value in the MandatoryFields and an error message is displayed
        Given I have selected "Unified" StudyType
        And I navigate to "StudySettings" page
        When I click on "General" link under "Study Wide" CategoryType on the left pane
        When I click on "SAVE CHANGES" button
        Then "Alert: Please address all highlighted fields" snackbar "info" is displayed
        And "MandatoryFields" are highlighted
            | MandatoryFields                  |
            | Sponsor Name                     |
            | Study Name                       |
            | Study ID                         |
            | Site Number Length               |
            | Data Export Delimiter            |
            | Screening Cap (Global)           |
            | Randomization Cap (Global)       |
            | Attach PDF Confirmation to eMail |
            | ZenDesk DCF URL                  |
            | ZenDesk DCF User ID              |
            | ZenDesk DCF User Token           |
            | ZenDesk DCF Group ID             |
            | ZenDesk DCF Custom Fields        |

    @Draft
    #12
    # This scenario will test that when a user enters a value in "Web Backup Expiration (days)" field and leaves the "Web Backup Key" field blank then error message is displayed
    Scenario: With "eCOA" Study Type selected, When a user enters a value in "Web Backup Expiration (days)" field and leaves the "Web Backup Key" field blank then error message is displayed and MandatoryField is  highlighted
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And I click on "<Links>" link under "<CategoryType>" CategoryType on the left pane
        And I enter the following data
            | CategaoryType | Links    | Field                        | Value | Fieldtype   |
            | eCOA          | Tablet   | Web Backup Expiration (days) | 1     | Numberinput |
            | eCOA          | Handheld | Web Backup Expiration (days) | 1     | Numberinput |
        When I click on "SAVE CHANGES" button
        Then "Alert: Please address all highlighted fields" snackbar "info" is displayed
        And the following Field is highlighted
            | Field          | Fieldtype   |
            | Web Backup Key | Numberinput |

    @Draft
    #13
    # This scenario will test that when User enters number less than 20 in the "Site Number Length" field and leaves required field blank then error message is displayed
    Scenario Outline: With "eCOA" study type selected, Error message is displayed when user enters incorrect value and leaves a required field blank
        Given I have selected "eCOA" study type
        And I navigate to "StudySettings" page
        And I click "General" link under "Study Wide" CategoryType on the left pane
        And  I fill the "<Field>" with "<Value>"
            | Field              | Value    | Fieldtype    |
            | Site Number Length | -1       | Inputtextbox |
            | Study Name         | Base 3.4 | Inputtextbox |
            | Sponsor Name       |          | Inputtextbox |
        When I click "Save Changes" button
        Then "Alert: Please address all highlighted fields" snackbar "info" is displayed
        And the following Field is highlighted
            | Field              | Fieldtype   |
            | Sponsor Name       | Numberinput |
            | Site Number Length | Numberinput |
        And "Value must be between 0 - 20" error message is displayed near the "Site Number Length"

    @Draft
    #14
    # This scenario will test that Web Backup key field is disabled when Web Backup expiration field is equal to 0
    Scenario Outline: With "eCOA" Study Type selected,Web Backup Key field is disabled when Web Backup expiration field is 0
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And I click on "<Links>" link under "<CategoryType>" CategoryType on the left pane
        When I enter "<Field>" with "<Value>"
        Then "Web Backup Key" field is  disabled

        Examples:
            | CategoryType | Links    | Field                 | Value | Fieldtype    | Enabled |
            | eCOA         | Tablet   | Web Backup Expiration | 0     | Inputtextbox | false   |
            | eCOA         | Handheld | Web Backup Expiration | 0     | Inputtextbox | false   |
            | eCOA         | Tablet   | Web Backup Expiration | 1     | Inputtextbox | True    |
            | eCOA         | Handheld | Web Backup Expiration | 1     | Inputtextbox | True    |


    @Draft
    #15
    # This scenario will test that when User clicks on the Help Icon “Text" is displayed on the right pane and Help Icon is  highlighted
    Scenario: With "eCOA" Study Type selected, User clicks on the Help Icon, “Text" is displayed on the right pane and Help Icon is  highlighted
        Given I select "eCOA" Study type
        And  I navigate to "StudySettings" page
        And  I click on "Subject ID" link under "Study Wide" on the left pane
        And I click on Help Icon near "Study Wide Subject ID" field
        And Help Icon near "Study Wide Subject ID" field is  highlighted
        And the text for "Study Wide Subject ID" field is displayed on the right pane
        And "X" button is displayed near the text for "Study Wide Subject ID" field
        When I click "X" button near the text for "Study Wide Subject ID" field
        Then Help Icon near "Study Wide Subject ID" field should not be highlighted
        And "Click the corresponding question mark for more information" text is displayed on the right pane


    @Draft
    #16
    # This scenario will test when User clicks a different question mark will display the text for that field and remove the previously selected question mark text and highlight of the question mark will switch to the newly selected icon.
    Scenario: With "eCOA" Study Type selected, Help Icon is Active
        Given I select "eCOA" Study type
        And  I navigate to "StudySettings" page
        And  I click on "Subject ID" link under "Study Wide" on the left pane
        And  I click on Help Icon near "Study Wide Subject ID" field
        And Help Icon near "Study Wide Subject ID" field is  highlighted
        And the text for "Study Wide Subject ID" field is displayed on the right pane
        And "X" button is displayed near the text for "Study Wide Subject ID" field
        When I click on Help Icon near "Subject ID Prefix" field
        Then Help Icon near "Subject ID Prefix" field is  highlighted
        And Help Icon near "Study Wide Subject ID" field is  not be highlighted
        And the text for "Subject ID Prefix" field is displayed on the right pane
        And "X" button is displayed near the text for "Subject ID Prefix" field

   @Draft
    #17
    # This scenario will test that when User click CANCEL button the fields should not be updated 
    Scenario: With "eCOA" Study Type selected, User click Cancel Button the fields should not be updated 
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And I click on "General" link under "Study Wide" CategoryType on the left pane
        And middle pane displays
            | Field                            | Value                                | Fieldtype    |
            | Data Export Delimiter            | comma(,)                             | Dropdown     |
            | Randomization Cap (Global)       | 48                                   | Numberinput  |
            | Screening Cap (Global)           | 60                                   | Numberinput  |
            | Attach PDF Confirmation to eMail | On                                   | Togglebutton |
            | Protocol Number                  | 40                                   | Inputtextbox |
            | Site Number Length               | 10                                   | Numberinput  |
            | Study ID                         | 52DAA432-459D-45A3-B3E9-D234D9AA5EF7 | Inputtextbox |
            | Study Name                       | Base 3.4                             | Inputtextbox |
            | Sponsor Name                     | Yprime                               | Inputtextbox |
            | YPrime Logo URL                  | http://val-yprime-develop.net        | Inputtextbox |
            | ZenDesk DCF Custom Fields        | B                                    | Inputtextbox |
            | ZenDesk DCF Group ID             | 58698989                             | Inputtextbox |
            | ZenDesk DCF URL                  | yprime1437749442.zendesk.com         | Inputtextbox |
            | ZenDesk DCF User ID              | test@yprime.com                      | Inputtextbox |
            | ZenDesk DCF User Token           | 569890000                            | Inputtextbox |
        And I enter the following data
            | Field                            | Value                                | Fieldtype    |
            | Data Export Delimiter            | comma(,)                             | Dropdown     |
            | Randomization Cap (Global)       | 50                                   | Numberinput  |
            | Screening Cap (Global)           | 61                                   | Numberinput  |
            | Attach PDF Confirmation to eMail | On                                   | Togglebutton |
            | Protocol Number                  | 48                                   | Inputtextbox |
            | Site Number Length               | 19                                   | Numberinput  |
            | Study ID                         | 52DAA432-459D-45A3-B3E9-D234D9AA5EF7 | Inputtextbox |
            | Study Name                       | Base 3.4                             | Inputtextbox |
            | Sponsor Name                     | Yprime                               | Inputtextbox |
            | YPrime Logo URL                  | http://val-yprime-develop.net        | Inputtextbox |
            | ZenDesk DCF Custom Fields        | A                                    | Inputtextbox |
            | ZenDesk DCF Group ID             | 58698989                             | Inputtextbox |
            | ZenDesk DCF URL                  | yprime1437749442.zendesk.com         | Inputtextbox |
            | ZenDesk DCF User ID              | test@yprime.com                      | Inputtextbox |
            | ZenDesk DCF User Token           | 5698989                              | Inputtextbox |
        When I click "CANCEL" button
        Then the middle pane displays the following data
            | Field                            | Value                                | Fieldtype    |
            | Data Export Delimiter            | comma(,)                             | Dropdown     |
            | Randomization Cap (Global)       | 48                                   | Numberinput  |
            | Screening Cap (Global)           | 60                                   | Numberinput  |
            | Attach PDF Confirmation to eMail | On                                   | Togglebutton |
            | Protocol Number                  | 40                                   | Inputtextbox |
            | Site Number Length               | 10                                   | Numberinput  |
            | Study ID                         | 52DAA432-459D-45A3-B3E9-D234D9AA5EF7 | Inputtextbox |
            | Study Name                       | Base 3.4                             | Inputtextbox |
            | Sponsor Name                     | Yprime                               | Inputtextbox |
            | YPrime Logo URL                  | http://val-yprime-develop.net        | Inputtextbox |
            | ZenDesk DCF Custom Fields        | B                                    | Inputtextbox |
            | ZenDesk DCF Group ID             | 58698989                             | Inputtextbox |
            | ZenDesk DCF URL                  | yprime1437749442.zendesk.com         | Inputtextbox |
            | ZenDesk DCF User ID              | test@yprime.com                      | Inputtextbox |
            | ZenDesk DCF User Token           | 569890000                            | Inputtextbox |

    @Draft
    #18
    # This scenario will test that when User clicks SAVE CHANGES button Settings successfully saved message is displayed
    Scenario Outline: With "eCOA" study type selected , User clicks on SAVE CHANGES button Settings successfully saved message is displayed
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And I click on "General" link under "Study Wide" CategoryType on the left pane
        And I enter the following data
            | Field                            | Value                                | Fieldtype    |
            | Data Export Delimiter            | comma(,)                             | Dropdown     |
            | Randomization Cap (Global)       | 50                                   | Numberinput  |
            | Screening Cap (Global)           | 61                                   | Numberinput  |
            | Attach PDF Confirmation to eMail | On                                   | Togglebutton |
            | Protocol Number                  | 48                                   | Inputtextbox |
            | Site Number Length               | 19                                   | Numberinput  |
            | Study ID                         | 52DAA432-459D-45A3-B3E9-D234D9AA5EF7 | Inputtextbox |
            | Study Name                       | Base 3.4                             | Inputtextbox |
            | Sponsor Name                     | Yprime                               | Inputtextbox |
            | YPrime Logo URL                  | http://val-yprime-develop.net        | Inputtextbox |
            | ZenDesk DCF Custom Fields        | A                                    | Inputtextbox |
            | ZenDesk DCF Group ID             | 58698989                             | Inputtextbox |
            | ZenDesk DCF URL                  | yprime1437749442.zendesk.com         | Inputtextbox |
            | ZenDesk DCF User ID              | test@yprime.com                      | Inputtextbox |
            | ZenDesk DCF User Token           | 5698989                              | Inputtextbox |
        When I click "SAVE CHANGES" button
        Then "Settings successfully saved" snackbar "info" is displayed


    @Draft
    #19
    # This scenario will test that when User clicks on General link under Study Wide again saved data is displayed
    Scenario: With "eCOA" study type selected ,saved data is displayed when the User clicks on General link under Study Wide again
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And I click on "General" link under "Study Wide" CategoryType on the left pane
        And I enter the following data
            | Field                            | Value                                | Fieldtype    |
            | Data Export Delimiter            | comma(,)                             | Dropdown     |
            | Randomization Cap (Global)       | 50                                   | Numberinput  |
            | Screening Cap (Global)           | 61                                   | Numberinput  |
            | Attach PDF Confirmation to eMail | On                                   | Togglebutton |
            | Protocol Number                  | 48                                   | Inputtextbox |
            | Site Number Length               | 19                                   | Numberinput  |
            | Study ID                         | 52DAA432-459D-45A3-B3E9-D234D9AA5EF7 | Inputtextbox |
            | Study Name                       | Base 3.4                             | Inputtextbox |
            | Sponsor Name                     | Yprime                               | Inputtextbox |
            | YPrime Logo URL                  | http://val-yprime-develop.net        | Inputtextbox |
            | ZenDesk DCF Custom Fields        | A                                    | Inputtextbox |
            | ZenDesk DCF Group ID             | 58698989                             | Inputtextbox |
            | ZenDesk DCF URL                  | yprime1437749442.zendesk.com         | Inputtextbox |
            | ZenDesk DCF User ID              | test@yprime.com                      | Inputtextbox |
            | ZenDesk DCF User Token           | 5698989                              | Inputtextbox |
        And  I click "SAVE CHANGES" button
        And "Settings successfully saved" snackbar "info" is displayed
        When I click on "General" link under "Study Wide" CategoryType on the left pane
        Then middle pane should display the saved data
            | Field                            | Value                                | Fieldtype    |
            | Data Export Delimiter            | comma(,)                             | Dropdown     |
            | Randomization Cap (Global)       | 50                                   | Numberinput  |
            | Screening Cap (Global)           | 61                                   | Numberinput  |
            | Attach PDF Confirmation to eMail | On                                   | Togglebutton |
            | Protocol Number                  | 48                                   | Inputtextbox |
            | Site Number Length               | 19                                   | Numberinput  |
            | Study ID                         | 52DAA432-459D-45A3-B3E9-D234D9AA5EF7 | Inputtextbox |
            | Study Name                       | Base 3.4                             | Inputtextbox |
            | Sponsor Name                     | Yprime                               | Inputtextbox |
            | YPrime Logo URL                  | http://val-yprime-develop.net        | Inputtextbox |
            | ZenDesk DCF Custom Fields        | A                                    | Inputtextbox |
            | ZenDesk DCF Group ID             | 58698989                             | Inputtextbox |
            | ZenDesk DCF URL                  | yprime1437749442.zendesk.com         | Inputtextbox |
            | ZenDesk DCF User ID              | test@yprime.com                      | Inputtextbox |
            | ZenDesk DCF User Token           | 5698989                              | Inputtextbox |

    @Draft
    #20
    # This scenario will test that when User clicks on SUbject ID link under Study Wide again saved data is displayed
    Scenario: With "eCOA" study type selected ,saved data is displayed when the User clicks on General link under Study Wide
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And I click on "Subject ID" link under "Study Wide" CategoryType on the left pane
        And I enter the following data
            | Field                        | Value      | Fieldtype    |
            | Study Wide Subject ID        | off        | Togglebutton |
            | Subject ID Prefix            | grzr14MFVs | Inputtextbox |
            | Prefix/Site ID Seperator     | S          | Inputtextbox |
            | Include Site ID              | On         | Togglebutton |
            | Site ID/Subject ID Seperator | S          | Inputtextbox |
            | Subject ID Length            | 20         | Numberinput  |
        And  I click "SAVE CHANGES" button
        And "Settings successfully saved" snackbar "info" is displayed
        When I click on "Subject ID" link under "Study Wide" CategoryType on the left pane
        Then Middle pane should display the saved data
            | Field                        | Value      | Fieldtype    |
            | Study Wide Subject ID        | off        | Togglebutton |
            | Subject ID Prefix            | grzr14MFVs | Inputtextbox |
            | Prefix/Site ID Seperator     | S          | Inputtextbox |
            | Include Site ID              | On         | Togglebutton |
            | Site ID/Subject ID Seperator | S          | Inputtextbox |
            | Subject ID Length            | 20         | Numberinput  |

    @Draft
    #21
    # This scenario will test that when User clicks on General link under eCOA again saved data is displayed
    Scenario: With "eCOA" study type selected ,saved data is displayed when the User clicks on General link under eCOA
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And I click on "General" link under "eCOA" CategoryType on the left pane
        And I enter the following data
            | Field                                      | value | Fieldtype    |
            | Maximum Incorrect PIN Attempts             | 10    | Numberinput  |
            | BYOD Enabled                               | Off   | Togglebutton |
            | Enable Caregiver Functions                 | 10    | Togglebutton |
            | Allow Caregivers to Complete Subject Forms | 10    | Togglebutton |
        And  I click "SAVE CHANGES" button
        And "Settings successfully saved" snackbar "info" is displayed
        When I click on "General" link under "eCOA" CategoryType on the left pane
        Then Middle pane should display the saved data
            | Field                                      | value | Fieldtype    |
            | Maximum Incorrect PIN Attempts             | 10    | Numberinput  |
            | BYOD Enabled                               | Off   | Togglebutton |
            | Enable Caregiver Functions                 | 10    | Togglebutton |
            | Allow Caregivers to Complete Subject Forms | 10    | Togglebutton |

    @Draft
    #22
    # This scenario will test that when User clicks on Tablet link under eCOA again saved data is displayed
    Scenario: With "eCOA" study type selected ,saved data is displayed when the User clicks on Tablet link under eCOA
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And I click on "Tablet" link under "eCOA" CategoryType on the left pane
        And I enter the following data
            | Field                                  | Value       | Fieldtype    |
            | User Inactivity Timeout                | 59          | Numberinput  |
            | Scheduled Data Sync Interval (minutes) | 60          | Numberinput  |
            | Critical Battery Percentage            | 35          | Numberinput  |
            | Allow Subject Setup on Device          | On          | Togglebutton |
            | Ignore Visit Schedule                  | Off         | Togglebutton |
            | Show Questionnaire Progress Bar        | On          | Togglebutton |
            | Show Visit Progress Bar                | On          | Togglebutton |
            | Web Backup Expiration (days)           | 5           | Numberinput  |
            | Web Backup Key                         | 56567676776 | Numberinput  |
        And  I click "SAVE CHANGES" button
        And "Settings successfully saved" snackbar "info" is displayed
        When I click on "Tablet" link under "eCOA" CategoryType on the left pane
        Then middle pane should display the saved data
            | Field                                  | Value       | Fieldtype    |
            | User Inactivity Timeout                | 59          | Numberinput  |
            | Scheduled Data Sync Interval (minutes) | 60          | Numberinput  |
            | Critical Battery Percentage            | 35          | Numberinput  |
            | Allow Subject Setup on Device          | On          | Togglebutton |
            | Ignore Visit Schedule                  | Off         | Togglebutton |
            | Show Questionnaire Progress Bar        | On          | Togglebutton |
            | Show Visit Progress Bar                | On          | Togglebutton |
            | Web Backup Expiration (days)           | 5           | Numberinput  |
            | Web Backup Key                         | 56567676776 | Numberinput  |

    @Draft
    #23
    # This scenario will test that when User clicks on Handheld link under eCOA again saved data is displayed
    Scenario: With "eCOA" study type selected ,saved data is displayed when the User clicks on Handheld link under eCOA
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And I click on "Handheld" link under "eCOA" CategoryType on the left pane
        And I enter the following data
            | Field                                     | Value     | Fieldtype   |
            | User Inactivity Timeout                   | 60        | Numberinput |
            | Scheduled Data Sync Interval (minutes)    | 61        | Numberinput |
            | Allow Subject Setup on Device             | On        | Numberinput |
            | Manage Subject Status During Unassignment | On        | Togglebutton|
            | Daisy Chain Required Questionnaires       | Off       | Togglebutton|
            | Handheld Visit Activation                 | On        | Togglebutton|
            | Web Backup Expiration (days)              | 5         | Togglebutton|
            | Web Backup Key                            | 569898989 | Numberinput |
        And  I click "SAVE CHANGES" button
        And "Settings successfully saved" snackbar "info" is displayed
        When I click on "Handheld" link under "eCOA" CategoryType on the left pane
        Then middle pane should display the saved data
            | Field                                     | Value     | Fieldtype   |
            | User Inactivity Timeout                   | 60        | Numberinput |
            | Scheduled Data Sync Interval (minutes)    | 61        | Numberinput |
            | Allow Subject Setup on Device             | On        | Numberinput |
            | Manage Subject Status During Unassignment | On        | Togglebutton|
            | Daisy Chain Required Questionnaires       | Off       | Togglebutton|
            | Handheld Visit Activation                 | On        | Togglebutton|
            | Web Backup Expiration (days)              | 5         | Togglebutton|
            | Web Backup Key                            | 569898989 | Numberinput |

    @Draft
    #24
    # This scenario will test that when User enters the value in the Subject ID Prefix field in the middle pane, then an example of the Subject ID Prefix is displayed on the right pane
    Scenario: With "eCOA" study type selected, An example of the Subject ID Prefix value is displayed on the right pane below the notes section
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And I click on "Subject ID" link under "Study Wide" CategoryType on the left pane
        When I enter the following data
            | Field                        | Value | Fieldtype    |
            | Study Wide Subject ID        | True  | Togglebutton |
            | Subject ID Prefix            | S     | Inputtextbox |
            | Prefix/Site ID Seperator     | -     | Inputtextbox |
            | Include Site ID              | On    | Togglebutton |
            | Site ID/Subject ID Seperator | -     | Inputtextbox |
            | Subject ID Length            | 4     | Numberinput  |
        Then "S,-,-,4" is displayed on the right pane in the helper text section 


    @Draft @Phase2
    # This scenario will test that when User clicks on General link under IRT again saved data is displayed
    Scenario: With "Unified" study type selected ,saved data is displayed when the User clicks on General link under IRT
        Given I select "Unified" Study type
        And I navigate to "StudySettings" page
        And I click on "General" link under "IRT" CategoryType on the left pane
        And I enter the following data
            | Field                                    | Value       | Fieldtype    |
            | Initial Order on Site Activation         | On          | Togglebutton |
            | Initial Order on Patient Status          | Screened    | Dropdown     |
            | Drug Acknowledgement Type                | Simple      | Dropdown     |
            | Temp Excursion on Simple Acknowledgement | On          | Togglebutton |
            | Temperature Decimal Place                | 1           | Numberinput  |
            | Randomization Question                   | Numberinput | Dropdown     |
            | Upcoming Patient Visit Days              | 50          | Numberinput  |
        And  I click "SAVE CHANGES" button
        And "Settings successfully saved" message is displayed
        When I click on "General" link under "IRT" CategoryType on the left pane
        Then middle pane should display the saved data
            | Field                                    | Value       | Fieldtype    |
            | Initial Order on Site Activation         | On          | Togglebutton |
            | Initial Order on Patient Status          | Screened    | Dropdown     |
            | Drug Acknowledgement Type                | Simple      | Dropdown     |
            | Temp Excursion on Simple Acknowledgement | On          | Togglebutton |
            | Temperature Decimal Place                | 1           | Numberinput  |
            | Randomization Question                   | Numberinput | Dropdown     |
            | Upcoming Patient Visit Days              | 50          | Numberinput  |


    @Draft @Phase2
    # This scenario will test that when User clicks on No button middle pane should display saved data and Confirmation pop-up disappears
    Scenario: With "eCOA" Study Type selected, User clicks on the "No" button ,left pane is enabled, middle pane should display saved data and Confirmation pop-up disappears
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And  I click on "General" link under "IRT" CategoryType on the left pane
        And I enter the following data
            | Field                                    | Value       | Fieldtype    |
            | Initial Order on Site Activation         | On          | Togglebutton |
            | Initial Order on Patient Status          | Screened    | Dropdown     |
            | Drug Acknowledgement Type                | Simple      | Dropdown     |
            | Temp Excursion on Simple Acknowledgement | On          | Togglebutton |
            | Temperature Decimal Place                | 1           | Numberinput  |
            | Randomization Question                   | Numberinput | Dropdown     |
            | Upcoming Patient Visit Days              | 50          | Numberinput  |
        And I click on "CANCEL" button
        And Confirmation pop-up message "You have unsaved changes, these changes will be lost. Are you sure you want to leave?" is displayed
        When I click "No" button on the Confirmation pop-up
        Then Confirmation pop-up disappears
        And User should remain on the "StudySettings" page
        And the Middle pane should display the following data
            | Field                                    | Value       | Fieldtype    |
            | Initial Order on Site Activation         | On          | Togglebutton |
            | Initial Order on Patient Status          | Screened    | Dropdown     |
            | Drug Acknowledgement Type                | Simple      | Dropdown     |
            | Temp Excursion on Simple Acknowledgement | On          | Togglebutton |
            | Temperature Decimal Place                | 1           | Numberinput  |
            | Randomization Question                   | Numberinput | Dropdown     |
            | Upcoming Patient Visit Days              | 50          | Numberinput  |

    @Draft @Phase2
    # This scenario will test that when User clicks on ALerts link under IRT again saved data is displayed
    Scenario: With "Unified" study type selected ,Saved data is displayed when the User clicks on Alerts link under IRT
        Given I select "Unified" Study type
        And I navigate to "StudySettings" page
        And I click on "Alerts" link under "IRT" CategoryType on the left pane
        And I I enter the following data
            | Field                                  | Value  | Fieldtype    |
            | Lot Expiration Alert Threshold (Depot) | 180    | Inputtextbox |
            | Lot Expiration Alert Threshold (Site)  | 120    | Inputtextbox |
            | Low Inventory Alert Threshold (Depot)  | 1      | Numberinput  |
            | Low Inventory Alert Interval (Depot)   | 3999   | Numberinput  |
            | Low Inventory Alert Threshold (Site)   | 100000 | Numberinput  |
            | Low Inventory Alert Interval (Site)    | 2999   | Numberinput  |
            | Overdue Shipments Treshhold            | 7      | Inputtextbox |
        And  I click "SAVE CHANGES" button
        And "Settings successfully saved" message is displayed
        When I click on "Alerts" link under "IRT" CategoryType on the left pane
        Then middle pane should display the saved data
            | Field                                  | Value  | Fieldtype    |
            | Lot Expiration Alert Threshold (Depot) | 180    | Inputtextbox |
            | Lot Expiration Alert Threshold (Site)  | 120    | Inputtextbox |
            | Low Inventory Alert Threshold (Depot)  | 1      | Numberinput  |
            | Low Inventory Alert Interval (Depot)   | 3999   | Numberinput  |
            | Low Inventory Alert Threshold (Site)   | 100000 | Numberinput  |
            | Low Inventory Alert Interval (Site)    | 2999   | Numberinput  |
            | Overdue Shipments Treshhold            | 7      | Inputtextbox |

    @Draft @Phase2
    # This scenario will test that when User clicks on No button middle pane should display saved data and Confirmation pop-up disappears
    Scenario: With "eCOA" Study Type selected, User clicks on the "No" button ,left pane is enabled, middle pane should display saved data and Confirmation pop-up disappears
        Given I select "eCOA" Study type
        And I navigate to "StudySettings" page
        And  I click on "Alerts " link under "IRT" CategoryType on the left pane
        And I enter the following data
            | Field                                  | Value  | Fieldtype    |
            | Lot Expiration Alert Threshold (Depot) | 180    | Inputtextbox |
            | Lot Expiration Alert Threshold (Site)  | 120    | Inputtextbox |
            | Low Inventory Alert Threshold (Depot)  | 1      | Numberinput  |
            | Low Inventory Alert Interval (Depot)   | 3999   | Numberinput  |
            | Low Inventory Alert Threshold (Site)   | 100000 | Numberinput  |
            | Low Inventory Alert Interval (Site)    | 2999   | Numberinput  |
            | Overdue Shipments Treshhold            | 7      | Inputtextbox |
        And I click on "CANCEL" button
        And Confirmation pop-up message "You have unsaved changes, these changes will be lost. Are you sure you want to leave?" is displayed
        When I click "No" button on the Confirmation pop-up
        Then Confirmation pop-up disappears
        And User should remain on the "StudySettings" page
        And middle pane should display the following data
            | Field                                  | Value  | Fieldtype    |
            | Lot Expiration Alert Threshold (Depot) | 180    | Inputtextbox |
            | Lot Expiration Alert Threshold (Site)  | 120    | Inputtextbox |
            | Low Inventory Alert Threshold (Depot)  | 1      | Numberinput  |
            | Low Inventory Alert Interval (Depot)   | 3999   | Numberinput  |
            | Low Inventory Alert Threshold (Site)   | 100000 | Numberinput  |
            | Low Inventory Alert Interval (Site)    | 2999   | Numberinput  |
            | Overdue Shipments Treshhold            | 7      | Inputtextbox |

    @Draft @Phase2
    # This scenario will test that when StudyType is selected, Appropriate Category and Links are displayed on the left pane in the StudySettings page
    Scenario Outline: With "<StudyType>" Study Type selected, Appropriate "<CategoryTypes>" and "<Links>" are displayed on the left pane in the StudySettings page
        Given I have selected "<StudyType>" Study type
        When I navigate to "StudySettings" page
        Then "<Links>" is displayed under each "<CategoryTypes>" on the left pane
        And right pane is  blank
        And middle pane is  blank
        And "STUDY SETTINGS" title is displayed on the top left corner

        Examples:
            | StudyType | CategoryTypes | Links                     |
            | Unified   | Study Wide    | General, Subject ID       |
            | Unified   | eCOA          | General, Tablet, Handheld |
            | Unified   | IRT           | General, Alerts           |
            | eCOA      | Study Wide    | General, Subject ID       |
            | eCOA      | eCOA          | General, Tablet, Handheld |
            | IRT       | Study Wide    | General, Subject ID       |
            | IRT       | IRT           | General, Alerts           |

    @Draft @Phase2
    # This scenario will test that when User clicks on General link, Appropriate Fields are displayed
    Scenario: With "Unified" Study Type selected, Appropriate Fields are displayed when we click on General Link
        Given I have selected "Unified" Study Type
        And I navigate to "StudySettings" page
        When I click on "General" link under "IRT" CategoryType on the left pane
        Then middle pane should display
            | Label                                    | Fieldtype    | Defaultvalue | Enabled | Help Icon |
            | Initial Order on Site Activation         | Togglebutton | False        | True    | True      |
            | Initial Order on Patient Status          | Dropdown     |              | True    | True      |
            | Drug Acknowledgement Type                | Dropdown     | Simple       | True    | True      |
            | Temp Excursion on Simple Acknowledgement | Togglebutton | False        | True    | True      |
            | Temperature Decimal Place                | Numberinput  | 2            | True    | True      |
            | Randomization Question                   | Numberinput  | 2            | True    | True      |
            | Upcoming Patient Visit Days              | Numberinput  | 7            | True    | True      |
        And "Click the corresponding question mark for more information" text is displayed on the right pane
        And "=MANDATORY" text is displayed in the middle pane
        And asterick symbol is displayed near "MANDATORY" text
        And "CANCEL" button should displayed
        And "SAVE CHANGES" button is displayed


    @Draft@Phase2
    # This scenario will test that when User clicks on Alerts link, Appropriate Fields are displayed
    Scenario: With "Unified" Study Type selected, Appropriate Fields are displayed when we click on Alerts Link
        Given I have selected "Unified" Study Type
        And I navigate to "StudySettings" page
        When I click on "Alerts" link under "IRT" CategoryType on the left pane
        Then middle pane should display
            | Label                                  | Fieldtype    | Defaultvalue | Enabled | Help Icon |
            | Lot Expiration Alert Threshold (Depot) | Inputtextbox |              | True    | True      |
            | Lot Expiration Alert Threshold (Site)  | Inputtextbox |              | True    | True      |
            | Low Inventory Alert Threshold (Depot)  | Numberinput  |              | True    | True      |
            | Low Inventory Alert Interval (Depot)   | Numberinput  |              | True    | True      |
            | Low Inventory Alert Threshold (Site)   | Numberinput  |              | True    | True      |
            | Low Inventory Alert Interval (Site)    | Numberinput  |              | True    | True      |
            | Overdue Shipments Treshhold            | Inputtextbox |              | True    | True      |
        And "Click the corresponding question mark for more information" text is displayed on the right pane
        And "=MANDATORY" text is displayed in the middle pane
        And asterick symbol is displayed near "MANDATORY" text
        And "CANCEL" button should displayed
        And "SAVE CHANGES" button is displayed

    @Draft @Phase2
    # This scenario will test that when Users do not enter value in the MandatoryField then MandatoryFields are highlighted and error message is displayed
    Scenario: With "Unified" Study Type selected, MandatoryFields are highlighted when users do not enter value in the MandatoryFields and an error message is displayed
        Given I have selected "Unified" Study Type
        And I navigate to "StudySettings" page
        And I click on "General" link under "IRT" CategoryType on the left pane
        When I click on "SAVE CHANGES" button
        Then "Alert: Please address all highlighted fields" text is displayed
        And the following Fields are highlighted
            | Fields                                   | Fieldtype    |
            | Initial Order on Site Activation         | Togglebutton |
            | Initial Order on Patient Status          | Dropdown     |
            | Drug Acknowledgement Type                | Dropdown     |
            | Temp Excursion on Simple Acknowledgement | Togglebutton |
            | Temperature Decimal Place                | Numberinput  |
            | Randomization Question                   | Dropdown     |
            | Upcoming Patient Visit Days              | Numberinput  |

    @Draft @Phase2
    # This scenario will test that when User clicks in the Drug Acknowledgement Type dropdown following option is displayed
    Scenario: With "Unified" study type selected, User clicks in the Drug Acknowledgement Type dropdown following Options is displayed in the field
        Given I have selected "Unified" study type
        And I navigate to "StudySettings" page
        And I click on "General" link under "IRT" CategoryType on the left pane
        When I click in the "Drug Acknowledgement Type" dropdown
        Then  "Detailed, Simple, TempTail " is displayed in the "Drug Acknowledgement Type" dropdown

    @Draft @Phase2
    # This scenario will test that error message is displayed near the field when User enters value outside Minimum or Maximum value
    Scenario Outline: With "Unified" study type selected, "<Error>" message is displayed near the "<Fields>" when User enters "<Value>" outside Minimum or Maximum value
        Given I have selected "Unified" study type
        And I navigate to "StudySettings" page
        And I click on "General" link under "IRT" CategoryType on the left pane
        And  I enter the "<Field>" with "<Value>"
        When I remove focus from "<Field>"
        Then "<Error>" message is displayed near "<Field>"

        Examples:
            | Field                       | Error                         | Value | Fieldtype   |
            | Temperature Decimal Places  | Value must be between 0 - 05  | -1    | Numberinput |
            | Temperature Decimal Places  | Value must be between 0 - 05  | 6     | Numberinput |
            | Upcoming Patient Visit Days | Value must be between 0 - 365 | -1    | Numberinput |
            | Upcoming Patient Visit Days | Value must be between 0 - 365 | 366   | Numberinput |

    @Draft @Phase2
    # This scenario will test that when User enters a value within the Min and Max limit then error message should not be displayed
    Scenario Outline: With "Unified" study type selected,When a user enters a value within the Min or Max limit, then error message should not be displayed near "<Field>"
        Given I have selected "Unified" study type
        And I navigate to "StudySettings" page
        And I click on "General" link under "IRT" CategoryType on the left pane
        And  I enter the "<Field>" with "<Value>"
        When I remove focus from "<Field>"
        Then no error message is displayed near "<Field>"

        Examples:
            | Field                       | Value | Fieldtype   |
            | Temperature Decimal Places  | 5     | Numberinput |
            | Temperature Decimal Places  | 5     | Numberinput |
            | Upcoming Patient Visit Days | 365   | Numberinput |
            | Upcoming Patient Visit Days | 365   | Numberinput |

    @Draft @Phase2
    # This scenario will test thaterror message is displayed near the field when User enters value outside Min or Max
    Scenario Outline: With "Unified" study type selected, Error message is displayed near the field when User enters value outside Min or Max
        Given I have selected "Unified" study type
        And I navigate to "StudySettings" page
        And I click on "Alerts" link under "IRT" CategoryType on the left pane
        And  I enter the "<Field>" with "<Value>"
        When I remove focus from "<Field>"
        Then the "<Error>" message is displayed near "<Field>"

        Examples:
            | Field                                 | Error                           | Value  | Fieldtype   |
            | Low Inventory Alert Threshold (Depot) | Value must be between 0-100,000 | -1     | Numberinput |
            | Low Inventory Alert Threshold (Depot) | Value must be between 0-100,000 | 100001 | Numberinput |
            | Low Inventory Alert Interval (Depot)  | Value must be between 0-4,000   | -1     | Numberinput |
            | Low Inventory Alert Interval (Depot)  | Value must be between 0-4,000   | 4001   | Numberinput |
            | Low Inventory Alert Threshold (Site)  | Value must be between 0-100,000 | -1     | Numberinput |
            | Low Inventory Alert Threshold (Site)  | Value must be between 0-100,000 | 100001 | Numberinput |

    @Draft @Phase2
    # This scenario will test that when User enters a value within the Min and Max limit then error message should not be displayed
    Scenario Outline: With "Unified" study type selected,When a user enters a value within the Min or Max limit, then error message should not be displayed near "<Field>""
        Given I have selected "Unified" study type
        And I navigate to "StudySettings" page
        And I click on "Alerts" link under "IRT" CategoryType on the left pane
        And  I enter the "<Field>" with "<Value>"
        When I remove focus from "<Field>"
        Then no error message is displayed near "<Field>"

        Examples:
            | Field                                 | Value  | Fieldtype   |
            | Low Inventory Alert Threshold (Depot) | 0      | Numberinput |
            | Low Inventory Alert Threshold (Depot) | 100000 | Numberinput |
            | Low Inventory Alert Interval (Depot)  | 0      | Numberinput |
            | Low Inventory Alert Interval (Depot)  | 4000   | Numberinput |
            | Low Inventory Alert Threshold (Site)  | 0      | Numberinput |
            | Low Inventory Alert Threshold (Site)  | 100000 | Numberinput |

    @Draft @Phase2
    # This scenario will test that when User clicks in the Initial Order on Patient Status dropdown following option is displayed
    Scenario: With "Unified" study type selected, User clicks in the Initial Order on Patient Status dropdown following Options is displayed in the field
        Given I have selected "Unified" study type
        And I navigate to "StudySettings" page
        And I click on "General" link under "IRT" CategoryType on the left pane
        When I click in the "Initial Order on Patient Status" dropdown
        Then "Screened,Screen Failed,Enrolled,Early Withdrawal,Treatment Completed,Provided Written Consent,Retest,Completed,Discontinued,Randomization Ineligibility,Removed" is displayed in the "Initial Order on Patient Status" dropdown

    @Draft @Phase2
    # This scenario will test that when User clicks in the Initial Order on Patient Status dropdown following option is displayed
    Scenario: With "Unified" study type selected, User clicks in the Randomization Questiondropdown following Options is displayed in the field
        Given I have selected "Unified" study type
        And I navigate to "StudySettings" page
        And I click on "General" link under "IRT" CategoryType on the left pane
        When I click in the "Randomization Question" dropdown
        Then "" is displayed in the "Randomization Question" dropdown


    @Draft @Phase2
    # This scenario will test that when Users do not enter value in the MandatoryFields then Mandatoryfields are highlighted and error message is displayed
    Scenario: With "Unified" Study Type selected, MandatoryFields are highlighted when Users do not enter value in the MandaroeyFields and an error message is displayed
        Given I have selected "Unified" StudyType
        And I navigate to "StudySettings" page
        And I click on "Alert" link under "IRT" CategoryType on the left pane
        When I click on "SAVE CHANGES" button
        Then "Alert: Please address all highlighted fields" is displayed
        And the following Fields are highlighted
            | Fields                                 | Fieldtype   |
            | Lot Expiration Alert Threshold (Depot) | Numberinput |
            | Lot Expiration Alert Threshold (Site)  | Numberinput |
            | Low Inventory Alert Threshold (Depot)  | Numberinput |
            | Low Inventory Alert Interval (Depot)   | Numberinput |
            | Low Inventory Alert Threshold (Site)   | Numberinput |
            | Low Inventory Alert Interval (Site)    | Numberinput |


