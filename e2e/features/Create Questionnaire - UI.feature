Feature: Create Questionnaire - UI Render Form
   As a User,
   I want to configure a questionnaire
   so that I can add a questionnaire to a study

   #PBI 47586 - Create Questionnaire - UI Render Form


   # This scenario will test that CREATE QUESTIONNAIRE button is displayed to add a Questionnaire
   Scenario: CREATE QUESTIONNAIRE button is displayed on the left pane for "Unified" study type
      Given user has selected "Unified" Study type
      When I navigate to "Questionnaires" page
      Then "CREATE QUESTIONNAIRE" button is displayed on the left pane


   # This scenario will test that clicking on CREATE QUESTIONNAIRE button will allow user to customize the fields
   Scenario Outline: Clicking on CREATE QUESTIONNAIRE button displays the middle pane to include questionnaire customization fields for "<StudyType>"
      Given user has selected "<StudyType>" Study type
      And I navigate to "Questionnaires" page
      When I click "CREATE QUESTIONNAIRE" button in the left pane
      Then middle pane displays
         | Label                   | Fieldtype | Defaultvalue  | Enabled |
         | Where will this be used | Dropdown  | Please select | True    |
    And "<Option>" is available in "Where will this be used" dropdown
    And "<HiddenOption>" is not available in "Where will this be used" dropdown
    And "QUESTIONNAIRE INFORMATION" Title is displayed
    And "= MANDATORY" text is displayed
    And asterisk symbol is displayed for "= MANDATORY"
    And "CANCEL" button is displayed
    And "SAVE CHANGES" button is displayed
    And left pane is disabled
    And right pane is blank

    Examples:
      | StudyType | Option                | HiddenOption     |
      | eCOA      | Tablet, Handheld      | IRT              |
      | IRT       | IRT                   | Tablet, Handheld |
      | Unified   | Tablet, Handheld, IRT |                  |


   # This scenario will test that when selecting Option Tablet, appropriate fields are displayed for Unified study type
   Scenario: Appropriate fields are displayed when "Unified" Study type is selected and "Tablet" option is selected
      Given user has selected "Unified" Study type
      And I navigate to "Questionnaires" page
      And I click "CREATE QUESTIONNAIRE" button in the left pane
      When I select "Tablet" from "Where will this be used" dropdown
      Then middle pane displays
         | Label                                             | Fieldtype    | Defaultvalue      | Enabled |
         | Who will be completing this questionnaire         | Dropdown     | Please select     | True    |
         | Training                                          | Togglebutton | False             | False   |
         | What is the Internal questionnaire name           | Inputtextbox | Max 60 Characters | True    |
         | What is the questionnaire display name            | Inputtextbox | Max 60 Characters | True    |
         | Allow "Blinded" users access to view answers      | Togglebutton | False             | True    |
         | Questionnaire visible when                        | Dropdown     | Please select     | True    |
         | Questionnaire enabled when                        | Dropdown     | Please select     | True    |
         | Allow site user to review completed questionnaire | Togglebutton | False             | True    |
      And "CANCEL" button is displayed
      And "SAVE CHANGES" button is displayed
      And "Translation icon" is displayed
    And "Allow retrospective entry" is not displayed
    And "Force completion of missed entries" is not displayed
    And "Allow user to edit completed questionnaire responses" is not displayed


   # This scenario will test that when selecting Option Handheld, appropriate fields are displayed for Unified study type
   Scenario: Appropriate fields are displayed when "Unified" Study type is selected and "Handheld" option is selected
      Given user has selected "Unified" Study type
      And I navigate to "Questionnaires" page
      And I click "CREATE QUESTIONNAIRE" button in the left pane
      When I select "Handheld" from "Where will this be used" dropdown
      Then middle pane displays
         | Label                                                | Fieldtype    | Defaultvalue      | Enabled |
         | Who will be completing this questionnaire            | Dropdown     | Please select     | True    |
         | Training                                             | Togglebutton | False             | False   |
         | What is the Internal questionnaire name              | Inputtextbox | Max 60 Characters | True    |
         | What is the questionnaire display name               | Inputtextbox | Max 60 Characters | True    |
         | Allow "Blinded" users access to view answers         | Togglebutton | False             | True    |
         | Questionnaire visible when                           | Dropdown     | Please select     | True    |
         | Questionnaire enabled when                           | Dropdown     | Please select     | True    |
         | Allow retrospective entry                            | Numberinput  |                   | True    |
         | Allow user to edit completed questionnaire responses | Togglebutton | False             | True    |
         | Force completion of missed entries                   | Togglebutton | False             | False   |
      And Label "Days" is displayed for "Allow retrospective entry"
      And Label "Days" is displayed for "Allow user to edit completed questionnaire responses"
      And Label "Days" is disabled for "Allow user to edit completed questionnaire responses"
      And "CANCEL" button is displayed
      And "SAVE CHANGES" button is displayed
      And "Translation icon" is displayed
    And "Allow site user to review completed questionnaire" is not displayed

  # This scenario will test that appropriate business rule fields are displayed when Unified Study type is selected
  Scenario Outline: Appropriate business rule fields are displayed when "Unified" Study type is selected
    Given user has selected "Unified" Study type
    And I navigate to "Questionnaires" page
    And I click "CREATE QUESTIONNAIRE" button in the left pane
    When I select "<Option>" from "Where will this be used" dropdown
    Then the business rule value options are displayed
      | Label                      | RadioButtonLabel | FieldType   | IsSelected | Enabled |
      | Questionnaire visible when | is True          | Radiobutton | False      | False   |
      | Questionnaire visible when | is False         | Radiobutton | False      | False   |
      | Questionnaire enabled when | is True          | Radiobutton | False      | False   |
      | Questionnaire enabled when | is False         | Radiobutton | False      | False   |

    Examples:
      | Option   |
      | Tablet   |
      | Handheld |


   # This scenario will test that when selecting Option IRT, appropriate fields are displayed
   Scenario: Appropriate fields are displayed when "Unified" Study type is selected and "IRT" option is selected
      Given user has selected "Unified" Study type
      And I navigate to "Questionnaires" page
      And I click "CREATE QUESTIONNAIRE" button in the left pane
      When I select "IRT" from "Where will this be used" dropdown
      Then middle pane displays
         | Label                                                | Field        | Defaultvalue      | Enabled |
         | What is the Internal questionnaire name              | Inputtextbox | Max 60 Characters | True    |
         | What is the questionnaire display name               | Inputtextbox | Max 60 Characters | True    |
         | Allow "Blinded" users access to view answers         | Togglebutton | False             | True    |
         | Select emails to be sent when questionnaire is saved | Dropdown     | Please select     | True    |
      And Emails should display in the "Select emails to be sent when questionniare is saved" dropdown
         | Emails                                                            |
         | <=PatientLabel=>s Count Cap Alert                                 |
         | <=PatientLabel=>s Count Warning Alert                             |
         | Confirmation of <=PatientLabel=> Study Drug Return to Site        |
         | Confirmation of <=PatientLabel=> Unblind (Blinded)                |
         | Confirmation of <=PatientLabel=> Unblind (Unblinded)              |
         | Confirmation of Additional Dispensation                           |
         | Confirmation of Cohort Management                                 |
         | Confirmation of CRA Reconciliation                                |
         | Confirmation of Data Correction Form (Approved)                   |
         | Confirmation of Data Correction Form (Need More Information)      |
         | Confirmation of Data Correction Form (Pending Approval)           |
         | Confirmation of Data Correction Form (Rejected)                   |
         | Confirmation of Depot Drug Status Management                      |
         | Confirmation of Depot IP Reconciliation                           |
         | Confirmation of Depot Management                                  |
         | Confirmation of Depot Order Acknowledgement                       |
         | Confirmation of Depot Order Request                               |
         | Confirmation of Dispensation Management                           |
         | Confirmation of Dose Level Management                             |
         | Confirmation of Drug Assignment - Batch Release                   |
         | Confirmation of Drug Type Management                              |
         | Confirmation of Early Termination                                 |
         | Confirmation of Enrollment                                        |
         | Confirmation of Individual Drug Assignment Update                 |
         | Confirmation of Label Group Management                            |
         | Confirmation of Lot Management                                    |
         | Confirmation of Manual Order Request                              |
         | Confirmation of Material Approval                                 |
         | Confirmation of Order Acknowledgement                             |
         | Confirmation of Process Order from Quarantine                     |
         | Confirmation of Randomization Approval                            |
         | Confirmation of Randomization Inegibility                         |
         | Confirmation of Randomization Ineligibility Override              |
         | Confirmation of Replacement of Study Drug                         |
         | Confirmation of Resupply Setting Management                       |
         | Confirmation of Screen Fail                                       |
         | Confirmation of Screening                                         |
         | Confirmation of Site Cap Management                               |
         | Confirmation of Site IP Return to Depot                           |
         | Confirmation of Site Kit Status Management                        |
         | Confirmation of Site Management                                   |
         | Confirmation of Study Cap Management                              |
         | Confirmation of Study Completion                                  |
         | Confirmation of Study IP Order (Blinded)                          |
         | Confirmation of Study IP Order (Unblinded)                        |
         | Confirmation of Study IP Order DTD (Blinded)                      |
         | Confirmation of Study IP Order DTD (Unblinded)                    |
         | Confirmation of Treatment Visit                                   |
         | Depot Reconciliation Discrepancy Alert - Depot Name <=DepotName=> |
         | Depot Study IP Expiration Alert                                   |
         | Failed Dispensing Alert                                           |
         | Failed Drug Order Alert                                           |
         | Kits Assigned                                                     |
         | Low Depot Inventory Alert                                         |
         | Low Site Inventory Alert                                          |
         | Outdated Visit Alert                                              |
         | Outstanding Acknowledgement of Receipt Alert                      |
         | Pill Count Discrepancy Alert                                      |
         | Quarantined Drug Units Alert                                      |
         | Site Activation Alert                                             |
         | Site Study IP Expiration Alert                                    |
      And "AVAILABLE ACTIONS" displays
         | Listofactions                           |
         | Create a Subject                        |
         | Change Subject Status to Enrolled       |
         | Subject Status Based Initial Site Order |
         | Dispense Drug                           |
         | Assign Strata                           |
         | Randomize with Site Blocking            |
         | Screen Fail                             |
         | End of Treatment                        |
         | Discontinue                             |
         | Dispense Drug with Titration            |
      And "EXECUTABLE ACTIONS" displays "Drag actions here"
      And "Select actions to execute when questionnaire is saved by dragging from left to right." text is displayed
      And "Order can be adjusted at any time by dragging and dropping." text is displayed
      And "CANCEL" button is displayed
      And "SAVE CHANGES" button is displayed
      And "Translation icon" is displayed


   # This scenario will test that when selecting Tablet appropriate options are displayed in Who will be completing this questionnaire dropdown
   Scenario: Appropriate Options are displayed in Who will be completing this questionnaire dropdown when "Tablet" option is selected for "Unified" Study type
      Given user has selected "Unified" Study type
      And I navigate to "Questionnaires" page
      And I click "CREATE QUESTIONNAIRE" button in the left pane
      When I select "Tablet" from "Where will this be used" dropdown
      Then "Subject" is displayed in "Who will be completing this questionnaire" dropdown
      And "Clinician" is displayed in "Who will be completing this questionnaire" dropdown
      And "Caregiver" is displayed in "Who will be completing this questionnaire" dropdown
    And "Subject and/or Caregiver" is not displayed in "Who will be completing this questionnaire" dropdown


   # This scenario will test that when selecting Handheld appropriate options are displayed in Who will be completing this questionnaire dropdown
   Scenario: Appropriate Options are displayed in Who will be completing this questionnaire dropdown when "Handheld" option is selected for "Unified" Study type
      Given user has selected "Unified" Study type
      And I navigate to "Questionnaires" page
      And I click "CREATE QUESTIONNAIRE" button in the left pane
      When I select "Handheld" from "Where will this be used" dropdown
      Then "Subject" is displayed in "Who will be completing this questionnaire" dropdown
      And "Caregiver" is displayed in "Who will be completing this questionnaire" dropdown
      And "Subject and/or Caregiver" is displayed in "Who will be completing this questionnaire" dropdown
    And "Clinician" is not displayed in "Who will be completing this questionnaire" dropdown

