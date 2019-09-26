@createquestionnairevalidation
Feature: Create Questionnaire
  As a User,
  I want to configure a questionnaire
  so that I can add a questionnaire to a study

  #PBI 50429 - Create Questionnaire - Validation

  # Unified only - This scenario will test that middle pane is blank and left pane is enabled upon clicking CANCEL button when no selection is made
  Scenario: middle pane is blank and left pane is enabled upon clicking CANCEL button when no selection is made
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    When I click "CANCEL" button in the middle pane
    Then middle pane is blank
    And left pane is enabled

  # This scenario will test that Error message is displayed upon clicking SAVE CHANGES button when no selection is made for "<StudyType>" Study type
  Scenario Outline: Error message is displayed upon clicking SAVE CHANGES button when no selection is made for "<StudyType>" Study type
    Given user has selected "<StudyType>" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    When I click "SAVE CHANGES" button in the middle pane
    Then "ALERT: Please address all highlighted fields" text is displayed
    And "Where will this be used" field is highlighted

    Examples:
      | StudyType |
      | eCOA      |
      | Unified   |

  # Unified only - This scenario will test the functionality of the Togglebutton when "Tablet" option is selected
  Scenario: functionality of the Togglebutton when "Tablet" option is selected
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    And I select "Subject" from "Who will be completing this questionnaire" dropdown
    When I click on the "Training" Togglebutton
    And I click on the "Allow Blinded users access to view answers" Togglebutton
    And I click on the "Allow site user to review completed questionnaire" Togglebutton
    Then "Training" Togglebutton is "True"
    And "Allow Blinded users access to view answers" Togglebutton is "True"
    And "Allow site user to review completed questionnaire" Togglebutton is "True"

  # Unified only - This scenario will test that Togglebutton functionality works when select "Handheld" option
  Scenario: Togglebutton functionality works when select "Handheld" option
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Caregiver" from "Who will be completing this questionnaire" dropdown
    When I click on the "Training" Togglebutton
    And I click on the "Allow Blinded users access to view answers" Togglebutton
    And I click on the "Allow user to edit completed questionnaire responses" Togglebutton
    Then "Training" Togglebutton is "True"
    And "Allow Blinded users access to view answers" Togglebutton is "True"
    And "Allow user to edit completed questionnaire responses" Togglebutton is "True"
    And "Allow user to edit completed questionnaire responses" Numberinput is enabled

  # Unified only - This scenario will test that Inputtextbox accepts and displays upto 60 characters when user tried to enter more than 60 characters
  Scenario: Inputtextbox accepts and displays upto 60 characters when user tried to enter more than 60 characters
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    When I enter following data
      | Label                                   | Value                                                         | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1D | Inputtextbox |
      | What is the questionnaire display name  | Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1D | Inputtextbox |
    Then "Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1" is displayed for "What is the Internal questionnaire name"
    And "Daily_Diary_Entry@&1Daily_Diary_Entry@&1Daily_Diary_Entry@&1" is displayed for "What is the questionnaire display name"

  # Unified only - This scenario will test that user cannot input value less than 1 or decimals for Allow retrospective Entry
  Scenario Outline: User cannot input value less than 1 or decimals for Allow retrospective entry
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Caregiver" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value             | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Entry | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary       | Inputtextbox |
    When I enter "<Value>" for "Allow retrospective entry"
    Then "<Value>" is not displayed for "Allow retrospective entry"
    And "Force completion of missed entries" Togglebutton is disabled
    And "Force completion of missed entries" Togglebutton is "False"

    Examples:
      | Value |
      | .     |
      | 0     |
      | -     |
      | A     |
      | *     |


  @Draft
  # Unified only - This scenario will test that Force completion of missed entries can be enabled only when value is greater than 0 for Allow retrospective entry
  Scenario: Force completion of missed entries can be enabled only when value is greater than 0 for Allow retrospective entry
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Subject and/or Caregiver" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value             | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Entry | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary       | Inputtextbox |
      | Allow retrospective entry               | 1                 | Numberinput  |
    And "Force completion of missed entries" Togglebutton is "False"
    When I click on the "Force completion of missed entries" Togglebutton
    Then "Force completion of missed entries" Togglebutton is "True"


  # Unified only - This scenario will test that user cannot input value less than 1 or decimals for Allow user to edit completed questionnaire responses
  Scenario Outline: User cannot input value less than 1 or decimals for Allow user to edit completed questionnaire responses
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Subject" from "Who will be completing this questionnaire" dropdown
    And "Allow user to edit completed questionnaire responses" Togglebutton is "True"
    And I enter following data
      | Label                                   | Value             | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Entry | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary       | Inputtextbox |
    When I enter "<Value>" for "Allow user to edit completed questionnaire responses"
    Then "<Value>" is not displayed for "Allow user to edit completed questionnaire responses"

    Examples:
      | Value |
      | .     |
      | 0     |
      | -     |
      | A     |
      | *     |


  @Draft
  # Unified only - This scenario will test that value greater than 0 is accepted for Allow user to edit completed questionnaire responses
  Scenario: Value greater than 0 is accepted for Allow user to edit completed questionnaire responses
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Subject and/or Caregiver" from "Who will be completing this questionnaire" dropdown
    And "Allow user to edit completed questionnaire responses" Togglebutton is "True"
    And I enter following data
      | Label                                                | Value             | FieldType    |
      | What is the Internal questionnaire name              | Daily_Diary_Entry | Inputtextbox |
      | What is the questionnaire display name               | Daily Diary       | Inputtextbox |
      | Allow user to edit completed questionnaire responses | 1                 | Numberinput  |
    When I click "SAVE CHANGES" button
    Then Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?" is displayed


  # Unified only - This scenario will test that Value is cleared in the numberinput when Togglebutton is False for Allow user to edit complete questionnaire responses
  Scenario: Value is cleared in the numberinput when Togglebutton is False for Allow user to edit complete questionnaire responses
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Subject and/or Caregiver" from "Who will be completing this questionnaire" dropdown
    And "Allow user to edit completed questionnaire responses" Togglebutton is "True"
    And I enter following data
      | Label                                                | Value             | FieldType    |
      | What is the Internal questionnaire name              | Daily_Diary_Entry | Inputtextbox |
      | What is the questionnaire display name               | Daily Diary       | Inputtextbox |
      | Allow user to edit completed questionnaire responses | 1                 | Numberinput  |
    When I click on the "Allow user to edit completed questionnaire responses" Togglebutton
    Then "Allow user to edit completed questionnaire responses" Togglebutton is "False"
    And following is displayed
      | Label                                                | Value | FieldType   |
      | Allow user to edit completed questionnaire responses |       | Numberinput |

  @Draft
  # Unified only - This scenario will test that Radiobuttons are enabled when business rule is selected for "Questionnaire visible when" and "Questionnaire enabled when"
  Scenario: Radiobuttons are enabled when business rule is selected for "Questionnaire visible when" and "Questionnaire enabled when"
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    When I select "TEST" from "Questionnaire visible when" dropdown
    And I select "Test 2" from "Questionnaire enabled when" dropdown
    Then following is displayed on the form
      | Label                      | RadioButtonLabel | IsSelected | Enabled |
      | Questionnaire visible when | is True          | False      | True    |
      | Questionnaire visible when | is False         | False      | True    |
      | Questionnaire enabled when | is True          | False      | True    |
      | Questionnaire enabled when | is False         | False      | True    |


  # Unified only - This scenario will test that only either True or false can be selected at a time for the "Questionnaire visible when"
  Scenario: only either True or false can be selected at a time for the "Questionnaire visible when"
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "TEST" from "Questionnaire visible when" dropdown
    When I select "is True" for "Questionnaire visible when"
    And I select "is False" for "Questionnaire visible when"
    Then "is False" is selected for "Questionnaire visible when"

  @Draft
  # Unified only - This scenario will test that only either True or false can be selected for the "Questionnaire enabled when"
  Scenario: only either True or false can be selected for the "Questionnaire enabled when"
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "TEST" from "Questionnaire enabled when" dropdown
    When I select "is True" for "Questionnaire enabled when"
    And I select "is False" for "Questionnaire enabled when"
    Then "is False" is selected for "Questionnaire enabled when"

  @Draft
  # Unified only - This scenario will test that when business rule is "NULL", radiobutton selection gets cleared off
  Scenario: when business rule is "NULL", radiobutton selection gets cleared off for "Questionnaire visible when" and "Questionnaire enabled when"
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "TEST" from "Questionnaire visible when" dropdown
    And I select "is False" for "Questionnaire visible when"
    And I select "Test 2" from "Questionnaire enabled when" dropdown
    And I select "is True" for "Questionnaire enabled when"
    When I select "NULL" from "Questionnaire visible when" dropdown
    And I select "NULL" from "Questionnaire enabled when" dropdown
    Then "is False" is disabled for "Questionnaire visible when"
    And "is True" is disabled for "Questionnaire visible when"
    And "is True" is disabled for "Questionnaire enabled when"
    And "is False" is disabled for "Questionnaire enabled when"


  # Unified only - This scenario will test that Error message is displayed upon clicking SAVE CHANGES button when Mandatoryfield is not entered
  Scenario: Error message is displayed upon clicking SAVE CHANGES button when Mandatoryfield is not entered
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    When I click "SAVE CHANGES" button
    Then "ALERT: Please address all highlighted fields" text is displayed
    And "Who will be completing this questionnaire" field is highlighted
    And "What is the Internal questionnaire name" field is highlighted
    And "What is the questionnaire display name" field is highlighted


  # Unified only - This scenario will test that Error message is not displayed and field is not highlighted when mandatory fields are filled
  Scenario: Error message is not displayed and field is not highlighted when mandatory fields are filled
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    And I click "SAVE CHANGES" button
    When I select "Subject" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value              | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Entry2 | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary        | Inputtextbox |
    Then "ALERT: Please address all highlighted fields" is not displayed
    And "Who will be completing this questionnaire" field is not highlighted
    And "What is the Internal questionnaire name" field is not highlighted
    And "What is the questionnaire display name" field is not highlighted


  @Draft
  # Unified only - This scenario will test that Confirmation pop-up is displayed upon clicking CANCEL button before saving the questionnaire
  Scenario: Confirmation pop-up is displayed upon clicking CANCEL button before saving the questionnaire
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    And I enter following data
      | Label                                   | Value             | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Entry | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary       | Inputtextbox |
    And I click "CANCEL" button
    Then Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data." is displayed

  @Draft
  # Unified only - This scenario will test that Questionnaire displays data entered when Click No on the Confirmation pop-up for CANCEL button
  Scenario: Questionnaire displays data entered when Click No on the Confirmation pop-up for CANCEL button
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    And I enter following data
      | Label                                   | Value             | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Entry | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary       | Inputtextbox |
    And I toggle
      | Allow Blinded users access to view answers        | True |
      | Allow site user to review completed questionnaire | True |
    And I click "CANCEL" button
    When I click "No" on the Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data."
    Then Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data." disappears
    And middle pane displays following data
      | Label                                   | Value             | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Entry | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary       | Inputtextbox |
    And "Allow Blinded users access to view answers" Togglebutton is "True"
    And "Allow site user to review completed questionnaire" Togglebutton is "True"
    And "Tablet" is displayed in "Where will this be used" dropdown

  @Draft
  # Unified only - This scenario will test that Questionnaire is not saved when Click Yes on the Confirmation pop-up for CANCEL button
  Scenario: Questionnaire is not saved when Click Yes on the Confirmation pop-up for CANCEL button
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    And I enter following data
      | Label                                   | Value             | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Entry | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary       | Inputtextbox |
    And I click "CANCEL" button
    When I click "Yes" on the Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data."
    Then Confirmation pop-up with message "You have unsaved changes. Are you sure you want to leave? You will lose all current data." disappears
    And questionnaire "Daily_Diary_Entry" is not displayed on the left pane
    And middle pane is blank
    And left pane is enabled

  # Unified only - This scenario will test that Data entered or selected is lost when switch the option from "Where will this be used" dropdown
  Scenario: Data entered or selected is lost when switch the option from "Where will this be used" dropdown
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    And I select "Clinician" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value                | FieldType    |
      | What is the Internal questionnaire name | Tablet_Subject_Form2 | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary          | Inputtextbox |
    When I select "Handheld" from "Where will this be used" dropdown
    Then following data is not displayed
      | Label                                   | Value                | FieldType    |
      | What is the Internal questionnaire name | Tablet_Subject_Form2 | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary          | Inputtextbox |
    And "Clinician" is not displayed from "Who will be completing this questionnaire" dropdown

  @Draft
  # Unified only - This scenario will test that Confirmation pop-up is displayed when questionnaire is saved and when "Tablet" option is selected
  Scenario: Confirmation pop-up is displayed when questionnaire is saved and when "Tablet" option is selected
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    And I select "Clinician" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value                | FieldType    |
      | What is the Internal questionnaire name | Tablet_Subject_Form1 | Inputtextbox |
      | What is the questionnaire display name  | Subject Form1        | Inputtextbox |
    And I toggle
      | Allow Blinded users access to view answers        | True |
      | Allow site user to review completed questionnaire | True |
    When I click on "SAVE CHANGES" button
    Then Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?" is displayed

  @Draft
  # Unified only - This scenario will test that Questionnaire is saved when click No on the Confirmation pop-up and when "Tablet" option is selected
  Scenario: Questionnaire is saved when click No on the Confirmation pop-up and when "Tablet" option is selected
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    And I select "Clinician" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value                | FieldType    |
      | What is the Internal questionnaire name | Tablet_Subject_Form1 | Inputtextbox |
      | What is the questionnaire display name  | Subject Form1        | Inputtextbox |
    And I toggle
      | Allow Blinded users access to view answers        | True |
      | Allow site user to review completed questionnaire | True |
    And I click on "SAVE CHANGES" button
    When I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    Then Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?" disappears
    And left pane is enabled
    And questionnaire "Tablet_Subject_Form1" is added on the left pane
    And middle pane is blank

  @Draft
  # Unified only - This scenario will test that Questionnaire is saved when click Yes on the Confirmation pop-up and when "Tablet" option is selected
  Scenario: Questionnaire is saved when click Yes on the Confirmation pop-up and when "Tablet" option is selected
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    And I select "Clinician" from "Who will be completing this questionnaire" dropdown
    And I select "TEST" from "Questionnaire visible when" dropdown
    And I select "Test 2" from "Questionnaire enabled when" dropdown
    And I select "is True" for "Questionnaire visible when"
    And I select "is False" for "Questionnaire enabled when"
    And I enter following data
      | Label                                   | Value                | FieldType    |
      | What is the Internal questionnaire name | Tablet_Subject_Form2 | Inputtextbox |
      | What is the questionnaire display name  | Subject Form2        | Inputtextbox |
    And I toggle
      | Allow Blinded users access to view answers        | True |
      | Allow site user to review completed questionnaire | True |
    And I click on "SAVE CHANGES" button
    When I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    Then Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?" disappears
    And left pane is disabled
    And questionnaire "Tablet_Subject_Form2" is added on the left pane
    And "PAGE INFORMATION" Title is displayed on the middle pane

  @Draft
  # Unified only - This scenario will test that Confirmation pop-up is displayed when questionnaire is saved and when "Handheld" option is selected
  Scenario: Confirmation pop-up is displayed when questionnaire is saved and when "Handheld" option is selected
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Subject" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value      | FieldType    |
      | What is the Internal questionnaire name | DSIS       | Inputtextbox |
      | What is the questionnaire display name  | DSIS Form1 | Inputtextbox |
      | Allow retrospective entry               | 2          | Numberinput  |
    And I toggle
      | Force completion of missed entries                   | True |
      | Allow Blinded users access to view answers           | True |
      | Allow user to edit completed questionnaire responses | True |
    When I click on "SAVE CHANGES" button
    Then Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?" is displayed

  @Draft
  # Unified only - This scenario will test that Questionnaire is saved when click No on the Confirmation pop-up and when "Handheld" option is selected
  Scenario: Questionnaire is saved when click No on the Confirmation pop-up and when "Handheld" option is selected
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Caregiver" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value             | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Entry | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary       | Inputtextbox |
      | Allow retrospective entry               | 2                 | Numberinput  |
    And I toggle
      | Force completion of missed entries                   | True |
      | Allow Blinded users access to view answers           | True |
      | Allow user to edit completed questionnaire responses | True |
    And I click on "SAVE CHANGES" button
    When I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    Then Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?" disappears
    And left pane is enabled
    And questionnaire "Daily_Diary_Entry" is added on the left pane
    And middle pane is blank

  @Draft
  # Unified only - This scenario will test that Questionnaire is saved when click Yes on the Confirmation pop-up and when "Handheld" option is selected
  Scenario: Questionnaire is saved when click Yes on the Confirmation pop-up and when "Handheld" option is selected
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Caregiver" from "Who will be completing this questionnaire" dropdown
    And I select "TEST" from "Questionnaire visible when" dropdown
    And I select "Test 2" from "Questionnaire enabled when" dropdown
    And I select "is True" for "Questionnaire visible when"
    And I select "is False" for "Questionnaire enabled when"
    And I enter following data
      | Label                                   | Value | FieldType     |
      | What is the Internal questionnaire name | DSIS  | Inputetextbox |
      | What is the questionnaire display name  | DSIS  | Inputtextbox  |
      | Allow retrospective entry               | 1     | Numberinput   |
    And I toggle
      | Force completion of missed entries                   | True |
      | Allow Blinded users access to view answers           | True |
      | Allow user to edit completed questionnaire responses | True |
    And I click on "SAVE CHANGES" button
    When I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    Then Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?" disappears
    And left pane is disabled
    And questionnaire "DSIS" is added on the left pane
    And "PAGE INFORMATION" Title is displayed on the middle pane

  @Draft
  # Unified only - This scenario will test that Saved questionnaire information is displayed when click on questionnaire name
  Scenario: Saved questionnaire information is displayed when click on questionnaire name
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Caregiver" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value          | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Q1 | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary Q1 | Inputtextbox |
      | Allow retrospective entry               | 2              | Numberinput  |
    And I toggle
      | Force completion of missed entries                   | True |
      | Allow Blinded users access to view answers           | True |
      | Allow user to edit completed questionnaire responses | True |
    And I click on "SAVE CHANGES" button
    And I click "No" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And questionnaire "Daily_Diary_Q1" is added on the left pane
    When I click questionnaire "Daily_Diary_Q1" in the left pane
    Then middle pane displays
      | Label                                   | Value          | FieldType    |
      | What is the Internal questionnaire name | Daily_Diary_Q1 | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary Q1 | Inputtextbox |
      | Allow retrospective entry               | 2              | Numberinput  |
    And "Force completion of missed entries" Togglebutton is "True"
    And "Allow Blinded users access to view answers" Togglebutton is "True"
    And "Allow user to edit completed questionnaire responses" Togglebutton is "True"

    @Draft
    # Unified only - This scenario will test that Error message is displayed when Internal questionnaire name is not unique
  Scenario Outline: Error message is displayed when Internal questionnaire name is not unique
        Given user has selected "Unified" Study type
        And I navigate to "Questionnaires" page
        And "Tablet_Subject_Form2" questionnaire is in the left pane
        And I click "CREATE QUESTIONNAIRE" button in the left pane
        And I select "Handheld" from "Where will this be used" dropdown
        And I select "Subject" from "Who will be completing this questionnaire" dropdown
    And I enter "<Value>" in "<FieldType>" for "What is the Internal questionnaire name"
        When I click on "What is the questionnaire display name"
        Then "Internal name must be unique" text is displayed for "What is the Internal questionnaire name"
        And "What is the Internal questionnaire name" field is highlighted

    Examples:
      | Value                | FieldType    |
      | Tablet_Subject_Form2 | Inputtextbox |
      | TABLET_SUBJECT_FORM2 | Inputtextbox |

  @Draft
  # Unified only - This scenario will test that Questionnaire is successfully saved with unique Internal questionnaire name
  Scenario: Questionnaire is successfully saved with unique Internal questionnaire name
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Tablet" from "Where will this be used" dropdown
    And I select "Clinician" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value                | FieldType     |
      | What is the Internal questionnaire name | Tablet_Subject_Form2 | Inputetextbox |
      | What is the questionnaire display name  | Daily Diary          | Inputtextbox  |
    And I click on "SAVE CHANGES" button
    And I click "Yes" on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    And questionnaire "Tablet_Subject_Form2" is added on the left pane
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    And I select "Caregiver" from "Who will be completing this questionnaire" dropdown
    And I enter following data
      | Label                                   | Value                | FieldType    |
      | What is the Internal questionnaire name | Tablet_Subject_Form2 | Inputtextbox |
    And I click in "What is the questionnaire display name"
    And "Internal name must be unique" text is displayed for "What is the Internal questionnaire name"
    And I enter following data
      | Label                                   | Value                | FieldType    |
      | What is the Internal questionnaire name | Tablet_Subject_Form3 | Inputtextbox |
      | What is the questionnaire display name  | Daily Diary          | Inputtextbox |
    And I click in "What is the questionnaire display name"
    And "Internal name must be unique" text disappears
    And field is not highlighted
    And I click "SAVE CHANGES" button
    When I click "No" button on the Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?"
    Then Confirmation pop-up with message "Questionnaire added. Would you like to add pages now?" disappears
    And questionnaire "Tablet_Subject_Form3" is added on the left pane
    And middle pane is blank
    And left pane is enabled

  @Draft
  # Unified only - This scenario will test that Rich Text Editor is displayed in the right pane when enter text in "What is the questionnaire display name"
  Scenario: Rich Text Editor is displayed in the right pane when enter text in "What is the questionnaire display name"
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    And I select "Handheld" from "Where will this be used" dropdown
    When I enter following data
      | Label                                  | Value       | FieldType    |
      | What is the questionnaire display name | Daily Diary | Inputtextbox |
    Then Rich Text Editor is displayed on the right pane with text "Daily Diary"
