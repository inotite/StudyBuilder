    @TreatmentEditDelete

    @Draft
    Background: Treatments available on "Treatments" page
        Given I select "Unified" Study type
        And I navigate to "Treatments" page
        And grid displays following data
            | Treatment name | Edit enabled | Delete icon enabled | Tied to Dispensation Detail | Tied to Randomization |
            | Treatment_A    | True         | True                | False                       | False                 |
            | Treatment_B    | True         | False               | True                        | False                 |
            | Treatment_C    | True         | False               | False                       | True                  |
            | Treatment_D    | True         | False               | True                        | True                  |
    # Treatment_A : can be deleted because it is not tied to dispensation or randomization
    # Treatment_B : cannot be deleted because it is tied to dispensation detail
    # Treatment_C : cannot be deleted because it is tied to randomization
    # Treatment_D : cannot be deleted because it is tied to dispensation and randomization

    @Draft
    # Unified only - This scenario will test that Edit mode displays two buttons and gives the ability to edit data
    Scenario: Edit mode displays two buttons and gives the ability to edit data
        Given treatment "Treatment_A" is added in the grid
        When I click "Edit" icon button for treatment "Treatment_A"
        Then following data is enabled
            | Treatment name |
            | Treatment_A    |
        And "Save Changes" icon button is displayed for treatment "Treatment_A"
        And "Cancel" icon button is displayed for treatment "Treatment_A"
        And "Edit" icon button is hidden for treatment "Treatment_A"
        And "Delete" icon is hidden for treatment "Treatment_A"

    @Draft
    # Unified only - This scenario will test that data remains same when no changes are made in the grid
    Scenario: Data remains same when no changes are made in the grid
        Given treatment "Treatment_A" is added in the grid
        And I click "Edit" icon button for treatment "Treatment_A"
        When I click "Cancel" icon button
        Then "Cancel" icon button is not displayed
        And "Save Changes" icon button is not displayed
        And following data is enabled
            | Treatment name |
            | Treatment_A    |
        And "Edit" icon button is displayed for treatment "Treatment_A"
        And "Delete" icon is displayed for treatment "Treatment_A"

    @Draft
    # Unified only - This scenario will test that Error message is displayed when no mandatory fields are completed in the grid
    Scenario: Error message is displayed when no mandatory fields are completed in the grid
        Given treatment "Treatment_A" is added in the grid
        And I click "Edit" icon button for treatment "Treatment_A"
        And I enter following data
            | Treatment name |
            |                |
        When I click "Save Changes" icon button
        Then "Alert: Please address all highlighted fields" text is displayed
        And "Treatment name" field is highlighted

    @Draft
    # Unified only - This scenario will test that error message is displayed when Treatment name is not unique in the grid
    Scenario: Error message is displayed when Treatment name is not unique in the grid
        Given treatment "Treatment_A" is added in the grid
        And I enter following data
            | Label          | Value          |
            | Treatment name | 123Treatment_B |
        And I click "Add" button
        And I click "Edit" icon button for treatment "123Treatment_B"
        And I enter following data
            | Treatment name |
            | Treatment_A    |
        When I click "Save Changes" icon button
        Then "Treatment name must be unique" snackbar is displayed
        And "Treatment name" field is highlighted
        And treatment "Treatment_A" is not added in the grid

    @Draft
    # Unified only - This scenario will test that previous data is retained when click Cancel icon button in the grid
    Scenario: Previous data is retained when click Cancel icon button in the grid
        Given treatment "Treatment_A" is added in the grid
        And I click "Edit" icon button for treatment "Treatment_A"
        And I enter following data
            | Treatment name |
            | Treatment_1    |
        When I click "Cancel" icon button
        Then following data is displayed for treatment "Treatment_A"
            | Treatment name |
            | Treatment_A    |
        And "Cancel" icon button is displayed
        And "Save Changes" icon button is displayed
        And "Edit" icon button is displayed for treatment "Treatment_A"
        And "Delete" icon is displayed for treatment "Treatment_A"

    @Draft
    # Unified only - This scenario will test that changes made are successfully saved in the grid
    Scenario: Changes made are successfully saved in the grid
        Given treatment "Treatment_A" is added in the grid
        And I click "Edit" icon button for treatment "Treatment_A"
        And I select following data
            | Treatment name |
            | Treatment_1    |
        When I click "Save Changes" icon button
        Then following data is displayed
            | Treatment name |
            | Treatment_1    |
        And "Cancel" icon button is not displayed
        And "Save Changes" icon button is not displayed
        And pop-up with message "Changes successfully saved." snack bar is displayed
        And grid is re-enabled

    @Draft
    # Unified only - This scenario will test that confirmation pop-up is displayed when delete Treatment
    Scenario: Confirmation pop-up is displayed when delete Treatment
        Given treatment "Treatment_A" is added in the grid
        When I click "Delete" icon button for treatment "Treatment_A"
        Then Confirmation pop-up with message "The Treatment will be deleted from this study. Are you sure you want to delete?" is displayed

    @Draft
    # Unified only - This scenario will test that Treatment is not deleted upon clicking No on confirmation pop-up
    Scenario: Treatment is not deleted upon clicking No on Confirmation pop-up
        Given treatment "Treatment_A" is added in the grid
        And I click "Delete" icon button for treatment "Treatment_A"
        When I click "No" button on Confirmation pop-up with message "The Treatment will be deleted from this study. Are you sure you want to delete?"
        Then following data is displayed
            | Treatment name |
            | Treatment_A    |
        And "Edit" button is displayed for treatment "Treatment_A"
        And "Delete" icon button is displayed for treatment "Treatment_A"

    @Draft
    # Unified only - This scenario will test that Treatment is deleted upon clicking Yes on Confirmation pop-up
    Scenario: Treatment is deleted upon clicking Yes on Confirmation pop-up
        Given treatment "Treatment_A" is added in the grid
        And I click "Delete" icon button for treatment "Treatment_A"
        When I click "Yes" button on Confirmation pop-up with message "The Treatment will be deleted from this study. Are you sure you want to delete?"
        Then following data is displayed
            | Treatment name |
        And treatment "Treatment_A" is not displayed in the grid

    @Draft
    # Unified only - This scenario will test that Treatment cannot be deleted when Treatment is assigned to dispensation detail
    Scenario: Treatment cannot be deleted when Treatment is assigned to dispensation detail
        Given treatment "Treatment_B" is assigned to dispensation detail
        And "Delete" icon button is disabled for treatment "Treatment_B"
        When I click "Delete" icon button for treatment "Treatment_B"
        Then "Treatment name is tied to dispensation and/or Randomization.  To delete, please remove treatment from dispensation detail and/or randomization table." text is displayed
        And treatment "Treatment_B" is not deleted

    @Draft
    # Unified only - This scenario will test that Treatment cannot be deleted when Treatment is assigned to Randomization
    Scenario: Treatment cannot be deleted when Treatment is assigned to Randomization
        Given treatment "Treatment_C" is assigned to Randomization
        And "Delete" icon button is disabled for treatment "Treatment_C"
        When I click "Delete" icon button for treatment "Treatment_C"
        Then "Treatment name is tied to dispensation and/or Randomization.  To delete, please remove treatment from dispensation detail and/or randomization table." text is displayed
        And treatment "Treatment_C" is not deleted

    @Draft
    # Unified only - This scenario will test that Treatment cannot be deleted when Treatment is assigned to dispensation detail and Randomization
    Scenario: Treatment cannot be deleted when Treatment is assigned to dispensation detail and Randomization
        Given treatment "Treatment_D" is assigned to Dispensation detail and Randomization
        And "Delete" icon button is disabled for treatment "Treatment_D"
        When I click "Delete" icon button for treatment "Treatment_D"
        Then "Treatment name is tied to dispensation and/or Randomization.  To delete, please remove treatment from dispensation detail and/or randomization table." text is displayed
        And treatment "Treatment_D" is not deleted
