Feature:Language Feature File

    I want to add Languages to a Study
    So that I can configure a study with multiple Languages

    
    #1
    # This scenario will test that when user navigates to Language page appropriate fields should be displayed
    Scenario: With "Unified" Study type selected, Appropriate fields should be displayed when the user navigates to "Language" page
        Given I select "Unified" Study type
        When I navigate to "Languages" page
        Then page displays following data
            | Label        | Fieldtype    | Defaultvalue | Enabled | Placeholder       |
            | Language     | Dropdown     |              | True    | Please Select     |
            | Display Name | Inputtextbox |              | True    | Max 60 Characters |
            | Default      | Togglebutton | False        | True    |                   |
        And "Culture Code" label is displayed
        And "LANGUAGES" Title is displayed
        And "= MANDATORY" text is displayed
        And asterisk symbol is displayed for "= MANDATORY"
        And "Cancel" icon button is displayed
        And "Add" icon button is displayed
        And Information icon is displayed for "Display Name" Label
        And Information icon is displayed for "Default" Label

    
    #2
    # This scenario will test when user clicks Language Dropdown, then English (United States) should not appear in the Language dropdown
    Scenario: With "Unified" Study Type selected, when user clicks Language Dropdown, then English (United States) should not appear in the Language dropdown
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        When I select "Language" dropdown
        Then "English (United States)" is not displayed in "Language" dropdown

    
    #3
    # This scenario will test that when user navigates to Language page appropriate fields should be displayed
    Scenario: With "Unified" Study Type selected, when user navigates to Language page appropriate fields should be displayed
        Given I select "Unified" Study type
        When I navigate to "Languages" page
        Then Language Grid contains the following data
            | Language                | Culture Code | Display Name            | Default | Translation Approved | Right to Left | Countries |
            | English (United States) | en-US        | English (United States) | true    | false                | Off           | US        |
        And "Edit icon" button is displayed for "English (United States)" in grid
        And "Delete icon" button is displayed for "English (United States)" in grid


    
    #4
    # This scenario will test that data in the fields should be reset when user selects a new Language from the dropdown
    Scenario: With "Unified" Study Type selected, when user selects a new Language the data in the field should be reset
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I select "Spanish (Mexico)" from "Language" dropdown
        And "es-MX" is displayed for "Culture Code"
        And "Spanish (Mexico)" is displayed for "Display Name"
        When I select "Arabic (Saudi Arabia)" from "Language" dropdown
        Then "ar-SA" is displayed for "Culture Code"
        And "Arabic (Saudi Arabia)" is displayed for "Display Name"

    
    #5
    # This scenario will test that "Culture Code" and "Display Name" field is auto populated based on the Language selection
    Scenario: With "Unified" Study Type selected, "Culture Code" and "Display Name" field should get populated once the user selects a Language from the Language dropdown
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        When I select "Spanish (Mexico)" from "Language" dropdown
        Then "es-MX" is displayed for "Culture Code"
        And "Spanish (Mexico)" is displayed for "Display Name"

    
    #6
    # This scenario will test that Placeholder text is displayed once the user clicks CANCEL button after selecting a Language from the Language Dropdown
    Scenario: With "Unified" Study Type selected, Placeholder text is displayed once the user clicks CANCEL button after selecting a Language from the "Language" Dropdown
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I select "Spanish (Mexico)" from "Language" dropdown
        When I click "Cancel" icon button
        Then page displays following data
            | Label    | Fieldtype | Defaultvalue | Enabled | Placeholder   |
            | Language | Dropdown  |              | True    | Please Select |

    
    #7
    # This scenario will test that when Users do not enter value in the Mandatory Field then MandatoryFields are highlighted and error message is displayed
    Scenario Outline: With "Unified" Study Type selected, MandatoryFields are highlighted when Users do not enter value in the MandatoryFields and an error message is displayed
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        When I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is displayed
        And "<MandatoryFields>" field is highlighted
        Examples:
            | MandatoryFields |
            | Language        |
            | Display Name    |

    
    #8
    # This scenario will test that user is able to enter text in the "Display Name" field
    Scenario: With "Unified" Study Type selected,User should be able to enter text in "Display Name" field
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I select "Spanish (Mexico)" from "Language" dropdown
        And "Spanish (Mexico)" is displayed for "Display Name"
        And I enter "Spanish (Mexico) SM" for "Display Name" text
        When I click "Add" icon button
        Then Language Grid contains the following data
            | Language         | Culture Code | Display Name        | Default | Translation Approved | Right to Left | Countries |
            | Spanish (Mexico) | es-MX        | Spanish (Mexico) SM | false   | false                | Off           |           |

    
    #9
    # This scenario will test that when Users enter value in the Mandatory Field then MandatoryFields are not highlighted and error message disppears
    Scenario: With "Unified" Study Type selected, MandatoryFields are not highlighted and error message disppears
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        When I select "Italian (Italy)" from "Language" dropdown
        And "Italian (Italy)" is displayed for "Display Name"
        And I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is not displayed
        And "Language" field is not highlighted
        And "Display Name" field is not highlighted

    
    #10
    # This scenario will test that when Language is added to the Langauge Grid and Default toggle is enabled Confirmation pop up is displayed
    Scenario: With "Unified" Study Type selected, When Default Togglebutton is set to True then Confirmation pop-up should be displayed
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I select "Greek (Greece)" from "Language" dropdown
        And "el-GR" is displayed for "Culture Code"
        And "Greek (Greece)" is displayed for "Display Name"
        And I click on the "Default" Togglebutton
        And Confirmation pop-up with message "English (United States) is currently set as default. Would you like to replace the default Language?" is displayed
        And I click "Yes" button on Confirmation pop-up with message "English (United States) is currently set as default. Would you like to replace the default Language?"
        When I click "Add" icon button
        Then "Language successfully added" snackbar "info" is displayed
        And Language Grid contains the following data
            | Language       | Culture Code | Display Name   | Default | Translation Approved | Right to Left | Countries |
            | Greek (Greece) | el-GR        | Greek (Greece) | true    | false                | Off           |           |
        And "Greek (Greece)" row is the only row that has "Default" set to "true" in the "Language" grid

    
    #11
    # This scenario will test when user adds a Language, then the Language that is added should not appear in the Language dropdown
    Scenario: With "Unified" Study Type selected, when user adds a Language, then the Language that is added should not appear in the Language dropdown
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I select "French (France)" from "Language" dropdown
        And "French (France)" is displayed for "Display Name"
        And I click "Add" icon button
        And "Language successfully added" snackbar "info" is displayed
        And Language Grid contains the following data
            | Language        | Culture Code | Display Name    | Default | Translation Approved | Right to Left | Countries |
            | French (France) | fr-FR        | French (France) | false   | false                | Off           |           |
        When I select "Language" dropdown
        Then "French (France)" is not displayed in "Language" dropdown

    
    #12
    # This scenario will test that when user hover over the Information Icon text should be displayed
    Scenario Outline: With "Unified" Study type selected , when users hover over "Information Icon" near the "<Field>" then text should be displayed
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        When I hover over the "info" icon near "<Field>"
        Then "<Text>" should be displayed for "<Field>"
        Examples:
            | Field        | Text                                                     |
            | Display Name | This will be displayed to user when selecting a language |
            | Default      | This is the Study Builder default Language               |

    
    #13
    # This scenario will test that when user clicks NO Delete Icon Confirmation pop-up should be displayed
    Scenario: With "Unified" Study Type selected, when user clicks "NO" Delete Icon Confirmation pop-up then Confirmation pop-up should disappear and user should remain in the Language page
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I click "Delete icon" button for row "French (France)"
        When I click "No" button on Confirmation pop-up with message "The Language will be deleted from this study. Are you sure you want to delete?"
        Then Language Grid contains the following data
            | Language        | Culture Code | Display Name    | Default | Translation Approved | Right to Left | Countries |
            | French (France) | fr-FR        | French (France) | false   | false                | Off           |           |

    
    #14
    # This scenario will test that when user clicks YES on Delete Icon Confirmation pop-up
    Scenario: With "Unified" Study Type selected, when user clicks YES on the Delete Icon COnfirmation pop up then Confirmation pop-up should disappear and language should be deleted from the Language Grid
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I click "Delete icon" button for row "French (France)"
        When I click "Yes" button on Confirmation pop-up with message "The Language will be deleted from this study. Are you sure you want to delete?"
        Then row "French (France)" is not displayed in the grid
        And "French (France)" is displayed in "Language" dropdown

    
    #15
    # This scenario will test that user should not be able to delete default Language
    Scenario: With "Unified" Study Type selected, when user should not be able to delete default Language
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And Language Grid contains the following data
            | Language       | Culture Code | Display Name   | Default | Translation Approved | Right to Left | Countries |
            | Greek (Greece) | el-GR        | Greek (Greece) | true    | false                | Off           |           |
        And the "Delete icon" button should be disabled in the row that contains "el-GR" in the "Culture code" column
        When I hover mouse over "Delete icon" button for "Greek (Greece)" row in the Langauge Grid
        Then "Greek (Greece) is currently set as default. To delete please select another default language." tooltip should be displayed


    
    #16
    # This scenario will test that if Countries are associated with a Language then Pop-up should be displayed when deleting the Language
    Scenario: With "Unified" Study Type selected, when user clicks Delete Icon on the Langauge Grid if Countries are associated to the Language
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And  Language Grid contains the following data
            | Language                | Culture Code | Display Name            | Default | Translation Approved | Right to Left | Countries |
            | English (United States) | en-US        | English (United States) | false   | false                | Off           | US        |
        When I hover mouse over "Delete icon" button for "English (United States)" row in the Langauge Grid
        Then "This Language is associated with a Country. Please update Countries before deleting this Language." tooltip should be displayed

    
    #17
    # This scenario will test that when user hover over a row in the grid the row should be highlighted
    Scenario: With "Unified" study type selected, when user hover over a row in the grid the row should be highlighted
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And Language Grid contains the following data
            | Language         | Culture Code | Display Name        | Default | Translation Approved | Right to Left | Countries |
            | Spanish (Mexico) | es-MX        | Spanish (Mexico) SM | false   | false                | Off           |           |
        When I hover mouse over "Spanish (Mexico)" row in the "Language" grid
        Then "Spanish (Mexico)" row is highlighted


    
    #18
    # This scenario will test that when user clicks EDIT button CANCEL and SAVE CHANGES button should be displayed
    Scenario: With "Unified" Study Type selected, when user clicks EDIT button "CANCEL" and "SAVE CHANGES" button should be displayed
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        When I click "Edit icon" button for row "Spanish (Mexico)"
        Then following data is enabled for language "Spanish (Mexico)"
            | Label                |
            | Display Name         |
            | Default              |
            | Translation Approved |
        And "Cancel icon" button is displayed for language "Spanish (Mexico)"
        And "Save changes icon" button is displayed for language "Spanish (Mexico)"


    
    #19
    # This scenario will test that when user deselects a default Language snackbar error is displayed
    Scenario: With "Unified" Study Type selected, when user deselects a default Language snackbar error is displayed
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I click "Edit icon" button for row "Greek (Greece)"
        And I click on the "Default" Togglebutton for row "Greek (Greece)"
        And "Language requires a default. Please select another language to make default." snackbar "error" is displayed
        When I click "Cancel icon" button for row "Greek (Greece)"
        Then Language Grid contains the following data
            | Language       | Culture Code | Display Name   | Default | Translation Approved | Right to Left | Countries |
            | Greek (Greece) | el-GR        | Greek (Greece) | true    | false                | Off           |           |

    
    #20
    # This scenario will test that Language should be added in alphabetic order
    Scenario: With "Unified" Study Type selected, Language is added in alphabetic order
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I select "German (Germany)" from "Language" dropdown
        And I click "Add" icon button
        And I select "Arabic (Saudi Arabia)" from "Language" dropdown
        When I click "Add" icon button
        Then grid data is sorted by following
            | Language                |
            | Arabic (Saudi Arabia)   |
            | English (United States) |
            | German (Germany)        |
            | Greek (Greece)          |
            | Italian (Italy)         |
            | Spanish (Mexico)        |

    
    #21
    # This scenario will test that when user clicks CANCEL button the Display name is not updated
    Scenario: With "Unified" Study Type selected, when user clicks "CANCEL" button the Display name is not updated
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I click "Edit icon" button for row "Spanish (Mexico)"
        And I enter "Spanish (Mexico)" into "Display Name" for row "Spanish (Mexico)"
        When I click "Cancel icon" button for row "Spanish (Mexico)"
        Then Language Grid contains the following data
            | Language         | Culture Code | Display Name        | Default | Translation Approved | Right to Left | Countries |
            | Spanish (Mexico) | es-MX        | Spanish (Mexico) SM | false   | false                | Off           |           |

    
    #22
    # This scenario will test that when user clicks the SAVE CHANGES button on the Language Grid then the user should be able save the edited field
    Scenario: With "Unified" Study Type selected, when user clicks "SAVE CHANGES" on the Language Grid then the Language should be added and message should be displayed
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I click "Edit icon" button for row "Spanish (Mexico)"
        And I enter "Spanish (Mexico)" into "Display Name" for row "Spanish (Mexico)"
        When I click "Save changes icon" button for row "Spanish (Mexico)"
        Then "Changes successfully saved" snackbar "info" is displayed
        And Language Grid contains the following data
            | Language         | Culture Code | Display Name     | Default | Translation Approved | Right to Left | Countries |
            | Spanish (Mexico) | es-MX        | Spanish (Mexico) | false   | false                | Off           |           |

    
    #23
    # This scenario will test that when users click No on the Confirmation pop-up, then language with Default set to True should be only Language that is set as Default Language
    Scenario: With "Unified" Study Type selected, when user clicks "NO" on the Confirmation pop-up then previously enetred Language should be the only Default Language
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I click "Edit icon" button for row "Spanish (Mexico)"
        And I click on the "Default" Togglebutton for row "Spanish (Mexico)"
        When I click "No" button on Confirmation pop-up with message "Greek (Greece) is currently set as default. Would you like to replace the default Language?"
        And I click "Cancel icon" button for row "Spanish (Mexico)"
        Then "Greek (Greece)" row is the only row that has "Default" set to "true" in the "Language" grid

    
    #24
    # This scenario will test that when users click Yes on the Confirmation pop-up, then language with Default set to True should be the only Default Language
    Scenario: With "Unified" Study Type selected, when user clicks "Yes" on the Confirmation pop-up then Default Language that is set to True should be the only Default Language
        Given I select "Unified" Study type
        And I navigate to "Languages" page
        And I click "Edit icon" button for row "Spanish (Mexico)"
        And I click on the "Default" Togglebutton for row "Spanish (Mexico)"
        When I click "Yes" button on Confirmation pop-up with message "Greek (Greece) is currently set as default. Would you like to replace the default Language?"
        And I click "Save changes icon" button for row "Spanish (Mexico)"
        Then "Changes successfully saved" snackbar "info" is displayed
        And "Spanish (Mexico)" row is the only row that has "Default" set to "true" in the "Language" grid