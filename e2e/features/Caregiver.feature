@caregiver
Feature: Add a Caregiver
    As a User,
    I want to add a Caregiver to the study

    # PBI - 51947 - Add Caregiver

    # Unified only - This scenario will test that caregivers page displays the customization fields
    Scenario: Caregivers page displays the customization fields
        Given I select "Unified" Study type
        When I navigate to "Caregivers" page
        Then "CAREGIVERS" Title is displayed
        And page displays following data
            | Label          | Fieldtype    | Defaultvalue  | Enabled | Placeholder       |
            | Caregiver name | Inputtextbox |               | True    | Max 60 Characters |
        And "= MANDATORY" text is displayed
        And asterisk symbol is displayed for "= MANDATORY"
        And "Add" icon button is displayed
        And "Cancel" icon button is displayed
        And "Caregiver name" column header is displayed for grid

    # Unified only - This scenario will test that selected data is cleared off when click Cancel icon button
    Scenario: Selected data is cleared off when click Cancel icon button
        Given I select "Unified" Study type
        And I navigate to "Caregivers" page
        And I enter following data
            | Label          | Value  | Fieldtype    |
            | Caregiver name | Friend | Inputtextbox |
        When I click "Cancel" icon button
        Then page displays following data
            | Label          | Fieldtype    | Defaultvalue | Enabled | Placeholder       |
            | Caregiver name | Inputtextbox |              | True    | Max 60 Characters |

    # Unified only - This scenario will test that error message is displayed when no mandatory fields are completed
    Scenario: Error message is displayed when no mandatory fields are completed
        Given I select "Unified" Study type
        And I navigate to "Caregivers" page
        When I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is displayed
        And "Caregiver name" field is highlighted

    # Unified only - This scenario will test that error message is not displayed when mandatory fields are completed
    Scenario: Error message is not displayed when mandatory fields are completed
        Given I select "Unified" Study type
        And I navigate to "Caregivers" page
        And I click "Add" icon button
        And "Alert: Please address all highlighted fields" text is displayed
        And "Caregiver name" field is highlighted
        And I enter following data
            | Label          | Value  | Fieldtype    |
            | Caregiver name | Friend | Inputtextbox |
        When I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is not displayed
        And "Caregiver name" field is not highlighted
        And grid displays following data
            | Caregiver name |
            | Friend         |
        And "Edit icon" button is displayed for caregiver "Friend"
        And "Delete icon" button is displayed for caregiver "Friend"

    # Unified only - This scenario will test that Caregiver is added successfully
    Scenario: Caregiver is added successfully
        Given I select "Unified" Study type
        And I navigate to "Caregivers" page
        And I enter following data
            | Label          | Value                                                        | Fieldtype    |
            | Caregiver name | FriendFriendFriendFriendFriendFriendFriendFriendFriendFriend | Inputtextbox |
        When I click "Add" icon button
        Then "Caregiver successfully added" snackbar "info" is displayed
        And grid displays following data
            | Caregiver name                                               |
            | FriendFriendFriendFriendFriendFriendFriendFriendFriendFriend |
        And "Edit icon" button is displayed for caregiver "FriendFriendFriendFriendFriendFriendFriendFriendFriendFriend"
        And "Delete icon" button is displayed for caregiver "FriendFriendFriendFriendFriendFriendFriendFriendFriendFriend"

    # Unified only - This scenario will test that Caregiver is added successfully in alphanumeric order
    Scenario: Caregiver is added successfully in alphanumeric order
        Given I select "Unified" Study type
        And I navigate to "Caregivers" page
        And I enter following data
            | Label          | Value      | Fieldtype    |
            | Caregiver name | Friend ABC | Inputtextbox |
        And I click "Add" icon button
        And I enter following data
            | Label          | Value      | Fieldtype    |
            | Caregiver name | 123 Friend | Inputtextbox |
        When I click "Add" icon button
        Then grid data is sorted by following
            | Caregiver name |
            | 123 Friend     |
            | Friend ABC     |

    # Unified only - This scenario will test that error message is displayed when Caregiver Name is not unique
    Scenario: Error message is displayed when Caregiver name is not unique
        Given I select "Unified" Study type
        And I navigate to "Caregivers" page
        And I enter following data
            | Label          | Value      | Fieldtype    |
            | Caregiver name | Friend XYZ | Inputtextbox |
        And I click "Add" icon button
        And I enter following data
            | Label          | Value      | Fieldtype    |
            | Caregiver name | Friend XYZ | Inputtextbox |
        When I click "Add" icon button
        Then "Caregiver Name must be unique" snackbar "error" is displayed
        And caregiver "Friend ABC" is not added in the grid

    # Unified only - This scenario will test that hovering over the row in the grid highlights the row
    Scenario: Hovering over the row in the grid highlights the row
        Given I select "Unified" Study type
        And I navigate to "Caregivers" page
        And I enter following data
            | Label          | Value      | Fieldtype    |
            | Caregiver name | Spouse XYZ | Inputtextbox |
        And I click "Add" icon button
        When I hover over the caregiver "Spouse XYZ" row in the grid
        Then caregiver "Spouse XYZ" row is highlighted






