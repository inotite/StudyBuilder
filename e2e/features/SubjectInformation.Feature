@SubjectInformation
Feature: Subject Information

    # PBI 57339 Subject Information - Feature File

    @GET
    #1
    #This scenario will test that when User navigates to Subject Information page appropriate fields is displayed
    Scenario: With "eCOA" Study type selected, Appropriate fields is displayed when the User navigates to "Subject Information" page
        Given I select "eCOA" Study type
        When I navigate to "SubjectInformation" page
        Then page displays following data
            | Label       | Fieldtype | Defaultvalue | Enabled | Placeholder   |
            | Choice Type | Dropdown  |              | True    | Please Select |
        And "SUBJECT INFORMATION" Title is displayed
        And "= MANDATORY" text is displayed
        And asterisk symbol is displayed for "= MANDATORY"

    @Draft
    #2
    #This scenario will test that when User navigates to Subject Information page and selects Free text choice type appropriate fields is displayed
    Scenario: With "eCOA" Study type selected, Appropriate fields are displayed when the User navigates to "Subject Information" page and selects "Free Text" choice type
        Given I select "eCOA" Study Type
        And I navigate to "SubjectInformation" page
        And page displays following data
            | Label       | Fieldtype | Defaultvalue | Enabled | Placeholder   |
            | Choice Type | Dropdown  |              | True    | Please Select |
        When I select "Free Text" from "Choice Type" dropdown
        Then page displays following data
            | Label         | Fieldtype    | Defaultvalue | Enabled | Placeholder        |
            | Name          | Inputtextbox |              | True    | Max 120 characters |
            | Min           | Numberinput  |              | True    | Min                |
            | Max           | Numberinput  |              | True    | Max                |
            | Business Rule | Dropdown     |              | True    | Please Select      |
            | Countries     | Dropdown     |              | True    | Please Select      |
        And "Cancel" icon button is displayed
        And "Add" icon button is displayed

    @Draft
    #3
    #This scenario will test that when User navigates to Subject Information page appropriate fields is displayed and selects "Radio Button" choice type
    Scenario: With "eCOA" Study type selected, Appropriate fields are displayed when the User navigates to "Subject Information" page selects "Radio Button" choice type
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And page displays following data
            | Label       | Fieldtype | Defaultvalue | Enabled | Placeholder   |
            | Choice Type | Dropdown  |              | True    | Please Select |
        When I select "Radio Button" from "Choice Type" dropdown
        Then page displays following data
            | Label         | Fieldtype | Defaultvalue | Enabled | Placeholder        |
            | Name          | Free Text |              | True    | Max 120 characters |
            | Choices       | Hyperlink |              | True    |                    |
            | Business Rule | Dropdown  |              | True    | Please Select      |
            | Countries     | Dropdown  |              | True    | Please Select      |
        And "Cancel" icon button is displayed
        And "Add" icon button is displayed



    @Draft
    #4
    #This scenario will test that when User navigates to Subject Information page appropriate fields is displayed and selects "Date Spinner" choice type
    Scenario: With "eCOA" Study type selected, Appropriate fields are displayed when the User navigates to "Subject Information" page selects "Date Spinner" choice type
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And page displays following data
            | Label       | Fieldtype | Defaultvalue | Enabled | Placeholder   |
            | Choice Type | Dropdown  |              | True    | Please Select |
        When I select "Date Spinner" from "Choice Type" dropdown
        Then page displays following data
            | Label         | Fieldtype | Defaultvalue | Enabled | Placeholder        |
            | Name          | Free Text |              | True    | Max 120 characters |
            | Date Format   | Dropdown  |              | True    | Please Select      |
            | Min / Max     |           |              | True    |                    |
            | Please Select | Hyperlink |              | True    |                    |
            | Business Rule | Dropdown  |              | True    | Please Select      |
            | Countries     | Dropdown  |              | True    | Please Select      |
        And "Cancel" icon button is displayed
        And "Add" icon button is displayed

    @Draft
    #5
    #This scenario will test that when User navigates to Subject Information page appropriate fields is displayed and selects "Number Spinner" choice type
    Scenario: With "eCOA" Study type selected, Appropriate fields are displayed when the User navigates to "Subject Information" page selects "Number Spinner" choice type
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And  page displays following data
            | Label       | Fieldtype | Defaultvalue | Enabled | Placeholder   |
            | Choice Type | Dropdown  |              | True    | Please Select |
        When I select "Number Spinner" from "Choice Type" dropdown
        Then page displays following data
            | Label         | Fieldtype   | Defaultvalue | Enabled | Placeholder        |
            | Name          | Free Text   |              | True    | Max 120 characters |
            | Decimal       | Numberinput |              | True    |                    |
            | Min           | Numberinput |              | True    | Min                |
            | Max           | Numberinput |              | True    | Max                |
            | Business Rule | Dropdown    |              | True    | Please Select      |
            | Countries     | Dropdown    |              | True    | Please Select      |
        And "Cancel" icon button is displayed
        And "Add" icon button is displayed

    @Draft
    #6
    # This scenario will test that when click on Please Select Hyperlink, a pop-up is displayed to select Min and Max Dates
    Scenario: With "eCOA" Study type selected, when click on Please Select Hyperlink, a pop-up is displayed to select Min and Max Dates
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "Date Spinner" from "Choice Type" dropdown
        When I click "Please Select" Hyperlink
        Then pop-up displays following in "Min Date"
            | Label         | Fieldtype    | Defaultvalue | Enabled | Placeholder   |
            | No Min Date   | Checkbox     | False        | True    |               |
            | Select a Date |              |              | True    |               |
            | Choose a Date | Radiobutton  | False        | True    |               |
            | Today         | Radio Button | False        |         |               |
            | Select Range  | Dropdown     |              | True    | Please Select |
            | M             | Numberinput  | 0            | True    |               |
            | D             | Numberinput  | 0            | True    |               |
            | Y             | Numberinput  | 0            | True    |               |
        And "Calendar" icon button is displayed for "Choose a Date" in "Min Date"
        And pop-up displays following in "Max Date"
            | Label         | Fieldtype    | Defaultvalue | Enabled | Placeholder   |
            | No Max Date   | Checkbox     | False        | True    |               |
            | Select a Date |              |              | True    |               |
            | Choose a Date | Radiobutton  | False        | True    |               |
            | Today         | Radio Button | False        | True    |               |
            | Select Range  | Dropdown     |              | True    | Please Select |
            | M             | Numberinput  | 0            | True    |               |
            | D             | Numberinput  | 0            | True    |               |
            | Y             | Numberinput  | 0            | True    |               |
        And "Calendar" icon button is displayed for "Choose a Date" in "Max Date"
        And "Save" button is displayed
        And "Close" button is displayed

    @Validation
    @Draft
    #7
    #This scenario will test that when User navigates to Subject Information page and don't enter value in the mandatory field blank error message is displayed
    Scenario Outline: With "eCOA" Study type selected, Error message is displayed when User doesn't enter a value in the mandatory field
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "<Choice Type>" from "Choice Type" dropdown
        And page displays following data
            | Label   | Fieldtype   | Defaultvalue | Enabled | Placeholder   |
            | <Field> | <Fieldtype> |              | True    | <Placeholder> |
        When I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is displayed
        And "<Field>" field is highlighted
        Examples:
            | Choice Type    | Field       | Value | Fieldtype | Placeholder |
            | Free Text      | Min         |       | Numeric   |             |
            | Free Text      | Max         |       | Numeric   |             |
            | Free Text      | Countries   |       | Dropdown  |             |
            | Radio Button   | Countries   |       | Dropdown  |             |
            | Date Spinner   | Date Format |       | Dropdown  |             |
            | Date Spinner   | Countries   |       | Dropdown  |             |
            | Date Spinner   | Min / Max   |       | Hyperlink |             |
            | Number Spinner | Decimal     |       | Numeric   |             |
            | Number Spinner | Countries   |       | Dropdown  |             |

    @Draft
    #8
    #This scenario will test that when User navigates to Subject Information page User enters value in the mandatory field no error message is displayed
    Scenario Outline: With "eCOA" Study type selected, Error message is not displayed when User enters a value in the mandatory field
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "<Choice Type>" from "Choice Type" dropdown
        And page displays following data
            | Label   | Fieldtype   | Defaultvalue | Enabled | Placeholder   |
            | <Field> | <Fieldtype> |              | True    | <Placeholder> |
        When I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is displayed
        And "<Field>" field is highlighted
        And  I enter following data
            | Label   | Value   | Fieldtype   |
            | <Field> | <Value> | <Fieldtype> |
        When I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is not displayed
        And "<Field>" field is not highlighted
        Examples:
            | Choice Type    | Field       | Value       | Fieldtype | Placeholder |
            | Free Text      | Min         | 1           | Numeric   |             |
            | Free Text      | Max         | 20          | Numeric   |             |
            | Free Text      | Countries   | US          | Dropdown  |             |
            | Radio Button   | Countries   | US          | Dropdown  |             |
            | Date Spinner   | Date Format | DD/MMM/YYYY | Dropdown  |             |
            | Date Spinner   | Countries   | US          | Dropdown  |             |
            | Number Spinner | Decimal     | 2           | Numeric   |             |
            | Number Spinner | Countries   | US          | Dropdown  |             |


    @Draft
    #9
    #This scenario will test that when User navigates to Subject Information page and enters value greater or less than min Max Date error message is displayed
    Scenario Outline: With "eCOA" Study type selected, Error message is displayed when User enter a value greater or less than min Max Date
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "<Choice Type>" from "Choice Type" dropdown
        And page displays following data
            | Label   | Fieldtype   | Defaultvalue | Enabled | Placeholder   |
            | <Field> | <fieldType> |              | True    | <Placeholder> |
        When I click "Add" icon button
        Then "<Error>" message is displayed near the "<Field>"
        And "<Field>" field is highlighted
        Examples:
            | Choice Type    | Field   | Error                       | Value  | Fieldtype |
            | Free Text      | Min     | Value must be between 1-30  | 0      | Numeric   |
            | Free Text      | Max     | Value must be between 1-30  | 31     | Numeric   |
            | Number Spinner | Decimal | Value must be between 0-3   | -1     | Numeric   |
            | Number Spinner | Decimal | Value must be between 0-3   | 2.5555 | Numeric   |
            | Number Spinner | Min     | Value must be between 0-999 | -1     | Numeric   |
            | Number Spinner | Max     | Value must be between 0-999 | 1000   | Numeric   |


    @Draft
    #10
    #This scenario will test that when User navigates to Subject Information page and enters a value within the min and max limit then error message should not be displayed
    Scenario Outline: With "eCOA" Study type selected, Error message is not displayed when User enters a value within the min and max limit
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "<Choice Type>" from "Choice Type" dropdown
        And page displays following data
            | Label   | Fieldtype   | Defaultvalue | Enabled | Placeholder   |
            | <Field> | <fieldType> |              | True    | <Placeholder> |
        When I click "Add" icon button
        Then "<Error>" message is displayed near the "<Field>"
        And "<Field>" field is highlighted
        Examples:
            | Choice Type    | Field   | Error | Value | Fieldtype | Placeholder |
            | Free Text      | Min     |       | 1     | Numeric   |             |
            | Free Text      | Max     |       | 30    | Numeric   |             |
            | Number Spinner | Decimal |       | 1     | Numeric   |             |
            | Number Spinner | Decimal |       | 3     | Numeric   |             |
            | Number Spinner | Min     |       | 1     | Numeric   |             |
            | Number Spinner | Max     |       | 999   | Numeric   |             |



    @Draft
    #11
    #This scenario will test that Fields should accepts only Characters within the min and Max Date
    Scenario Outline: With "eCOA" Study type selected, Fields should accepts only Characters within the min and Max Date
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "<Choice Type>" from "Choice Type" dropdown
        And page displays following data
            | Label       | Fieldtype | Defaultvalue | Enabled | Placeholder   |
            | Choice Type | Dropdown  |              | True    | Please Select |
        When I enter following data
            | Label   | Value   | Fieldtype    |
            | <Field> | <Value> | Inputtextbox |
        Then following data is displayed for fields
            | Label   | Value   | Fieldtype    |
            | <Field> | <Value> | Inputtextbox |
        Examples:
            | ChoiceType     | Field  | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Fieldtype    |
            | Free Text      | Name   | aqm3UmNYqVAwUBMK9rZnBUqV2vkBPv1Lr7HyRvPvzOkAfEqJ8gNTUqqjR45CRzCCuHxRwB7GjTInAua7D9woTWGOObLUqsSaQfCGYh6OTOsFhRcuTTSJMka4Iy5sBwMNJK7GDbPzkOV0FEofjjv8HULcBVC6AT0TyDQM07i2zCPVTEjQ6og3I6MbXq8whba6pXdxkb9k1ZAkSJwO5tdQc998DHoQ4S6tLNn1oaewQVMcP4FN0YsnfeLfrOJpZuhnwmAcWODpbTZ3iDvqXmbmDVHi4Rm5hlJlmepq3Xcyyscyy1EQsCwEdL3v7eCeIvEMlDZ1Qo0ZFkCUwvS7B8tpYPiqEKV8RIxmrBT1n26PLq2WFdREpze9vSnc0WVmsietYiboFzqe2MumcyM8Vzh64C6ZCBayMvrbv5Hjg39iKi2wHtuLSw3gjfpw4GCNTedlWSG9yagynvXwqSTIVKtrUDEIJ9i4PvUxC7QaxQAE9uk3MFY4EpfnXoKNOz4tTuoc7ataQ63EmUWA6nRH3tKdCM5h0XJZQfrQFgB5733HWulUf696gmLfSvNbydCfO5Cs6oxSTRqYXS62w27aY94tOCPwwbN4 | Inputtextbox |
            | Radio Button   | Name   | aqm3UmNYqVAwUBMK9rZnBUqV2vkBPv1Lr7HyRvPvzOkAfEqJ8gNTUqqjR45CRzCCuHxRwB7GjTInAua7D9woTWGOObLUqsSaQfCGYh6OTOsFhRcuTTSJMka4Iy5sBwMNJK7GDbPzkOV0FEofjjv8HULcBVC6AT0TyDQM07i2zCPVTEjQ6og3I6MbXq8whba6pXdxkb9k1ZAkSJwO5tdQc998DHoQ4S6tLNn1oaewQVMcP4FN0YsnfeLfrOJpZuhnwmAcWODpbTZ3iDvqXmbmDVHi4Rm5hlJlmepq3Xcyyscyy1EQsCwEdL3v7eCeIvEMlDZ1Qo0ZFkCUwvS7B8tpYPiqEKV8RIxmrBT1n26PLq2WFdREpze9vSnc0WVmsietYiboFzqe2MumcyM8Vzh64C6ZCBayMvrbv5Hjg39iKi2wHtuLSw3gjfpw4GCNTedlWSG9yagynvXwqSTIVKtrUDEIJ9i4PvUxC7QaxQAE9uk3MFY4EpfnXoKNOz4tTuoc7ataQ63EmUWA6nRH3tKdCM5h0XJZQfrQFgB5733HWulUf696gmLfSvNbydCfO5Cs6oxSTRqYXS62w27aY94tOCPwwbN4 | Inputtextbox |
            | Date Spinner   | Name   | aqm3UmNYqVAwUBMK9rZnBUqV2vkBPv1Lr7HyRvPvzOkAfEqJ8gNTUqqjR45CRzCCuHxRwB7GjTInAua7D9woTWGOObLUqsSaQfCGYh6OTOsFhRcuTTSJMka4Iy5sBwMNJK7GDbPzkOV0FEofjjv8HULcBVC6AT0TyDQM07i2zCPVTEjQ6og3I6MbXq8whba6pXdxkb9k1ZAkSJwO5tdQc998DHoQ4S6tLNn1oaewQVMcP4FN0YsnfeLfrOJpZuhnwmAcWODpbTZ3iDvqXmbmDVHi4Rm5hlJlmepq3Xcyyscyy1EQsCwEdL3v7eCeIvEMlDZ1Qo0ZFkCUwvS7B8tpYPiqEKV8RIxmrBT1n26PLq2WFdREpze9vSnc0WVmsietYiboFzqe2MumcyM8Vzh64C6ZCBayMvrbv5Hjg39iKi2wHtuLSw3gjfpw4GCNTedlWSG9yagynvXwqSTIVKtrUDEIJ9i4PvUxC7QaxQAE9uk3MFY4EpfnXoKNOz4tTuoc7ataQ63EmUWA6nRH3tKdCM5h0XJZQfrQFgB5733HWulUf696gmLfSvNbydCfO5Cs6oxSTRqYXS62w27aY94tOCPwwbN4 | Inputtextbox |            
            | Number Spinner | Name   | aqm3UmNYqVAwUBMK9rZnBUqV2vkBPv1Lr7HyRvPvzOkAfEqJ8gNTUqqjR45CRzCCuHxRwB7GjTInAua7D9woTWGOObLUqsSaQfCGYh6OTOsFhRcuTTSJMka4Iy5sBwMNJK7GDbPzkOV0FEofjjv8HULcBVC6AT0TyDQM07i2zCPVTEjQ6og3I6MbXq8whba6pXdxkb9k1ZAkSJwO5tdQc998DHoQ4S6tLNn1oaewQVMcP4FN0YsnfeLfrOJpZuhnwmAcWODpbTZ3iDvqXmbmDVHi4Rm5hlJlmepq3Xcyyscyy1EQsCwEdL3v7eCeIvEMlDZ1Qo0ZFkCUwvS7B8tpYPiqEKV8RIxmrBT1n26PLq2WFdREpze9vSnc0WVmsietYiboFzqe2MumcyM8Vzh64C6ZCBayMvrbv5Hjg39iKi2wHtuLSw3gjfpw4GCNTedlWSG9yagynvXwqSTIVKtrUDEIJ9i4PvUxC7QaxQAE9uk3MFY4EpfnXoKNOz4tTuoc7ataQ63EmUWA6nRH3tKdCM5h0XJZQfrQFgB5733HWulUf696gmLfSvNbydCfO5Cs6oxSTRqYXS62w27aY94tOCPwwbN4 | Inputtextbox |
            | Number Spinner | Suffix | Centimeter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Inputtextbox |


    @Draft
    #12
    #This scenario will test that Fields should accepts only Characters within the min and Max Date
    Scenario Outline: With "eCOA" Study type selected, Fields should accepts only Characters within the min and Max Date
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "Radio Button" from "Choice Type" dropdown
        And I enter following data
            | Label | Fieldtype | Value           |
            | Name  | Free Text | Patient Initial |
        And I click "Manage Choices" Hyperlink
        And "Add Choice Field Name" pop-up is displayed
        When I enter following data
        And I enter following data
            | Label  | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Fieldtype    |
            | Choice | aqm3UmNYqVAwUBMK9rZnBUqV2vkBPv1Lr7HyRvPvzOkAfEqJ8gNTUqqjR45CRzCCuHxRwB7GjTInAua7D9woTWGOObLUqsSaQfCGYh6OTOsFhRcuTTSJMka4Iy5sBwMNJK7GDbPzkOV0FEofjjv8HULcBVC6AT0TyDQM07i2zCPVTEjQ6og3I6MbXq8whba6pXdxkb9k1ZAkSJwO5tdQc998DHoQ4S6tLNn1oaewQVMcP4FN0YsnfeLfrOJpZuhnwmAcWODpbTZ3iDvqXmbmDVHi4Rm5hlJlmepq3Xcyyscyy1EQsCwEdL3v7eCeIvEMlDZ1Qo0ZFkCUwvS7B8tpYPiqEKV8RIxmrBT1n26PLq2WFdREpze9vSnc0WVmsietYiboFzqe2MumcyM8Vzh64C6ZCBayMvrbv5Hjg39iKi2wHtuLSw3gjfpw4GCNTedlWSG9yagynvXwqSTIVKtrUDEIJ9i4PvUxC7QaxQAE9uk3MFY4EpfnXoKNOz4tTuoc7ataQ63EmUWA6nRH3tKdCM5h0XJZQfrQFgB5733HWulUf696gmLfSvNbydCfO5Cs6oxSTRqYXS62w27aY94tOCPwwbN4u | Inputtextbox |
        And I click "Add" icon button
        And grid displays following data
            | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
            | aqm3UmNYqVAwUBMK9rZnBUqV2vkBPv1Lr7HyRvPvzOkAfEqJ8gNTUqqjR45CRzCCuHxRwB7GjTInAua7D9woTWGOObLUqsSaQfCGYh6OTOsFhRcuTTSJMka4Iy5sBwMNJK7GDbPzkOV0FEofjjv8HULcBVC6AT0TyDQM07i2zCPVTEjQ6og3I6MbXq8whba6pXdxkb9k1ZAkSJwO5tdQc998DHoQ4S6tLNn1oaewQVMcP4FN0YsnfeLfrOJpZuhnwmAcWODpbTZ3iDvqXmbmDVHi4Rm5hlJlmepq3Xcyyscyy1EQsCwEdL3v7eCeIvEMlDZ1Qo0ZFkCUwvS7B8tpYPiqEKV8RIxmrBT1n26PLq2WFdREpze9vSnc0WVmsietYiboFzqe2MumcyM8Vzh64C6ZCBayMvrbv5Hjg39iKi2wHtuLSw3gjfpw4GCNTedlWSG9yagynvXwqSTIVKtrUDEIJ9i4PvUxC7QaxQAE9uk3MFY4EpfnXoKNOz4tTuoc7ataQ63EmUWA6nRH3tKdCM5h0XJZQfrQFgB5733HWulUf696gmLfSvNbydCfO5Cs6oxSTRqYXS62w27aY94tOCPwwbN4 |


    @Draft
    #13
    # This scenario will test that when user click Date format dropdown in the Date Spinner Choice type a list will be displayed
    Scenario Outline: With "eCOA" Study type selected, A list should be displayed when user click Date Format field
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "Date Spinner" from "Choice Type" dropdown
        When I click "Date Format" dropdown
        Then "<DateFormat>" is displayed in "Date Format" dropdown
        Examples:
            | DateFormat  |
            | dd/MMM/yyyy |
            | MMM/yyyy    |
            | yyyy        |

    @Draft
    #14
    # This scenario will test that Numberinput in Min/Max Dates accepts upto 3 digits
    Scenario Outline: With "eCOA" Study type selected, Numberinput in Min/Max Dates accepts upto 3 digits
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "Date Spinner" from "Choice Type" dropdown
        And I click "Please Select" Hyperlink
        And I enter "<Value>" in "M" in "Min Date"
        And I enter "<Value>" in "D" in "Min Date"
        And I enter "<Value>" in "Y" in "Min Date"
        And I enter "<Value>" in "M" in "Max Date"
        And I enter "<Value>" in "D" in "Max Date"
        When I enter "<Value>" in "Y" in "Max Date"
        Then "<ValidValue>" is displayed in "M" in "Min Date"
        And "<ValidValue>" is displayed in "D" in "Min Date"
        And "<ValidValue>" is displayed in "Y" in "Min Date"
        And "<ValidValue>" is displayed in "M" in "Max Date"
        And "<ValidValue>" is displayed in "D" in "Max Date"
        And "<ValidValue>" is displayed in "Y" in "Max Date"

        Examples:
            | Value | ValidValue |
            | 1     | 1          |
            | .     |            |
            | 999   | 999        |
            | 9999  | 999        |


    @Draft
    #15
    # This scenario will test that error message is displayed when min/Max Dates are not set for Date Spinner
    Scenario: With "eCOA" Study type selected, error message is displayed when min/Max Dates are not set for Date Spinner
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "Date Spinner" from "Choice Type" dropdown
        And I click "Please Select" Hyperlink
        When I click "Save" button
        Then "Alert: Please address all highlighted fields" text is displayed
        And "No Min Date" checkbox is highlighted for "Min Date"
        And "Choose a Date" is highlighted in "Min Date"
        And "Today" is highlighted in "Min Date"
        And "Select Range" dropdown is highlighted in "Min Date"
        And "No Min Date" checkbox is highlighted in "Max Date"
        And "Choose a Date" Radiobutton is highlighted in "Max Date"
        And "Today" Radiobutton is highlighted in "Max Date"
        And "Select Range" dropdown is highlighted in "Max Date"

    @Draft
    #16
    # This scenario will test that error message is displayed when range is not selected after selecting a date
    Scenario: With "eCOA" Study type selected, error message is displayed when range is not selected after selecting a date
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "Date Spinner" from "Choice Type" dropdown
        And I click "Please Select" Hyperlink
        And I select "Today" Radiobutton in "Min Date"
        And I select "Today" Radiobutton in "Max Date"
        When I click "Save" button
        Then "Alert: Please address all highlighted fields" text is displayed
        And "Select Range" dropdown is highlighted in "Min Date"
        And "Select Range" dropdown is highlighted in "Max Date"

    @Draft
    #17
    # This scenario will test that error message is displayed when Min Date is greater than Max Date
    Scenario: With "eCOA" Study type selected, error message is displayed when Min Date is greater than Max Date
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "Date Spinner" from "Choice Type" dropdown
        And I click "Please Select" Hyperlink
        And I select "Today" Radiobutton in "Min Date"
        And I select "Plus +" from "Select Range" dropdown in "Min Date"
        And I select "Today" Radiobutton in "Max Date"
        And I select "Minus -" from "Select Range" dropdown
        And I enter "1" in "D" in "Max Date"
        When I click "Save" button
        Then "Min cannot be greater than Max" text is displayed
        And "Choose a Date" Radiobutton is highlighted in "Min Date"
        And "Today" Radiobutton is highlighted in "Min Date"
        And "Select Range" dropdown is highlighted


    @Draft
    #18
    # This scenario will test that when user select Select All option in the Countries multi select dropdown then all the countries should be listed in the country field
    Scenario: With "eCOA" Study type selected, User select Select All option in the Countries multi select dropdown all the Countries in the list should be selected and displayed
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "Free Text" from "Choice Type" dropdown
        And  I enter following data
            | Label           | Fieldtype    | Value           |
            | Name            | Free Text    | Patient Initial |
            | Disable Numeric | Togglebutton | False           |
            | Min             | Numeric      | 1               |
            | Max             | Numeric      | 15              |
            | Business Rule   | Dropdown     |                 |
        And "Countries" multi-select dropdown displays
            | Select All    |
            | United States |
            | Germany       |
            | France        |
            | Italy         |
        When I select "Select All" from "Countries" multi-select dropdown
        Then "Countries" multi-select dropdown has selected
            | United States |
            | Germany       |
            | France        |
            | Italy         |

    @Draft
    #19
    #This scenario will test that when User navigates to Subject Information page and adds choice type it should be added in Alphabetical order
    Scenario: With "eCOA" Study type selected, when user adds choice type in the Subject Information page Choice type should be added in Alphabetical order
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And I select "Free Text" from "Choice Type" dropdown
        And  I enter following data
            | Label           | Fieldtype    | Value           |
            | Name            | Inputtextbox | Patient Initial |
            | Disable Numeric | Togglebutton | False           |
            | Min             | Numeric      | 1               |
            | Max             | Numeric      | 20              |
            | Business Rule   | Dropdown     | Rule 1          |
            | Countries       | Dropdown     | United States   |
        And I click "Add" icon button
        And "Subject Information successfully added" snackbar "info" is displayed
        And Subject Information grid displays following data
            | Name            | Choice Type | Business Rule | Countries     | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix |
            | Patient Initial | Free Text   | Rule 1        | United States | 1   / 20  | Off             |         |             |         |        |
        And page displays following data
            | Label       | Fieldtype | Defaultvalue | Placeholder   |
            | Choice Type | Dropdown  |              | Please Select |
        And I select "Date Spinner" from "Choice Type" dropdown
        And I enter following data
            | Label         | Fieldtype    | Value         |
            | Name          | Inputtextbox | Birth Date    |
            | Date Format   | Dropdown     | DD/MM/YYYY    |
            | Countries     | Dropdown     | United States |
            | Business Rule | Dropdown     | Rule 1        |
        And I click "Please Select" Hyperlink
        And I select "No Min Date" Checkbox
        And following is disabled
            | Label         | Fieldtype    | Defaultvalue | Enabled | Placeholder   |
            | No Min Date   | Checkbox     | False        | True    |               |
            | Select a Date |              |              | True    |               |
            | Choose a Date | Radiobutton  | False        | True    |               |
            | Today         | Radio Button | False        |         |               |
            | Select Range  | Dropdown     |              | True    | Please Select |
        And I select "No Max Date" Checkbox
        And following is disabled
            | Label         | Fieldtype    | Defaultvalue | Enabled | Placeholder   |
            | No Max Date   | Checkbox     | False        | True    |               |
            | Select a Date |              |              | True    |               |
            | Choose a Date | Radiobutton  | False        | True    |               |
            | Today         | Radio Button | False        | True    |               |
            | Select Range  | Dropdown     |              | True    | Please Select |
        And I click "Save" button
        And pop-up is not displayed
        And "Please Select" Hyperlink is not displayed
        And "Edit" Hyperlink is displayed
        When I click "Add" icon button
        Then "Subject Information successfully added" snackbar "info" is displayed
        And Subject Information grid displays following data
            | Name            | Choice Type  | Business Rule | Countries     | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix |
            | Birth Date      | Date Spinner | Rule 1        | United States | View      |                 |         | DD/MMM/YYYY |         |        |
            | Patient Initial | Free Text    | Rule 1        | United States | 1   / 20  | Off             |         |             |         |        |
        And I select " Number Spinner" from "Choice Type" dropdown
        And I enter following data
            | Label         | Fieldtype | Value                        |
            | Name          | Free Text | Height                       |
            | Decimal       | Numeric   | 2.5                          |
            | Suffix        | Free Text | Centimeter                   |
            | Min           | Numeric   | 0                            |
            | Max           | Numeric   | 888                          |
            | Business Rule | Dropdown  | Rule 2                       |
            | Countries     | Dropdown  | United States,France,Germany |
        When I click "Add" icon button
        Then "Subject Information successfully added" snackbar "info" is displayed
        And Subject Information grid displays following data
            | Name            | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date      | Date Spinner   | Rule 1        | United States                | View      |                 |         | DD/MMM/YYYY |         |            |
            | Height          | Number Spinner | Rule 2        | United States,Germany,France | 0   / 888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial | Free Text      | Rule 1        | United States                | 1   / 20  | Off             |         |             |         |            |


    @Draft
    #20
    # This scenario will test that View Hyperlink in the grid in Min/Max Date column is read only when Date Spinner choice type is added
    Scenario: With "eCOA" Study type selected, View Hyperlink in the grid in Min/Max Date column is read only when Date Spinner choice type is added
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name            | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date      | Date Spinner   | Rule 1        | United States                | View      |                 |         | DD/MMM/YYYY |         |            |
            | Height          | Number Spinner | Rule 2        | United States,Germany,France | 0   / 888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial | Free Text      | Rule 1        | United States                | 1   / 20  | Off             |         |             |         |            |
        When I click "View" hyperlink for "Birth Date" Name in "Min / Max" column in grid
        Then pop-up displays following is disabled for "Min Date"
            | Label         | Fieldtype    | Defaultvalue | Enabled | Placeholder   |
            | No Min Date   | Checkbox     | False        | True    |               |
            | Select a Date |              |              | True    |               |
            | Choose a Date | Radiobutton  | False        | True    |               |
            | Today         | Radio Button | False        |         |               |
            | Select Range  | Dropdown     |              | True    | Please Select |
        And pop-up displays following is disabled for "Max Date"
            | Label         | Fieldtype    | Defaultvalue | Enabled | Placeholder   |
            | No Max Date   | Checkbox     | False        | True    |               |
            | Select a Date |              |              | True    |               |
            | Choose a Date | Radiobutton  | False        | True    |               |
            | Today         | Radio Button | False        | True    |               |
            | Select Range  | Dropdown     |              | True    | Please Select |

    @Draft
    #21
    # This scenario will test that Subject Information is successfully added when select Date Spinner Choice Type with only Max Date selected
    Scenario: With "eCOA" Study type selected, Subject Information is successfully added when select Date Spinner with only Max Date selected
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name            | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date      | Date Spinner   | Rule 1        | United States                | View      |                 |         | DD/MMM/YYYY |         |            |
            | Height          | Number Spinner | Rule 2        | United States,Germany,France | 0   / 888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial | Free Text      | Rule 1        | United States                | 1   / 20  | Off             |         |             |         |            |
        And I select "Date Spinner" from "Choice Type" dropdown
        And I enter following data
            | Label       | Fieldtype    | Value              |
            | Name        | Inputtextbox | Test Date of Birth |
            | Date Format | Dropdown     | DD/MM/YYYY         |
            | Countries   | Dropdown     | United States      |
        And I click "Please Select" Hyperlink
        And I select "No Min Date" Checkbox
        And following is disabled
            | Label         | Fieldtype    | Defaultvalue | Enabled | Placeholder   |
            | No Min Date   | Checkbox     | False        | True    |               |
            | Select a Date |              |              | True    |               |
            | Choose a Date | Radiobutton  | False        | True    |               |
            | Today         | Radio Button | False        |         |               |
            | Select Range  | Dropdown     |              | True    | Please Select |
        And I select "Choose a Date" Checkbox in "Max Date"
        And I click "Calendar icon" button in "Max Date"
        And "Date picker" is displayed in "Max Date"
        And I select "June 01 2000" in "Date picker" in "Max Date"
        And I click "Save" button
        When I click "Add" icon button
        Then "Subject Information successfully added" snackbar "info" is displayed
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |         |             |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |

    @Draft
    #22
    # This scenario will test Subject Information is successfully added when select Date Spinner choice type with only Min Date selected
    Scenario: With "eCOA" Study type selected, Subject Information is successfully added when select Date Spinner choice type with only Min Date selected
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |         |             |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
        And I select "Date Spinner" from "Choice Type" dropdown
        And I enter following data
            | Label       | Fieldtype    | Value           |
            | Name        | Inputtextbox | Test Birth Date |
            | Date Format | Dropdown     | DD/MM/YYYY      |
            | Countries   | Dropdown     | United States   |
        And I click "Please Select" Hyperlink
        And I select "No Max Date" Checkbox
        And following is disabled
            | Label         | Fieldtype    | Defaultvalue | Enabled | Placeholder   |
            | No Max Date   | Checkbox     | False        | True    |               |
            | Select a Date |              |              | True    |               |
            | Choose a Date | Radiobutton  | False        | True    |               |
            | Today         | Radio Button | False        |         |               |
            | Select Range  | Dropdown     |              | True    | Please Select |
        And I select "Choose a Date" Checkbox in "Min Date"
        And I click "Calendar icon" button in "Min Date"
        And "Date picker" is displayed in "Min Date"
        And I select "June 01 2010" in "Date picker" in "Min Date"
        And I click "Save" button
        When I click "Add" icon button
        Then "Subject Information successfully added" snackbar "info" is displayed
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |         |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |

    @Draft
    #23
    # This scenario will test that Subject Information is successfully added when select Date Spinner choice type with Min and Max Dates selected
    Scenario: With "eCOA" Study type selected, Subject Information is successfully added when select Date Spinner choice type with Min and Max Dates selected
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |         |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
        And I select "Date Spinner" from "Choice Type" dropdown
        And I enter following data
            | Label       | Fieldtype    | Value             |
            | Name        | Inputtextbox | Test Min Max Date |
            | Date Format | Dropdown     | DD/MM/YYYY        |
            | Countries   | Dropdown     | United States     |
        And I click "Please Select" Hyperlink
        And I select "Choose a Date" Checkbox in "Min Date"
        And I click "Calendar icon" button in "Min Date"
        And I select "May 01 2010" in "Date picker" in "Min Date"
        And I select "Plus +" in "Select Range" dropdown in "Min Date"
        And I enter "1" in "M" in "Min Date"
        And I enter "1" in "D" in "Min Date"
        And I enter "1" in "Y" in "Min Date"
        And I select "Today" Radiobutton in "Max Date"
        And I select "Minus -" in "Select Range" in "Max Date"
        And I enter "10" in "D" in "Max Date"
        And I click "Save" button
        When I click "Add" icon button
        Then "Subject Information successfully added" snackbar "info" is displayed
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |         |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |

    @Draft
    #24
    #This scenario will test that when User navigates to Subject Information page error message should be displayed when User enters the same Name thats already added
    Scenario Outline: With "eCOA" Study type selected, Error message should be displayed when the User enters the same name that already added
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid contains the following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |         |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
        And I select "Free Text" from "Choice Type" dropdown
        And  I enter following data
            | Label           | Fieldtype    | Value           |
            | Name            | Inputtextbox | Patient Initial |
            | Disable Numeric | Togglebutton | False           |
            | Min             | Numeric      | 1               |
            | Max             | Numeric      | 20              |
            | Business Rule   | Dropdown     | Rule 1          |
        And I select "United States" from "Countries" multi-select dropdown
        And I select "Germany" from "Countries" multi-select dropdown
        When I click "Add" icon
        Then "Name must be unique" snackbar "error" is displayed

    @Draft
    #25
    #This scenario will test that when User clicks OK Add Choice Name pop-up should disppear
    Scenario Outline: With "eCOA" Study type selected, User clicks OK Add Choice Name pop-up should disppear
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |         |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
        And I select "Radio Button" from "Choice Type" dropdown
        And I enter the following
            | Label | Fieldtype | Value  |
            | Name  | Free Text | Gender |
        And I click "Manage Choices" Hyperlink
        And "Add Choice Name" pop-up is displayed
        And "Cancel" icon button is displayed
        And "Add" icon button is displayed
        And "OK" button is displayed
        When I click "OK" icon button on the "Add Choice Name" pop-up
        Then pop-up should disappear

    @Draft
    #26
    # This scenario will test that when user clicks Cancel on the Add Choice Name Pop-up the text field should be empty
    Scenario: With "eCOA" Study type selected, Text field will show empty if user enters text and click cancel on the Add Choice Name pop-up
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |         |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
        And I select "Radio Button" from "Choice Type" dropdown
        And I enter the following
            | Label | Fieldtype | Value  |
            | Name  | Free Text | Gender |
        And I click "Manage Choices" Hyperlink
        And "Add Choice Name" pop-up is displayed
        And "Cancel" icon button is displayed
        And "Add" icon button is displayed
        And "OK" button is displayed
        And I enter "Male" in the Add Choice Field Name
        When I click "Cancel" icon button
        Then text field should be empty

    @Draft
    #27
    #This scenario will test that when edit and delete button is displayed when the User adds choices in the ADD Choice Name field
    Scenario Outline: With "eCOA" Study type selected, Edit and Delete icon should be displayed once the User adds a choice
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |         |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |         |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |         | DD/MMM/YYYY |         |            |
        And I select "Radio Button" from "Choice Type" dropdown
        And I enter the following
            | Label         | Fieldtype | Value      |
            | Name          | Free Text | Gender     |
            | Business Rule | Dropdown  |            |
            | Countries     | Dropdown  | US,Germany |
        And I click "Manage Choices" Hyperlink
        And "Add Choice Name" pop-up should be displayed
        And I enter "Male" in the Add Choice Name field
        And I click "Add" icon button
        And "Male" is displayed  in the Add Choice Name field grid
        And I enter " Female" in the Add Choice Name field
        And I click "Add" icon button
        And "Female" is displayed  in the Add Choice Name field grid
        And I enter "Male 1" in the Add Choice Name field grid
        When I click "Add" icon button
        Then "Male 1" is displayed  in the Add Choice Name field grid
        And "Edit" icon is displayed near the choices
        And "Delete" icon is diplayed near the choices
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |


    @Draft
    # 28
    # This scenario will test that When user click edit icon in the grid following fields should be disabled based on the choice type
    Scenario Outline: With "eCOA" Study type selected, When user click edit icon in the grid following fields should be disabled based on the choice type
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
        When I click "Edit" icon near "<Choice Type>"
        Then following "<Column Name>" is disabled
            | Choice Type    | Column Name                                            | Disabled |
            | Free Text      | Choice Type,Choices,Date format,Decimal,Suffix         | False    |
            | Radio Button   | Choice Type,Disable Numeric,Date Format,Decimal,Suffix | False    |
            | Date Spinner   | Choice Type,Disable Numeric,Choice,Decimal,Suffix      | False    |
            | Number Spinner | Choice Type,Date Format,Choices,Decimal                | False    |


    @Draft
    #29
    #This scenario will test that When User Clicks Cancel in the Add Choice Name pop-up the edit field should not be updated
    Scenario: With "eCOA" Study type selected, When User Clicks Cancel in the Add Choice Name pop-up the edit field should not be updated
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
        And "Add Choice Name" pop-up should be displayed
        And  I click "Edit" icon near "Male 1"
        And I edit "Male 1" to "Male 2" in the Add Choice Name Field
        When I click "Cancel" icon button
        Then "Male 2" is not displayed in the Add Choice Name grid


    @Draft
    #30
    #This scenario will test that When User User click Save icon button in the Add Choice Name grid the edited  field should be updated
    Scenario: With "eCOA" Study type selected, When User click Save icon button in the Add Choice Name grid the edited  field should be updated
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
        And "Add Choice Name" pop-up should be displayed
        And I click "Edit" icon near "Male 1"
        And I edit "Male 1" to "Male 2" in the Add Choice Name Field
        When I click "Save" icon button
        Then "Male 2" is displayed in the Add Choice Name grid

    @Draft
    #31
    #This scenario will test that User is able to add different choices for the same country and same choice type
    Scenario: With "eCOA" Study type selected, User should be able to add choices with same country and same choice type
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid contains the following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices             | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Male 2, Female |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                     |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                     |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |
        And I select "Radio Button" from "Choice Type" dropdown
        And I enter the following
            | Label         | Fieldtype | Value  |
            | Name          | Free Text | Gender |
            | Business Rule | Dropdown  | Rule 1 |
            | Countries     | Dropdown  | German |
        And I click "Manage Choices" Hyperlink
        And "Add Choice Name" pop-up should be displayed
        And I enter "Other" in the Add Choice Name field
        When I click "Add" Icon button on the Add Choice Name pop-up
        And I click "OK" button on the Add Choice Name pop-up
        And Add Choice Name pop-up should disaapear
        Then "Other" is displayed in the Add Choice Name field grid
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices             | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Male 2, Female |             |         |            |
            | Gender             | Radio Button   | Rule 1        | Germany                      |           |                 | Other               |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                     |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                     |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |


    @Draft
    #32
    #This scenario will test that when User should be able to delete a choice from the Add Choice Field Name
    Scenario Outline: With "eCOA" Study type selected, User should be able to delete the choice from Add Choice Field Name
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices             | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Male 2, Female |             |         |            |
            | Gender             | Radio Button   | Rule 1        | Germany                      |           |                 | Other               |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                     |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                     |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                     | DD/MMM/YYYY |         |            |
        And I click "Edit" icon near Gender with Countries United States, Germany
        And I click "Manage Choice" Hyperlink
        And "Add Choice Name" pop-up is displayed
        And I click "Delete" icon near Male 2 row in the ADD Choice Field grid
        Then "Male 2" choice is not displayed in the ADD Choice Field grid


    @Edit
    @Draft
    #33
    #This scenario will test that when User clicks Cancel no data should be updated and no row should be in edit mode
    Scenario: With "eCOA" Study type selected, User clicks Cancel no data should be updated and no row should be in edit mode
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid contains the following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices     | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |             | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female |             |         |            |
            | Gender             | Radio Button   | Rule 1        | Germany                      |           |                 | Other       |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |             |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |             |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |             | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |             | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |             | DD/MMM/YYYY |         |            |
        And I click "Edit" button near the Gender with Countries United States,Germany
        And "Gender" row is the only row that is in edit mode
        And the following fields are
            | Column Name     | Disbaled |
            | Choice Type     | False    |
            | Disable Numeric | False    |
            | Date Format     | False    |
            | Decimal         | False    |
            | Suffix          | False    |
        And I click on "Manage Choices" Hyperlink
        And "Add Choice Name" pop-up is displayed
        And I enter "Male 1" in the "Add Choice Name" field
        And I click "Add" button
        And "Male 1" is added to the Add Choice Name grid
        And I click "OK" button on the Add Choice Name pop-up
        And Add Choice Pop-up should disappear
        When  I click "Cancel" icon button near the Gender with Countries United States
        Then "Male, Female" will be displayed in the Choice Field
        And no row will be edit mode


    @Draft
    #34
    #This scenario will test that when User clicks Save Changes in the subject Information grid then the edited field data should be udpated
    Scenario: With "eCOA" Study type selected, clicks Save Changes in the subject Information grid then the edited field data should be udpated
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid contains the following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Gender             | Radio Button   | Rule 1        | Germany                      |           |                 | Other              |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
        And I click "Edit" button near the Gender with Countries United States,Germany
        And "Date Spinner" row is the only row that is in edit mode with Countries United States
        And I select "France" from Countries multi select dropdown
        When I click "Save Changes" icon button
        Then "Changes Successfully Saved" snackbar "info" is displayed
        And Subject Information grid displays the following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States,France         | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Gender             | Radio Button   | Rule 1        | Germany                      |           |                 | Other              |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |


    @Draft
    #35
    #This scenario will test that when User error message should be displayed in the grid if User leaves a mandatory field blank
    Scenario: With "eCOA" Study type selected, User error message should be displayed in the grid if User leaves a mandatory field blank
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid contains the following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States,France         | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Gender             | Radio Button   | Rule 1        | Germany                      |           |                 | Other              |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
        And I click "Edit" button near the Birth Date with Countries United States
        And Birth Date Row is the only row in edit mode
        And I leave the "Date format" field blank
        When I click "Save Changes" icon button
        Then "Alert: Please address all highlighted fields" error message is displayed


    @Draft
    #36
    #This scenario will test that Confirmation pop-up should be displayed when User wants to delete an attribute
    Scenario: With "eCOA" Study type selected, When user clicks NO on the Confirmation pop-up data should not be updated
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States,France         | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Gender             | Radio Button   | Rule 1        | Germany                      |           |                 | Other              |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
        And I click "Delete" icon button near the Gender with Countries Germany
        And Confirmation pop up with message "The Subject Information will be deleted from this study. Are you sure you want to delete" is displayed
        When I click "No" on the Confirmation pop up with message "The Subject Information will be deleted from this study. Are you sure you want to delete" is displayed
        Then Subject Information grid contains the following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States,France         | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Gender             | Radio Button   | Rule 1        | Germany                      |           |                 | Other              |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |


    @Draft
    #37
    #This scenario will test that Confirmation pop-up should be displayed when User wants to delete an attribute
    Scenario: With "eCOA" Study type selected, When user clicks NO on the Confirmation pop-up data should not be updated
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid displays following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States,France         | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Gender             | Radio Button   | Rule 1        | Germany                      |           |                 | Other              |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
        And I click "Delete" icon button near the Gender with Countries Germany
        And Confirmation pop up with message "The Subject Information will be deleted from this study. Are you sure you want to delete" is displayed
        When I click "Yes" on the Confirmation pop up with message "The Subject Information will be deleted from this study. Are you sure you want to delete" is displayed
        Then Subject Information grid contains the following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States,France         | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |

    @Draft
    #38
    #This scenario will test that Delete icon is grayed out if tied to a Business rule
    Scenario: With "eCOA" Study type selected, Delete icon is grayed out if tied to a Business rule
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And "Radio Button" choice type is tied to a Business rule
        And Subject Information grid contains the following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States,France         | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
        And "Delete" icon button is grayed out near Gender with Countries United States, Germany
        When I hover over the "Delete icon"
        Then "When the details of a Business Rule reference a Subject Information attribute that attribute cannot be deleted" is displayed


    @Draft
    #39
    # This scenario will test that Min/Max Dates are editable in editable mode for Date Spinner choice type
    Scenario: With "eCOA" Study type selected, Min/Max Dates are editable in editable mode for Date Spinner choice type
        Given I select "eCOA" Study type
        And I navigate to "SubjectInformation" page
        And Subject Information grid contains the following data
            | Name               | Choice Type    | Business Rule | Countries                    | Min / Max | Disable Numeric | Choices            | Date Format | Decimal | Suffix     |
            | Birth Date         | Date Spinner   | Rule 1        | United States,France         | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Gender             | Radio Button   | Rule 1        | United States,Germany        |           |                 | Male,Female,Male 1 |             |         |            |
            | Height             | Number Spinner | Rule 2        | United States,Germany,France | 0  /  888 |                 |                    |             | 2.5     | Centimeter |
            | Patient Initial    | Free Text      | Rule 1        | United States                | 1  /  20  | Off             |                    |             |         |            |
            | Test Birth Date    | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Date of Birth | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
            | Test Min Max Date  | Date Spinner   |               | United States                | view      |                 |                    | DD/MMM/YYYY |         |            |
        And I click "Edit icon" button for "Test Min Max Date" Name
        And I click "edit" Hyperlink for "Test Min Max Date" Name
        And I click "Calendar icon" button in "Min Date"
        And I select "Jan 01 2010" in "Date picker" in "Min Date"
        And I click "Save" button
        When I click "Save icon" button for "Test Min Max Date" Name
        Then "Changes successfully saved" snackbar "info" is displayed


