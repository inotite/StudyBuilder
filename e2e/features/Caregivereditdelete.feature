@CaregiverEditDelete
Feature: Edit/Delete a Caregiver
    As a User,
    I want to edit or delete a Caregiver in the study

    Background: Caregivers available on "Caregivers" page
        Given I select "Unified" Study type
        And I navigate to "Caregivers" page
        And grid displays following for each row
            | Caregiver name      | Edit enabled | Delete icon enabled |
            | Friend              | True         | True                |
            | Other Family Member | False        | False               |
    # Friend : can be deleted because it is not tied to subject
    # Other Family Member : cannot be deleted or modified because it is tied to subject

    # Unified only - This scenario will test that Edit mode displays two buttons and gives the ability to edit data
    Scenario: Edit mode displays two buttons and gives the ability to edit data
        Given caregiver "Friend" is added in the grid
        When I click "Edit icon" button for caregiver "Friend"
        Then following data is enabled
            | Caregiver name |
            | Friend         |
        And "Save changes icon" button is displayed for caregiver "Friend"
        And "Cancel icon" button is displayed for caregiver "Friend"
        And "Edit icon" button is hidden for caregiver "Friend"
        And "Delete icon" button is hidden for caregiver "Friend"


    # Unified only - This scenario will test that data remains same when no changes are made in the grid
    Scenario: Data remains same when no changes are made in the grid
        Given caregiver "Friend" is added in the grid
        And I click "Edit icon" button for caregiver "Friend"
        When I click "Cancel icon" button for caregiver "Friend"
        Then "Cancel icon" button is not displayed for caregiver "Friend"
        And "Save changes icon" button is not displayed for caregiver "Friend"
        And following data is not enabled
            | Caregiver name |
            | Friend         |
        And "Edit icon" button is displayed for caregiver "Friend"
        And "Delete icon" button is displayed for caregiver "Friend"


    # Unified only - This scenario will test that error message is displayed when no mandatory fields are completed in the grid
    Scenario: Error message is displayed when no mandatory fields are completed in the grid
        Given caregiver "Friend" is added in the grid
        And I click "Edit icon" button for caregiver "Friend"
        And I enter "" for caregiver "Friend" input
        When I click "Save changes icon" button for caregiver " "
        Then "Alert: Please address all highlighted fields" text is displayed
        And "Caregiver name" field is highlighted for selected row

    # Unified only - This scenario will test that error message is displayed when Caregiver name is not unique in the grid
    Scenario: Error message is displayed when Caregiver name is not unique in the grid
        Given caregiver "Friend" is added in the grid
        And I enter following data
            | Label          | Value  | Fieldtype    |
            | Caregiver name | Parent | Inputtextbox |
        And I click "Add" icon button
        And I click "Edit icon" button for caregiver "Parent"
        And I enter "Friend" for caregiver "Parent" input
        When I click "Save changes icon" button for caregiver "Friend"
        Then "Caregiver name must be unique" snackbar "error" is displayed
        And caregiver "Friend" is not added in the grid


    # Unified only - This scenario will test that previous data is retained when click Cancel icon button in the grid
    Scenario: Previous data is retained when click Cancel icon button in the grid
        Given caregiver "Friend" is added in the grid
        And I click "Edit icon" button for caregiver "Friend"
        And I enter "Spouse" for caregiver "Friend" input
        When I click "Cancel icon" button for caregiver "Spouse"
        Then grid displays following data
            | Caregiver name |
            | Friend         |
        And "Cancel icon" button is not displayed for caregiver "Friend"
        And "Save changes icon" button is not displayed for caregiver "Friend"
        And "Edit icon" button is displayed for caregiver "Friend"
        And "Delete icon" button is displayed for caregiver "Friend"


    # Unified only - This scenario will test that changes made are successfully saved in the grid
    Scenario: Changes made are successfully saved in the grid
        Given caregiver "Friend" is added in the grid
        And I click "Edit icon" button for caregiver "Friend"
        And I enter "Spouse" for caregiver "Friend" input
        When I click "Save changes icon" button for caregiver "Spouse"
        Then grid displays following data
            | Caregiver name |
            | Spouse         |
        And "Cancel icon" button is not displayed for caregiver "Spouse"
        And "Save changes icon" button is not displayed for caregiver "Spouse"
        And "Changes successfully saved." snackbar "info" is displayed
        And grid is re-enabled


    # Unified only - This scenario will test that confirmation pop-up is displayed when delete Caregiver
    Scenario: Confirmation pop-up is displayed when delete caregiver
        Given caregiver "Friend" is added in the grid
        When I click "Delete icon" button for caregiver "Friend"
        Then Confirmation pop-up with message "The Caregiver will be deleted from this study. Are you sure you want to delete?" is displayed


    # Unified only - This scenario will test that Caregiver is not deleted upon clicking No on confirmation pop-up
    Scenario: Caregiver is not deleted upon clicking No on Confirmation pop-up
        Given caregiver "Friend" is added in the grid
        And I click "Delete icon" button for caregiver "Friend"
        When I click "No" button on Confirmation pop-up with message "The Caregiver will be deleted from this study. Are you sure you want to delete?"
        Then grid displays following data
            | Caregiver name |
            | Friend         |
        And "Edit icon" button is displayed for caregiver "Friend"
        And "Delete icon" button is displayed for caregiver "Friend"


    # Unified only - This scenario will test that Caregiver is deleted upon clicking Yes on Confirmation pop-up
    Scenario: Caregiver is deleted upon clicking Yes on Confirmation pop-up
        Given caregiver "Friend" is added in the grid
        And I click "Delete icon" button for caregiver "Friend"
        When I click "Yes" button on Confirmation pop-up with message "The Caregiver will be deleted from this study. Are you sure you want to delete?"
        And row "Friend" is not displayed in the grid


    # Unified only - This scenario will test that Caregiver cannot be deleted when Caregiver is assigned to subject
    Scenario: Caregiver cannot be deleted when caregiver is assigned to subject
        Given caregiver "Other Family Member" is assigned to Subject
        And "Delete icon" button is disabled for caregiver "Other Family Member"
        When I hover mouse over "Delete icon" button for caregiver "Other Family Member"
        Then "Cannot be deleted or modified because it is tied to subject" text is displayed for caregiver "Other Family Member" "Delete icon" button
        And caregiver "Other Family Member" is displayed in the grid


    # Unified only - This scenario will test that Caregiver cannot be modified when Caregiver is assigned to subject
    Scenario: Caregiver cannot be modified when caregiver is assigned to subject
        Given caregiver "Other Family Member" is assigned to Subject
        And "Edit icon" button is disabled for caregiver "Other Family Member"
        When I hover mouse over "Edit icon" button for caregiver "Other Family Member"
        Then "Cannot be deleted or modified because it is tied to subject" text is displayed for caregiver "Other Family Member" "Delete icon" button
        And caregiver "Other Family Member" is not editable

