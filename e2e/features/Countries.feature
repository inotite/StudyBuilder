@countries
Feature: Countries Feature File
    As a User,
    I want to add a Country to the study

    #PBI 51026 - Add Country


    #1
    # Unified only - This scenario will test that "Countries" page displays the customization fields
    Scenario: "Countries" page displays the customization fields
        Given I select "Unified" Study type
        When I navigate to "Countries" page
        Then "COUNTRIES" Title is displayed
        And page displays following data
            | Label        | Fieldtype    | Defaultvalue | Enabled | Placeholder   |
            | Country      | Dropdown     |              | True    | Please select |
            | 12-hour time | Togglebutton | False        | True    |               |
            | Metric Units | Togglebutton | False        | True    |               |
            | Language(s)  | Dropdown     |              | True    | Please select |
        And "Country Code" label is displayed
        And "= MANDATORY" text is displayed
        And asterisk symbol is displayed for "= MANDATORY"
        And "Cancel" icon button is displayed
        And "Add" icon button is displayed
        And Information icon is displayed for "Language(s)" Label
        And Country grid displays following data
            | Country       | Country Code | 12-hour time | Metric Units | Language(s)             |
            | United States | US           | True         | False        | English (United States) |
        And Information icon is displayed for "Language(s)" label in grid
        And "Edit icon" button is displayed for "United States" in grid
        And "Delete icon" button is displayed for "United States" in grid


    #2
    # Unified only - This scenario will test that United States option is not displayed in Country dropdown
    Scenario: United States option is not displayed in Country dropdown
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        When I select "Country" dropdown
        Then "United States" is not displayed in "Country" dropdown


    #3
    # Unified only - This scenario will test that associated country code is displayed for the country selected and is Read only
    Scenario: Associated country code is displayed for the country selected and is Read only
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        And I select "France" from "Country" dropdown
        And "FR" is displayed for "Country Code"
        When I select "Italy" from "Country" dropdown
        Then "IT" is displayed for "Country Code"


    #4
    # Unified only - This scenario will test that Error message is displayed upon clicking Add icon button when no selection is made
    Scenario: Error message is displayed upon clicking Add icon button when no selection is made
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        When I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is displayed
        And "Country" field is highlighted
        And "Language(s)" field is highlighted


    #5
    # Unified only - This scenario will test that selected data is cleared off when click Cancel icon button
    Scenario: Selected data is cleared off when click Cancel icon button
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        And I select "Italy" from "Country" dropdown
        And I select "Italian (Italy)" from "Language(s)" multi-select dropdown
        And I click on the "12-hour time" Togglebutton for country
        And I click on the "Metric Units" Togglebutton for country
        When I click "Cancel" icon button
        Then page displays following data
            | Label        | Fieldtype    | Defaultvalue | Enabled | Placeholder   |
            | Country      | Dropdown     |              | True    | Please select |
            | 12-hour time | Togglebutton | False        | True    |               |
            | Metric Units | Togglebutton | False        | True    |               |
            | Language(s)  | Dropdown     |              | True    | Please select |
        And "" is displayed for "Country Code"


    #6
    # Unified only - This scenario will test that selected data is cleared off when change the country from country dropdown
    Scenario: Selected data is cleared off when change the country from country dropdownn
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        And I select "Italy" from "Country" dropdown
        And I select "Italian (Italy)" from "Language(s)" multi-select dropdown
        And I click on the "12-hour time" Togglebutton for country
        And I click on the "Metric Units" Togglebutton for country
        When I select "France" from "Country" dropdown
        Then page displays following data
            | Label        | Fieldtype    | Value  | Defaultvalue | Enabled | Placeholder   |
            | Country      | Dropdown     | France |              | True    |               |
            | 12-hour time | Togglebutton |        | True         | True    |               |
            | Metric Units | Togglebutton |        | True         | True    |               |
            | Language(s)  | Dropdown     |        |              | True    | Please select |


    #7
    # Unified only - This scenario will test that information text is displayed when hover over the information icon
    Scenario Outline: Information text is displayed when hover over the information icon
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        When I hover over the "info" icon near "<Field>"
        Then "<Text>" should be displayed for "<Field>"
        Examples:
            | Field       | Text                                              |
            | Language(s) | This is the list of Languages added to the study. |

    #8
    # Unified only - This scenario will test that country is added successfully and grid is sorted alphabetically by Name
    Scenario: Country is added successfully and grid is sorted alphabetically by Name
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        And I select "Italy" from "Country" dropdown
        And I select "Italian (Italy)" from "Language(s)" multi-select dropdown
        And I select "English (United States)" from "Language(s)" multi-select dropdown
        And I select "English (United Kingdom)" from "Language(s)" multi-select dropdown
        And I click on the "12-hour time" Togglebutton for country
        And I click on the "Metric Units" Togglebutton for country
        When I click "Add" icon button
        Then "Country successfully added" snackbar "info" is displayed
        And Country grid displays following data
            | Country       | Country Code | 12-hour time | Metric Units | Language(s)                                      |
            | Italy         | IT           | False        | False        | English (United Kingdom),English (United States) |
            | United States | US           | True         | False        | English (United States)                          |


    #9
    # Unified only - This scenario will test that country is not displayed in Country dropdown once added to the grid
    Scenario: Country is not displayed in Country dropdown once added to the grid
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        And I select "Russia" from "Country" dropdown
        And I select "Russian (Russia)" from "Language(s)" multi-select dropdown
        And I click on the "12-hour time" Togglebutton for country
        And I click on the "Metric Units" Togglebutton for country
        And I click "Add" icon button
        And "Country successfully added" snackbar "info" is displayed
        When I select "Country" dropdown
        Then "Russia" is not displayed in "Country" dropdown


    #10
    # Unified only - This scenario will test that hovering over the row in the grid highlights the row
    Scenario: Hovering over the row in the grid highlights the row
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        When I hover over the country "United States" row in the grid
        Then country "United States" row is highlighted


    #11
    # Unified only - This scenario will test that Edit mode displays two buttons and gives the ability to edit data
    Scenario: Edit mode displays two buttons and gives the ability to edit data
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        When I click "Edit icon" button for row "Italy"
        Then "Save changes icon" button is displayed for "Italy" in grid
        And "Cancel icon" button is displayed for "Italy" in grid
        And "Edit icon" button is hidden for "Italy" in grid
        And "Delete icon" button is hidden for "Italy" in grid


    #12
    # Unified only - This scenario will test that previous data is retained when click Cancel icon button in the grid
    Scenario: Previous data is retained when click Cancel icon button in the grid
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        And I click "Edit icon" button for row "Italy"
        And I click on the "12-hour time" Togglebutton for row "Italy"
        And I click on the "Metric Units" Togglebutton for row "Italy"
        And I select "Spanish (Mexico)" from "Language(s)" multi-select dropdown for row "Italy"
        When I click "Cancel icon" button for row "Italy"
        Then Country grid displays following data
            | Country | Country Code | 12-hour time | Metric Units | Language(s)                                      |
            | Italy   | IT           | false        | false        | English (United Kingdom),English (United States) |
        And "Cancel icon" button is hidden for "Italy" in grid
        And "Save changes icon" button is hidden for "Italy" in grid

 
    #13
    # Unified only - This scenario will test that error message is displayed when no mandatory fields are completed in the grid
    Scenario: Error message is displayed when no mandatory fields are completed in the grid
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        And I click "Edit icon" button for country "Italy"
        And I deselect following languages for country "Italy"
            | Language(s)                                                        | Fieldtype |
            | Italian (Italy), English (United States), English (United Kingdom) | Dropdown  |
        When I click "Save changes icon" button for country "Italy"
        Then "Alert: Please address all highlighted fields" text is displayed
        And "Language(s)" field is highlighted for country "Italy"


    #14
    # Unified only - This scenario will test that changes made are successfully saved in the grid
    Scenario: Changes made are successfully saved in the grid
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        And I click "Edit icon" button for row "Italy"
        And I click on the "12-hour time" Togglebutton for row "Italy"
        And I click on the "Metric Units" Togglebutton for row "Italy"
        And I select "Spanish (Mexico), English (Canada)" from "Language(s)" multi-select dropdown for row "Italy"
        When I click "Save changes icon" button for row "Italy"
        Then "Country successfully saved." snackbar "info" is displayed
        And Country grid displays following data
            | Country | Country Code | 12-hour time | Metric Units | Language(s)                               |
            | Italy   | IT           | True         | True         | English (Canada),English (United Kingdom) |
        And "Cancel icon" button is hidden for "Italy" in grid
        And "Save changes icon" button is hidden for "Italy" in grid


    #15
    # Unified only - This scenario will test that country is not deleted upon clicking No on confirmation pop-up
    Scenario: Country is not deleted upon clicking No on Confirmation pop-up
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        And I click "Delete icon" button for country "Italy"
        And Confirmation pop-up with message "The Country will be deleted from this study. Are you sure you want to delete?" is displayed
        When I click "No" button on Confirmation pop-up with message "The Country will be deleted from this study. Are you sure you want to delete?"
        Then Country grid displays following data
            | Country | Country Code | 12-hour time | Metric Units | Language(s)                                                        |
            | Italy   | IT           | True         | True         | English (Canada),English (United Kingdom)                          |


    #16
    # Unified only - This scenario will test that country is not displayed in the grid when delete but displays in country dropdown
    Scenario: Country is not displayed in the grid when delete but displays in country dropdown
        Given I select "Unified" Study type
        And I navigate to "Countries" page
        And I click "Delete icon" button for country "Italy"
        And Confirmation pop-up with message "The Country will be deleted from this study. Are you sure you want to delete?" is displayed
        When I click "Yes" button on Confirmation pop-up with message "The Country will be deleted from this study. Are you sure you want to delete?"
        Then row "Italy" is not displayed in the grid
        And country "Italy" is displayed in "Country" dropdown



