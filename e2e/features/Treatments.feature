@treatment
Feature: Add a Treatment
    As a User,
    I want to add a Treatment to the study

    #PBI 51946 - Add Treatment

    @Draft
    # Unified only - This scenario will test that Treatments page displays the customization fields
    Scenario: Treatments page displays the customization fields
        Given I select "Unified" Study type
        When I navigate to "Treatments" page
        Then "TREATMENTS" Title is displayed
        And page displays following data
            | Label          | Fieldtype    | Defaultvalue | Enabled | Placeholder       |
            | Treatment name | Inputtextbox |              | True    | Max 60 Characters |
        And "= MANDATORY" text is displayed
        And asterisk symbol is displayed for "= MANDATORY"
        And "Cancel" icon button is displayed
        And "Add" icon button is displayed
        And grid displays following data
            | Treatment name |

    @Draft
    # Unified only - This scenario will test that Selected data is cleared off when click Cancel icon button
    Scenario: Selected data is cleared off when click Cancel icon button
        Given I select "Unified" Study type
        And I navigate to "Treatments" page
        And I enter following data
            | Label          | Value         |
            | Treatment name | Treatment 123 |
        When I click "Cancel" icon button
        Then following data is displayed
            | Label          | Fieldtype    | Defaultvalue | Enabled | Placeholder       |
            | Treatment name | Inputtextbox |              | True    | Max 60 Characters |

    @Draft
    # Unified only - This scenario will test that Error message is displayed when no mandatory fields are completed
    Scenario: Error message is displayed when no mandatory fields are completed
        Given I select "Unified" Study type
        And I navigate to "Treatments" page
        When I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is displayed
        And "Treatment name" field is highlighted

    @Draft
    # Unified only - This scenario will test that Error message is not displayed when mandatory fields are completed
    Scenario: Error message is not displayed when mandatory fields are completed
        Given I select "Unified" Study type
        And I navigate to "Treatments" page
        And I click "Add" icon button
        And I enter following data
            | Label          | Value         |
            | Treatment name | Treatment 123 |
        When I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is not displayed
        And "Treatment name" field is not highlighted
        And grid displays following data
            | Treatment name |
            | Treatment 123  |
        And "Edit" button is displayed for treatment "Treatment 123"
        And "Delete icon" button is displayed for treatment "Treatment 123"

    @Draft
    # Unified only - This scenario will test that Treatment is added successfully
    Scenario: Treatment is added successfully
        Given I select "Unified" Study type
        And I navigate to "Treatments" page
        And I enter following data
            | Label          | Value                                                        |
            | Treatment name | Treatment@123Treatment@123Treatment@123Treatment@123Treatmen |
        When I click "Add" icon button
        Then "Treatment successfully added" snackbar is displayed
        And grid displays following data
            | Treatment name                                               |
            | Treatment@123Treatment@123Treatment@123Treatment@123Treatmen |
        And "Edit" button is displayed for treatment "Treatment@123Treatment@123Treatment@123Treatment@123Treatmen"
        And "Delete icon" button is displayed for treatment "Treatment@123Treatment@123Treatment@123Treatment@123Treatmen"

    @Draft
    # Unified only - This scenario will test that Treatment is added successfully in alphanumeric order
    Scenario: Treatment is added successfully in alphanumeric order
        Given I select "Unified" Study type
        And I navigate to "Treatments" page
        And I enter following data
            | Label          | Value       |
            | Treatment name | Treatment_A |
        And I click "Add" icon button
        And I enter following data
            | Label          | Value          |
            | Treatment name | 123Treatment_B |
        When I click "Add" icon button
        Then grid displays following data
            | Treatment name |
            | 123Treatment_B |
            | Treatment_A    |

    @Draft
    # Unified only - This scenario will test that error message is displayed when Treatment name is not unique
    Scenario: Error message is displayed when Treatment name is not unique
        Given I select "Unified" Study type
        And I navigate to "Treatments" page
        And I enter following data
            | Label          | Value       |
            | Treatment name | Treatment_A |
        And I click "Add" icon button
        And I enter following data
            | Label          | Value       |
            | Treatment name | Treatment_A |
        When I click "Add" icon button
        Then "Treatment name must be unique" snackbar is displayed
        And "Treatment name" field is highlighted
        And treatment "Treatment_A" is not added in the grid

    @Draft
    # Unified only - This scenario will test that Treatment name with unique name is added successfully in the grid
    Scenario: Treatment name with unique name is added successfully in the grid
        Given I select "Unified" Study type
        And I navigate to "Treatments" page
        And I enter following data
            | Label          | Value       |
            | Treatment name | Treatment_A |
        And I click "Add" icon button
        And I enter following data
            | Label          | Value       |
            | Treatment name | Treatment_A |
        And I click "Add" icon button
        And I enter following data
            | Label          | Value       |
            | Treatment name | Treatment_B |
        When I click "Add" icon button
        Then "Treatment name must be unique" snackbar is not displayed
        And grid displays following data
            | Treatment name |
            | Treatment_A    |
            | Treatment_B    |

    @Draft
    # Unified only - This scenario will test that hovering over the row in the grid highlights the row
    Scenario: Hovering over the row in the grid highlights the row
        Given I select "Unified" Study type
        And I navigate to "Treatments" page
        And I enter following data
            | Label          | Value          |
            | Treatment name | Treatment_1.23 |
        And I click "Add" icon button
        When I hover over the treatment "Treatment_1.23" row in the grid
        Then treatment "Treatment_1.23" row is highlighted






