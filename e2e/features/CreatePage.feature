@createpage
Feature: Add a New Page
  As a User,
  I want to configure a Page
  so that I can add a Page to a questionnaire

  #PBI 50126 - Create Page

  @Draft
  Background: Confirmation pop-up is displayed when save a questionnaire for "Unified" study type
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button on the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Subject" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value         | FieldType    |
      | What is the Internal questionnaire name | Morning_Diary | Inputtextbox |
      | What is the questionnaire display name  | Morning Diary | Inputtextbox |
    And I click on "SAVE CHANGES" button
    And Confirmation pop-up with a message "Questionnaire added. Would you like to add pages now?" is displayed

  @Draft
  # This scenario will test that New Page button is displayed on the left pane for a questionnaire when click "Yes" on the Confirmation pop-up
  Scenario: New Page button is displayed on the left pane for a questionnaire when click "Yes" on the Confirmation pop-up
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    When I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    Then questionnaire "Morning_Diary" is added on the left pane
    And left pane is disabled
    And "NEW PAGE" button is displayed for questionnaire "Morning_Diary" on the left pane
    And middle pane displays
      | Label                          | Fieldtype    | Defaultvalue | Enabled | Placeholder       |
      | What is the Internal page name | Inputtextbox |              | True    | Max 60 Characters |
      | What is the page display name  | Inputtextbox |              | True    | Max 60 Characters |
      | What is the footer text        | Inputtextbox |              | True    | Max 60 Characters |
      | Display page name on Screen    | Togglebutton | False        | True    |                   |
      | Enable "scroll for more"       | Togglebutton | False        | True    |                   |
    And "PAGE INFORMATION" Title is displayed
    And "= MANDATORY" text is displayed
    And asterisk symbol is displayed for "= MANDATORY"
    And "CANCEL" button is displayed
    And "SAVE CHANGES" button is displayed
    And "Translation icon" is displayed
    And right pane is blank

  @Draft
  # This scenario will test that New Page button is displayed on the left pane for a questionnaire when click "No" on the Confirmation pop-up
  Scenario: New Page button is displayed on the left pane for a questionnaire when click "No" on the Confirmation pop-up
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    When I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    Then questionnaire "Morning_Diary" is added on the left pane
    And left pane is enabled
    And "NEW PAGE" button is displayed for questionnaire "Morning_Diary" on the left pane
    And middle pane is blank

  @Draft
  # This scenario will test that Clicking on "NEW PAGE" button for a questionnaire displays the customization fields to create new page
  Scenario: Clicking on "NEW PAGE" button for a questionnaire displays the customization fields to create new page
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is enabled
    And questionnaire "Morning_Diary" is added on the left pane
    When I click "NEW PAGE" button for questionnaire "Morning_Diary" on the left pane
    Then middle pane displays
      | Label                          | Fieldtype    | Defaultvalue | Enabled | Placeholder       |
      | What is the Internal page name | Inputtextbox |              | True    | Max 60 Characters |
      | What is the page display name  | Inputtextbox |              | True    | Max 60 Characters |
      | What is the footer text        | Inputtextbox |              | True    | Max 60 Characters |
      | Display page name on Screen    | Togglebutton | False        | True    |                   |
      | Enable "scroll for more"       | Togglebutton | False        | True    |                   |
    And "PAGE INFORMATION" Title is displayed
    And "= MANDATORY" text is displayed
    And asterisk symbol is displayed for "= MANDATORY"
    And "CANCEL" button is displayed
    And "SAVE CHANGES" button is displayed
    And "Translation icon" is displayed
    And right pane is blank

  @Draft
  # This scenario will test that when enter Internal page name, the Internal page name will also display in page display name
  Scenario: when enter Internal page name, the Internal page name will also display in page display name
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is enabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I click "NEW PAGE" button for the questionnaire "Morning_Diary" on the left pane
    When I enter following data
      | Label                          | Value                                                        | FieldType    |
      | What is the Internal page name | Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1 | Inputtextbox |
    Then "Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1" is displayed for "What is the page display name"

  @Draft
  # This scenario will test that Internal page name is not changed when edit page display name
  Scenario: Internal page name is not changed when edit page display name
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is enabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I click "NEW PAGE" button for the questionnaire "Morning_Diary" on the left pane
    And I enter following data
      | Label                          | Value                                                        | FieldType    |
      | What is the Internal page name | Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1 | Inputtextbox |
    And "Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1" is displayed for "What is the page display name"
    And I click on "What is the page display name"
    And "Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1" is displayed in Rich Text Editor on the right pane
    When I enter following data
      | Label                         | Value             | FieldType    |
      | What is the page display name | Daily_Diary_Entry | Inputtextbox |
    Then "Daily_Diary_Entry" is displayed for "What is the page display name"
    And "Daily_Diary_Entry" is displayed in Rich Text Editor on the right pane
    And "Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1" is displayed for "What is the Internal page name"

  @Draft
  # This scenario will test that Inputtextbox accepts upto 60 characters when user tried to enter more than "60" characters
  Scenario: Inputtextbox displays only "60" characters when user tried to enter more than "60" characters
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And questionnaire "Morning_Diary" is added on the left pane
    And I click "NEW PAGE" button for the questionnaire "Morning_Diary" on the left pane
    When I enter following data
      | Label                          | Value                                                             | FieldType    |
      | What is the Internal page name | Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1Diary | Inputtextbox |
      | What is the footer text        | Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1Diary | Inputtextbox |
    Then "Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1" is displayed for "What is the Internal page name"
    And "Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1" is displayed for "What is the page display name"
    And "Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1" is displayed for "What is the footer text"

  @Draft
  # This scenario will test that Rich Text Editor is displayed on the right pane when click on What is the page display name
  Scenario: Rich Text Editor is displayed on the right pane when Click on "What is the page display name"
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I enter following data
      | Label                         | Value            | FieldType    |
      | What is the page display name | Daily_Diary_page | Inputtextbox |
    When I enter following data
      | Label                          | Value     | FieldType    |
      | What is the Internal page name | Test Page | Inputtextbox |
    Then "Test Page" is displayed for "What is the Internal page name"
    And "Daily_Diary_page" is displayed for "What is the page display name"

  @Draft
  # This scenario will test that page display name does not get overwritten once internal page name is given
  Scenario: page display name does not get overwritten once internal page name is given
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    When I enter following data
      | Label                         | Value            | FieldType    |
      | What is the page display name | Daily_Diary_page | Inputtextbox |
    Then Rich Text Editor is displayed on the right pane with text "Daily_Diary_page"

  @Draft
  # This scenario will test that Error message is displayed when click "Yes" on Confirmation pop-up and click "SAVE CHANGES" button when no selection is made
  Scenario: Error message is displayed when click "Yes" on Confirmation pop-up and click "SAVE CHANGES" button when no selection is made
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    When I click on "SAVE CHANGES" button
    Then "ALERT: Please address all highlighted fields" text is displayed
    And "What is the Internal page name" field is highlighted
    And "What is the page display name" field is highlighted

  @Draft
  # This scenario will test that Error message is displayed when click "No" on Confirmation pop-up and click "SAVE CHANGES" button when no selection is made
  Scenario: Error message is displayed when click "No" on Confirmation pop-up and click "SAVE CHANGES" button when no selection is made
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is enabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I click "NEW PAGE" button for the questionnaire "Morning_Diary" on the left pane
    When I click on "SAVE CHANGES" button
    Then "ALERT: Please address all highlighted fields" text is displayed
    And "What is the Internal page name" field is highlighted
    And "What is the page display name" field is highlighted

  @Draft
  # This scenario will test that Confirmation pop-up is displayed when click on CANCEL button when no selection is made
  Scenario: Confirmation pop-up is displayed when click on "CANCEL" button when no selection is made
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is enabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I click "NEW PAGE" button for the questionnaire "Morning_Diary" on the left pane
    When I click on "CANCEL" button
    Then Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data." is displayed

  @Draft
  # This scenario will test that Click Yes on Confirmation pop-up for CANCEL button when no selection is made
  Scenario: Click Yes on Confirmation pop-up for CANCEL button when no selection is made
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is enabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I click "NEW PAGE" button for the questionnaire "Morning_Diary" on the left pane
    And I click on "CANCEL" button
    When I click "Yes" button on the Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data."
    Then Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data." is not displayed
    And left pane is enabled
    And middle pane is blank

  @Draft
  # This scenario will test that Click No on Confirmation pop-up for CANCEL button when no selection is made
  Scenario: Click No on Confirmation pop-up for CANCEL button when no selection is made
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is enabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I click "NEW PAGE" button for the questionnaire "Morning_Diary" on the left pane
    And I click on "CANCEL" button
    And Confirmation pop-up "You have unsaved changes. Are you sure you want to leave? You will lose all current data." is displayed
    When I click "No" button on the Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data."
    Then Confirmation pop-up "You have unsaved changes. Are you sure you want to leave? You will lose all current data." is not displayed
    And left pane is disabled
    And middle pane displays
      | Label                          | Fieldtype    | Defaultvalue | Enabled | Placeholder       |
      | What is the Internal page name | Inputtextbox |              | True    | Max 60 Characters |
      | What is the page display name  | Inputtextbox |              | True    | Max 60 Characters |
      | What is the footer text        | Inputtextbox |              | True    | Max 60 Characters |
      | Display page name on Screen    | Togglebutton | False        | True    |                   |
      | Enable "scroll for more"       | Togglebutton | False        | True    |                   |
    And right pane is blank

  @Draft
  # This scenario will test that Confirmation pop-up is displayed when all mandatory fields are complete and click "SAVE CHANGES" button
  Scenario: Confirmation pop-up is displayed when all mandatory fields are complete and click "SAVE CHANGES" button
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I enter following data
      | Label                          | Value             | FieldType    |
      | What is the Internal page name | Daily_Diary_Entry | Inputtextbox |
    When I click on "SAVE CHANGES" button
    Then Confirmation pop-up with message "Page added. Would you like to add questions now?" is displayed

  @Draft
  # This scenario will test that Page is added for questionnaire when click Yes on the Confirmation pop-up
  Scenario: Page is added for questionnaire when click Yes on the Confirmation pop-up
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I enter following data
      | Label                          | Value             | FieldType    |
      | What is the Internal page name | Daily_Diary_Entry | Inputtextbox |
      | What is the footer text        | Daily_Diary_Entry | Inputtextbox |
    And I Toggle
      | Label                       | Value |
      | Display page name on screen | True  |
      | Enable "scroll for more"    | True  |
    And I click on "SAVE CHANGES" button
    When I click "Yes" on the Confirmation pop-up with message "Page added. Would you like to add questions now?"
    Then Confirmation pop-up with message "Page added. Would you like to add questions now?" is not displayed
    And left pane is disabled
    And page "Daily_Diary_Entry" is added for questionnaire "Morning_Diary" on the left pane
    And "QUESTION INFORMATION" Title is displayed on the middle pane

  @Draft
  # This scenario will test that Page is added for questionnaire when click No on the Confirmation pop-up
  Scenario: Page is added for questionnaire when click No on the Confirmation pop-up
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I enter following data
      | Label                          | Value       | FieldType    |
      | What is the Internal page name | Daily_Diary | Inputtextbox |
      | What is the footer text        | Daily_Diary | Inputtextbox |
    And I Toggle
      | Label                       | Value |
      | Display page name on screen | True  |
      | Enable "scroll for more"    | False |
    And I click on "SAVE CHANGES" button
    When I click "No" on the Confirmation pop-up with message "Page added. Would you like to add questions now?"
    Then Confirmation pop-up with message "Page added. Would you like to add questions now?" is not displayed
    And left pane is enabled
    And page "Daily_Diary" is added for questionnaire "Morning_Diary" on the left pane
    And middle pane is blank

  @Draft
  # This scenario will test that Clicking on the page name displays the page information that is saved
  Scenario: Clicking on the page name displays the page information that is saved
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I enter following data
      | Label                          | Value              | FieldType    |
      | What is the Internal page name | Daily_Diary_Page@1 | Inputtextbox |
      | What is the footer text        | Daily_Diary_Page@1 | Inputtextbox |
    And I Toggle
      | Label                       | Value |
      | Display page name on screen | True  |
      | Enable "scroll for more"    | True  |
    And I click on "SAVE CHANGES" button
    And I click "No" on the Confirmation pop-up with message "Page added. Would you like to add questions now?"
    And page "Daily_Diary_Page" is added for questionnaire "Morning_Diary" on the left pane
    When I click page "Daily_Diary_Page" on the left pane
    Then middle pane displays
      | Label                          | Value              | FieldType    |
      | What is the Internal page name | Daily_Diary_Page@1 | Inputtextbox |
      | What is the page display name  | Daily_Diary_Page@1 | Inputtextbox |
      | What is the footer text        | Daily_Diary_Page@1 | Inputtextbox |
    And "Display page name on screen" Togglebutton is "True"
    And "Enable "scroll for more" Togglebutton is "True"

  @Draft
  # This scenario will test that Confirmation pop-up is displayed when click on CANCEL button before saving the page
  Scenario: Confirmation pop-up is displayed when click on CANCEL button before saving the page
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I enter following data
      | Label                          | Value      | FieldType    |
      | What is the Internal page name | Diary_Page | Inputtextbox |
      | What is the footer text        | Diary Page | Inputtextbox |
    And I click on "CANCEL" button
    Then Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data." is displayed

  @Draft
  # This scenario will test that Page displays data entered when Click No on the Confirmation pop-up for CANCEL button
  Scenario: Page displays data entered when Click No on the Confirmation pop-up for CANCEL button
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I enter following data
      | Label                          | Value       | FieldType    |
      | What is the Internal page name | Daily_Diary | Inputtextbox |
      | What is the footer text        | Daily_Diary | Inputtextbox |
    And I click on "CANCEL" button
    And Confirmation pop-up is displayed
    When I click "No" on the Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data."
    Then Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data." is not displayed
    And middle pane displays following data
      | Label                          | Value       | FieldType    |
      | What is the Internal page name | Daily_Diary | Inputtextbox |
      | What is the page display name  | Daily_Diary | Inputtextbox |
      | What is the footer text        | Daily_Diary | Inputtextbox |

  @Draft
  # This scenario will test that Page is not saved when Click Yes on the Confirmation pop-up for CANCEL button
  Scenario: Page is not saved when Click Yes on the Confirmation pop-up for CANCEL button
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I enter following data
      | Label                          | Value       | FieldType    |
      | What is the Internal page name | Daily_Diary | Inputtextbox |
      | What is the footer text        | Daily_Diary | Inputtextbox |
    And I click on "CANCEL" button
    And Confirmation pop-up is displayed
    When I click "Yes" on the Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data."
    Then Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data." is not displayed
    And page "Daily_Diary" is not displayed for questionnaire "Morning_Diary" on the left pane
    And middle pane is blank
    And left pane is enabled

  @Draft
  # This scenario will test that Error message is displayed when Internal page name is not unique
  Scenario Outline: Error message is displayed when Internal page name is not unique
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I enter following data
      | Label                          | Value             | FieldType    |
      | What is the Internal page name | Daily_Diary_Page1 | Inputtextbox |
      | What is the footer text        | Daily_Diary_Page1 | Inputtextbox |
    And I Toggle
      | Label                       | Value |
      | Display page name on screen | True  |
      | Enable "scroll for more"    | True  |
    And I click on "SAVE CHANGES" button
    When I click "No" on the Confirmation pop-up with message "Page added. Would you like to add questions now?"
    And page "Daily_Diary_Page1" is added for questionnaire "Morning_Diary" on the left pane
    And I click "NEW PAGE" button on the left pane
    And I enter "<Value>" in "<FieldType>" for "What is the Internal page name"
    When I click on "What is the footer text"
    Then "Internal name must be unique" text is displayed for "What is the Internal page name"
    And "What is the Internal page name" field is highlighted

    Examples:
      | Value             | FieldType    |
      | Daily_Diary_Page1 | Inputtextbox |
      | DAILY_DIARY_PAGE1 | Inputtextbox |


  @Draft
  # This scenario will test that Page is successfully saved with unique Internal page name
  Scenario: Page is successfully saved with unique Internal page name
    Given user is on Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And left pane is disabled
    And questionnaire "Morning_Diary" is added on the left pane
    And I enter following data
      | Label                          | Value             | FieldType    |
      | What is the Internal page name | Daily_Diary_Page1 | Inputtextbox |
      | What is the footer text        | Daily_Diary_Page1 | Inputtextbox |
    And I Toggle
      | Label                       | Value |
      | Display page name on screen | True  |
      | Enable "scroll for more"    | True  |
    And I click on "SAVE CHANGES" button
    And I click "Yes" on the Confirmation pop-up with message "Page added. Would you like to add questions now?"
    And page "Daily_Diary_Page1" is added for questionnaire "Morning_Diary" on the left pane
    And I enter following data
      | Label                          | Value             | FieldType    |
      | What is the Internal page name | Daily_Diary_Page1 | Inputtextbox |
    And I click on "What is the footer text"
    And "Internal name must be unique" text is displayed for "What is the Internal page name"
    And I enter following data
      | Label                          | Value             | FieldType    |
      | What is the Internal page name | Daily_Diary_Page2 | Inputtextbox |
    And I click on "What is the footer text"
    And "Internal name must be unique" text is not displayed
    And "What is the Internal page name" field is not highlighted
    And I click "SAVE CHANGES" button
    When I click "No" button on the Confirmation pop-up with message "Page added. Would you like to add questions now?"
    Then Confirmation pop-up with message "Page added. Would you like to add questions now?" is not displayed
    And page "Daily_Diary_Page2" is added for the questionnaire "Morning_Diary" on the left pane
    And middle pane is blank
    And left pane is enabled
