Feature: Create Questionnaire - Functionality
    As a User,
    I want to configure a questionnaire
    so that I can add a questionnaire to a study

    #PBI 47586 - Create Questionnaire - Validation

    # This scenario will test that when users do not enter value in the mandatory field then mandatoryfields are highlighted and error message is displayed
    Scenario: With IRT Study Type selected, Mandatoryfields are highlighted when users do not enter value in the MandatoryFields and an error message is displayed
        Given user has selected "IRT" Study type
        And I navigate to "Questionnaires" page
        And I click "CREATE QUESTIONNAIRE" button in the left pane
        And I enter following data
            | Field                                   | Value |Fieldtype    |
            | What is the Internal questionnaire name |       |Inputtextbox |
            | What is the questionnaire display name  |       |Inputtextbox |
        When I click "SAVE CHANGES" button
        Then "ALERT: Please address all highlighted fields" text is displayed
        And "What is the Internal questionnaire name" field is highlighted
        And "What is the questionnaire display name" field is highlighted

    # This scenario will test that user are able to select multiple emails in Select emails to be sent when questionnaire is saved dropdown
    Scenario: With "Unified" Study Type selected, Users are able to select multiple emails in "Select emails to be sent when questionnaire is saved" dropdown
        Given user has selected "Unified" Study type
        And I navigate to "Questionnaires" page
        And I click "CREATE QUESTIONNAIRE" button in the left pane
        And I select "IRT" from "Where will this be used" dropdown
        And I select "Confirmation of CRA Reconciliation" from "Select emails to be sent when questionnaire is saved" multiselect dropdown
        When I select "Low Depot Inventory Alert" from "Select emails to be sent when questionnaire is saved" multiselect dropdown
        Then "Confirmation of CRA Reconciliation, Low Depot Inventory Alert" is displayed in the "Select emails to be sent when questionnaire is saved" multiselect dropdown

    # This scenario will test that user is able to delete multiple emails in Select emails to be sent when questionnaire is saved dropdown
    Scenario: With "Unified" Study Type selected, User is able to delete multiple emails in "Select emails to be sent when questionnaire is saved" dropdown
        Given user has selected "Unified" Study type
        And I navigate to "Questionnaires" page
        And I click "CREATE QUESTIONNAIRE" button in the left pane
        And I select "IRT" from "Where will this be used" dropdown
        And I select "Confirmation of CRA Reconciliation" from "Select emails to be sent when questionnaire is saved" multiselect dropdown
        And I select "Low Depot Inventory Alert" from "Select emails to be sent when questionnaire is saved" multiselect dropdown
        When I de-select "Low Depot Inventory Alert" from "Select emails to be sent when questionnaire is saved" multiselect dropdown
        Then "Confirmation of CRA Reconciliation" is displayed in the "Select emails to be sent when questionnaire is saved" multiselect dropdown
    @Draft
    # This scenario will test that user is able to drag and drop ListOfActions from AVAILABLE ACTIONS into EXECUTABLE ACTIONS
    Scenario Outline: With "Unified" Study Type selected, User is able to drag and drop each ListOfActions from AVAILABLE ACTIONS into EXECUTABLE ACTIONS
        Given user has selected "Unified" Study type
        And I navigate to "Questionnaires" page
        And I click "CREATE QUESTIONNAIRE" button in the left pane
        And I select "IRT" from "Where will this be used" dropdown
        When I drag and drop "<ListOfActions>" from "AVAILABLE ACTIONS" into "EXECUTABLE ACTIONS" container
        Then "<ListOfActions>" is displayed in "EXECUTABLE ACTIONS" container
        And "<ListOfActions>" action is not displayed in the "AVAILABLE ACTIONS" container

        Examples:
            | ListOfActions                           |
            | Change Subject Status to Enrolled       |
            | Subject Status Based Initial Site Order |
            | Dispense Drug                           |
            | Assign Strata                           |
            | Randomize with Site Blocking            |
            | Screen Failed                           |
            | End of Treatment                        |
            | Discontinue                             |
            | Dispense Drug with Titration            |
    @Draft
    # This scenario will test that user is able to drag and drop ListOfActions from EXECUTABLE ACTIONS into AVAILABLE ACTIONS
    Scenario Outline: With "Unified" Study Type selected, User is able to drag and drop each ListOfActions from EXECUTABLE ACTIONS into AVAILABLE ACTIONS
        Given user has selected "Unified" Study type
        And I navigate to "Questionnaires" page
        And I click "CREATE QUESTIONNAIRE " button in the left pane
        And I select "IRT" from "Where will this be used" dropdown
        And I drag and drop "<ListOfActions>" from "AVAILABLE ACTIONS" into "EXECUTABLE ACTIONS" container
        When I drag and drop "<ListOfActions>" from "EXECUTABLE ACTIONS" into "AVAILABLE ACTIONS" container
        Then "<ListOfActions>" is displayed in "AVAILABLE ACTIONS" container
        And "<ListOfActions>" action is not displayed in the "EXECUTABLE ACTIONS" container

        Examples:
            | ListOfActions                           |
            | Change Subject Status to Enrolled       |
            | Subject Status Based Initial Site Order |
            | Dispense Drug                           |
            | Assign Strata                           |
            | Randomize with Site Blocking            |
            | Screen Failed                           |
            | End of Treatment                        |
            | Discontinue                             |
            | Dispense Drug with Titration            |

    @Draft
    # This scenario will test that when user clicks Save Changes button confirmation pop-up  Questionnaire added. Would you like to create pages now? Yes No is displayed
    Scenario: With "Unified" selected , User clicks on Save Changes button Confirmation pop-up  "Questionnaire added. Would you like to create pages now? " is displayed
        Given user has selected "Unified" Study type
        And I navigate to "Questionnaires" page
        And I click "CREATE QUESTIONNAIRE" button in the left pane
        And I select "IRT" from "Where will this be used" dropdown
        And I fill the form with data :
            | Field                                      | Value       | Fieldtype    |
            | What is the Internal Questionnaire name    | Screening   | Inputtextbox |
            | What is the questionniare display name     | Screening 2 | Inputtextbox |
            | Allow Blinded users access to view answers | On          | Togglebutton |
        And I select "Confirmation of CRA Reconciliation" from "Select emails to be sent when questionnaire is saved" multiselect dropdown
        And I drag and drop "ListOfActions" from "AVAILABLE ACTIONS" into "EXECUTABLE ACTIONS"
        When I click "SAVE CHANGES" button
        Then Confirmation pop-up  is displayed
        And "Questionnaire added. Would you like to create pages now?" message is displayed on the Confirmation pop-up

    @Draft
    # This scenario will test that when user clicks Yes button on Confirmation pop-up then user is taken to New page
    Scenario: With "Unified" Study Type selected , User clicks Yes on confirmation pop-up, user is taken to New page, Confirmation pop-up disappears and left pane is disabled
        Given user has selected "Unified" Study type
        And I navigate to "Questionnaires" page
        And I click "CREATE QUESTIONNAIRE" button in the left pane
        And I select "IRT" from "Where will this be used" dropdown
        And I fill the form with data :
            | Field                                      | Value       | Fieldtype    |
            | What is the Internal Questionnaire name    | Screening   | Inputtextbox |
            | What is the questionniare display name     | Screening 2 | Inputtextbox |
            | Allow Blinded users access to view answers | On          | Togglebutton |
        And I select "Confirmation of CRA Reconciliation" from "Select emails to be sent when questionnaire is saved" multiselect dropdown
        And I drag and drop "ListOfActions" from "AVAILABLE ACTIONS" into "EXECUTABLE ACTIONS"
        And I click "SAVE CHANGES" button
        And Confirmation pop-up is displayed
        When I click "Yes" button
        Then "PAGE INFORMATION" is displayed in the middle pane
        And Left pane is disabled
        And Confirmation pop-up should disappear
        And "Screening" questionnaire is displayed on the left pane

    @Draft
    # This scenario will test that when user clicks No button on Confirmation pop-up then middle pane should clear, confirmation pop-up should disappears and left pane is enabled
    Scenario: With "Unified" Study Type selected , User clicks No on confirmation pop-up then middle pane , Confirmation pop-up disappears and left pane is enabled
        Given user has selected "Unified" Study type
        And I navigate to "Questionnaires" page
        And I click "CREATE QUESTIONNAIRE" button in the left pane
        And I select "IRT" from "Where will this be used" dropdown
        And I fill the form with data :
            | Field                                      | Value       | Fieldtype    |
            | What is the Internal Questionnaire name    | Screening   | Inputtextbox |
            | What is the questionnaire display name     | Screening 2 | Inputtextbox |
            | Allow Blinded users access to view answers | On          | Togglebutton |
        And I select "Confirmation of CRA Reconciliation" from "Select emails to be sent when questionnaire is saved" multiselect dropdown
        And I drag and drop "ListOfActions" from "AVAILABLE ACTIONS" into "EXECUTABLE ACTIONS"
        And I click "SAVE CHANGES" button
        And Confirmation pop-up is displayed
        When I click "No" button
        Then middle pane is blank
        And Left pane is enabled
        And "Screening" questionnaire is displayed on the left pane
        And Confirmation pop-up should disappear


    @Draft
    # This scenario will test that when Questionnaire name is not unique error message Internal Questionnaire name must be unique is displayed
    Scenario Outline: With "Unified" Study Type selected, "Internal name must be unique" error message is displayed when Questionnaire name is not unique
        Given user has selected "Unified" Study type
        And I navigate to "Questionnaires" page
        And I click "CREATE QUESTIONNAIRE" button in the left pane
        And I select "IRT" from "Where will this be used" dropdown
        And I fill the form with data :
            | Field                                      | Value       | Fieldtype    |
            | What is the Internal Questionnaire name    | Screening   | Inputtextbox |
            | What is the questionnaire display name     | Screening 2 | Inputtextbox |
            | Allow Blinded users access to view answers | On          | Togglebutton |
        And I select "Confirmation of CRA Reconciliation" from "Select emails to be sent when questionnaire is saved" multiselect dropdown
        And I drag and drop "ListOfActions" from "AVAILABLE ACTIONS" into "EXECUTABLE ACTIONS"
        And I click "SAVE CHANGES" button
        And Confirmation pop-up is displayed
        And  I click "No" button
        And Left pane is enabled
        And Confirmation pop-up should disappear
        And "Screening" questionnaire is displayed on the left pane
        And I click on "CREATE QUESTIONNAIRE" page
        And I select "IRT" from "Where will this be used" dropdown
        And I enter "Screening" in the "What is the Internal questionnaire name?" dropdown
        When I click in the "What is the questionnaire display name?"
        Then "<Error>" message should be displayed near "<Field>"

        Examples:
        |Field                                    |Error                       |Value    |Fieldtype   |
        | What is the Internal Questionnaire name |Internal name must be unique|Screening|Inputtextbox|
        | What is the Internal Questionnaire name |Internal name must be unique|SCREENING|Inputtextbox|
        
@Draft
    # This scenario will test that when User should be able to rearrange ListofAction in the EXECUTABLE ACTIONS
    Scenario: With "Unified" Study Type selected, User should be able to rearrange ListofAction in the EXECUTABLE ACTIONS
        Given user has selected "Unified" Study type
        And I navigate to "Questionnaires" page
        And I click "CREATE QUESTIONNAIRE" button in the left pane
        And I select "IRT" from "Where will this be used" dropdown
        And I drag and drop "Create a Patient" from AVAILABLE ACTIONS into EXECUTABLE ACTIONS
        And I drag and drop "Dispense Drug" from AVAILABLe Actions into EXECUTABLE ACTIONS below "Create a Patient"
        When I drag and drop "Dispense Drug" from EXECUTABLE ACTIONS into EXECUTABLE ACTIONS above "Create a Patient"
        Then EXECUTABLE ACTIONS should display in the following order
            | EXECUTABLE ACTIONS |
            | Dispense Drug      |
            | Create a Patient   |