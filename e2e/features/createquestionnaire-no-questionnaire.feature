Feature: Create Questionnaire
  As a User,
  I want to "Add Questionanire" when no questionnaire exist

# PBI 44651 Create Questionnaire - No Questionnaire

@Draft
# this scenario will test that No Questionnaires text and Add Questionnaire button  is displayed on the left pane.
Scenario: 1 Navigate to Questionnaire Page
   Given a web browser is on the "Home" page
   When I click on Questionnaire icon
   Then Questionnaire page should be displayed with "No Questionnaires" on the left pane
   And "Add Questionnaire" button should be displayed on the left pane
