@Images
Feature: Image feature file
    I want to add Images to a study
    so that I can configure a study with Images

    #1
    # This scenario will test that when user navigates to Images page appropriate fields is displayed
    Scenario: With "eCOA" Study type selected, Appropriate fields is displayed when the user navigates to "IMAGES" page
        Given I select "eCOA" Study type
        When I navigate to "Images" page
        Then page displays following data
            | Label        | Fieldtype    | Defaultvalue | Enabled | Placeholder       |
            | Upload Image | Fileupload   |              | True    |                   |
            | Display Name | Inputtextbox |              | True    | Max 60 Characters |
            | File Size    | Textbox      |              | True    |                   |
            | Language     | Dropdown     |              | True    | Please select     |
        And "IMAGES" Title is displayed
        And "= MANDATORY" text is displayed
        And asterisk symbol is displayed for "= MANDATORY"
        And "Cancel" icon button is displayed
        And "Add" icon button is displayed
        And Information icon is displayed for "Language" Label


    #2
    #This scenario will test that when User adds Image it is displayed in the Image Grid
    Scenario: With "eCOA" Study type selected, Image is added to the "Image" Grid
        Given I select "eCOA" Study type
        And  I navigate to "Images" page
        And I upload "Full Body Front Back.jpg" in "Upload Image" field
        And I enter "Full Body Front Back" for "Display Name" text
        And I select "English (United States)" from "Language" dropdown
        And "19.98 KB" is displayed for "File Size"
        When I click "Add" icon button
        Then "Image successfully added" snackbar "info" is displayed
        And Image grid contains following data
            | Display Name         | File Size | Language                |
            | Full Body Front Back | 19.98KB   | English (United States) |
        And "View Image" icon is displayed near "Display Name" field
        And "Edit" icon button is displayed
        And "Delete" icon button is displayed


    #3
    # This scenario will test that the user is not able to Add file that is not png or jpeg file type
    Scenario: With "eCOA" Study type selected, User should not be able to add file that is not png or jpeg file type
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And  I upload "HeadFront.pdf" in "Upload Image" field
        And I enter "Headfront" for "Display Name" text
        When I click "Add" icon button
        Then "Sorry, we could not upload this file. Try saving it in a jpeg or png file type and upload again" snackbar "error" is displayed


    #4
    #This scenario will test that when user do not enter value in the Mandatory Field then MandatoryFields are highlighted and error message is displayed
    Scenario: With "eCOA" Study type selected, User do not enter value in the Mandatory Field then MandatoryFields are highlighted and error message is displayed
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        When I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is displayed
        And "Display Name" field is highlighted
        And Upload Image field is highlighted

    #5
    # This scenario will test that when Users enter value in the Mandatory Field then MandatoryFields are not highlighted and error message disppears
    Scenario: With "eCOA" Study Type selected, MandatoryFields are not highlighted and error message disppears
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I click "Add" icon button
        And "Alert: Please address all highlighted fields" text is displayed
        And "Display Name" field is highlighted
        And Upload Image field is highlighted
        And I upload "Full Body Front Back.jpg" in "Upload Image" field
        And I enter "Full Body Front Back" for "Display Name" text
        And I select "English (United States)" from "Language" dropdown
        When I click "Add" icon button
        Then "Alert: Please address all highlighted fields" text is not displayed
        And "Display Name" field is not highlighted
        And Upload Image field is not highlighted


    #6
    # This scenario will test that user is able to add an image without selecting a Language
    Scenario: With "eCOA" Study type selected, Image is added to the Image grid without selecting "Language" in the Language field
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I upload "Full Body.jpg" in "Upload Image" field
        And I enter "Full Body" for "Display Name" text
        When I click "Add" icon button
        And Image grid contains following data
            | Display Name | File Size | Language |
            | Full Body    | 19.98KB   |          |
        And "View Image" icon is displayed near "Display Name" field
        And "Edit" icon button is displayed
        And "Delete" icon button is displayed

    #7
    # This scenario will test that user is able to enter same image with different languages
    Scenario: With "eCOA" study type selected, User is able to enter same Display Name with different language
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And Image grid contains following data
            | Display Name         | File Size | Language |
            | Full Body Front Back | 89.4kb    | English  |
        And I upload "Full Body.jpg" in "Upload Image" field
        And I enter "Full Body Front Back" for "Display Name" text
        And I select "Spanish (Spain)" from "Language" dropdown
        And "19.98 KB" is displayed for "File Size"
        When I click "Add" icon button
        And Image grid contains following data
            | Display Name         | File Size | Language                |
            | Full Body Front Back | 19.98 KB  | English (United States) |
            | Full Body Front Back | 19.98 KB  | Spanish (Spain)         |
        And "View Image" icon is displayed near "Display Name" field
        And "Edit" icon button is displayed
        And "Delete" icon button is displayed


    #8
    # This scenario will test that when user adds file that exceeds the file sizelimit
    Scenario: With "eCOA" study type selected, Error message is displayed when user adds file that greater than 2MB
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I upload "Headfrontlarge.jpg" in "Upload Image" field
        And I enter "Head Front Large" for "Display Name" text
        And I select "English (United States)" from "Language" dropdown
        When I click "Add" icon button
        Then "File exceeds size limit of 2000KB" snackbar "error" is displayed

    @Draft
    #9
    # This scenario will test that when user hover over Information icon near the Language field tool tip with description is displayed
    Scenario: With "eCOA" study type selected,Tool tip with description is displayed when user hover over the Information icon near Language field
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        When I hover over the "info" icon near "Language"
        Then "This is the list of Languages added to the study." should be displayed for "Language"


    #10
    # This sceanrio will test that when User click CANCEL button no data is updated
    Scenario: With "eCOA" Study type selected, User clicks CANCEL button no data is updated
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I upload "Left Arm.jpg" in "Upload Image" field
        And I enter following data
            | Label        | Value           | Fieldtype    |
            | Display Name | Left Arm        | Inputtextbox |
            | Language     | French (France) | Dropdown     |
        When I click "Cancel" icon button
        Then page displays following data
            | Label        | Fieldtype    | Defaultvalue | Enabled | Placeholder       |
            | Upload Image | Fileupload   |              | True    |                   |
            | Display Name | Inputtextbox |              | True    | Max 60 Characters |
            | File Size    | Textbox      | 0 Bytes      | True    |                   |
            | Language     | Dropdown     |              | True    | Please select     |


    @Draft
    #11
    # This scenario will test that Error message is displayed when user enters same Display Name with same language
    Scenario: With "eCOA" study type selected, User should not be able to enter same Display Name with same language
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And "Image" grid contains the following data
            | Display Name         | File Size | Language |
            | Full Body Front Back | 89.4KB    | English  |
        And I upload "Full Body Front Back" image in "Upload Image" field
        And I edit the form with following data
            | Display Name         | File Size | Language |
            | Full Body Front Back | 89.4KB    | English  |
        When I click "Add" icon button
        Then "Display name must be unique" snackbar is displayed


    #12
    # This scenario will test that when user hover over a row in the grid the row is highlighted
    Scenario: With "eCOA" study type selected, when user hover over a row in the grid the row is highlighted
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And  "Image" grid contains the following data
            | Display Name      | File Size | Language |
            | Head Front Facing | 99.4KB    | English  |
        When I hover over "Full Body Front Back" row in the Image grid
        Then Image "Full Body Front Back" row is highlighted

    @Draft
    #13
    #This scenario will test that user clicks CANCEL user should remain on the image page and no data should be updated
    Scenario: With "eCOA" Study type selected, When user clicks CANCEL user should remain on the image page and no data should be updated
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I uplaod "Left Arm" image in "Upload Image" field
        And I fill form with following data
            | Display Name | File Size | Language |
            | Left Arm     |           | Spanish  |
        And I click "Add" icon button
        And "Image" grid contains following data
            | Display Name | File Size | Language |
            | Left Arm     | 6.4 KB    | Spanish  |
        And I click "Edit" icon button near the "Left Arm" in the "Image" Grid
        And I upload "Left Foot.png"
        And I edit the the following data
            | Display Name | File Size | Language |
            | Left Foot    | 6.4KB     | English  |
        When I click "Cancel" icon button
        Then "Image" grid contains following data
            | Display Name | File Size | Language |
            | Left-Arm     | 6.4KB     | Spanish  |
        And no rows should be editable

    @Draft
    #14
    # This scenario will test that when user clicks Views image icon user is taken to new tab to view the image
    Scenario:  With "eCOA" Study type selected,when user clicks View image icon near File Name Field user is taken to new tab to view the image
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And "Image" grid contains following data
            | Display Name         | File Size | Language |
            | Full Body Front Back | 89.4KB    | English  |
        When I click "View Image" icon near the "Display Name" field
        Then "Full Body Front Back" image is opened in a new tab

    @Draft
    #15
    # This scenario will test that when user clicks the SAVE CHANGES button on the "Image" Grid then the user should be able save the edited field
    Scenario:With "eCOA" Study Type selected, when user clicks "SAVE CHANGES" on the "Image" Grid then the Image should be added and message should be displayed
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I uplaod "Full Body Front Back" image in "Upload Image" field
        And I enter following data
            | Display Name         | File Size | Language |
            | Full Body Front Back |           | Spanish  |
        And I click "Add" icon button
        And "Image" grid contains following data
            | Display Name         | File Size | Language |
            | Full Body Front Back | 6.4 KB    | Spanish  |
        And I click "Edit" icon button near the "Full Body Front Back" in the "Image" Grid
        And I enter following data
            | Display Name | File Size | Language |
            | Full Body    | 2.4KB     | English  |
        When I click "Save Changes" icon button
        Then "Image" grid contains following data
            | Display Name | File Size | Language |
            | Full Body    | 2.4KB     | English  |
        And "Changes successfully saved" snackbar "info" message should disappear in 2 seconds

    @Draft
    #16
    # This scenario will test Warning message will be displayed when user tries to edit image field which is tied to a questonnaire
    Scenario:With "eCOA" Study Type selected,Warning message will be displayed when user tries to edit image field which is tied to a questonnaire
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I uplaod " Left Arm " image in "Upload Image" field
        And I enter following data
            | Display Name | File Size | Language |
            | Left Arm     |           | Spanish  |
        And I click "Add" icon button
        And "Image" grid contains following data
            | Display Name | File Size | Language |
            | Left Arm     | 6.4 KB    | Spanish  |
        And I click "Edit" icon button near the "Left Arm" in the "Image" Grid
        When I upload "Left Foot.png" in "Upload Image" field
        Then Pop-up with message "You are about to replace an active image that is currently tied to a questionnaire.Do you want to proceed" is displayed
        And "No" button is displayed
        And "Yes" button is displayed


    @Draft
    #17
    # This scenario will test user click No on the warning message then pop-up should disappear
    Scenario:With "eCOA" Study Type selected,user click No on the warning message then pop-up should disappear
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I uplaod " Left Arm " image in "Upload Image" field
        And I enter following data
            | Display Name | File Size | Language |
            | Left Arm     |           | Spanish  |
        And I click "Add" icon button
        And "Image" grid contains following data
            | Display Name | File Size | Language |
            | Left Arm     | 6.4 KB    | Spanish  |
        And I click "Edit" icon button near "Left Arm" row in the "Image" Grid
        And Pop-up message "You are about to replace an active image that is currently tied to a questionnaire.Do you want to proceed" is displayed
        When I click "NO" button on the pop-up message
        Then Pop up message "You are about to replace an active image that is currently tied to a questionnaire.Do you want to proceed" should disappear
        And "Left Arm" should be the only row that is in edit mode in the "Image" Grid

    @Draft
    #18
    # This scenario will test user click Yes on the warning message then Browser window should be displayed
    Scenario:With "eCOA" Study Type selected,user click Yes on the warning message then Browser window should be displayed
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I uplaod " Left Arm " image in "Upload Image" field
        And I enter following data
            | Display Name | File Size | Language |
            | Left Arm     |           | Spanish  |
        And I click "Add" icon button
        And "Image" grid contains following data
            | Display Name | File Size | Language |
            | Left Arm     | 6.4 KB    | Spanish  |
        And I click "Edit" icon button near "Left Arm" row in the "Image" Grid
        And Pop-up message "You are about to replace an active image that is currently tied to a questionnaire.Do you want to proceed" is displayed
        When I click "YES" button on the pop up message
        Then upload window should pop up

    @Draft
    #19
    # This scenario will test that when user clicks Delete Icon Confirmation pop-up should be displayed
    Scenario: With "eCOA" Study Type selected, when user clicks the Delete Icon on the Image Grid
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I uplaod "Full Body Front Back" image under the "Upload Image" field
        And I enter following data
            | Display Name         | File Size | Language |
            | Full Body Front Back |           | Spanish  |
        And I click "Add" icon button
        And "Image" grid contains following data
            | Display Name         | File Size | Language |
            | Full Body Front Back | 6.4 KB    | Spanish  |
        When I click "Delete" icon button near "Full Body Front Back" row in the "Image" Grid
        Then Confirmation pop-up with message "Image will be deleted from this study. Are you sure you want to delete?" is displayed

    @Draft
    #20
    # This scenario will test that when user clicks NO Delete Icon Confirmation pop-up should be displayed
    Scenario:With "eCOA" Study Type selected, when user clicks "NO" Delete Icon Confirmation pop-up then Confirmation pop-up should disappear Image should not be removed
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I uplaod "Full Body Front Back" image under the "Upload Image" field
        And I enter following data
            | Display Name         | File Size | Language |
            | Full Body Front Back |           | Spanish  |
        And I click "Add" icon button
        And "Image" grid contains following data
            | Display Name         | File Size | Language |
            | Full Body Front Back | 6.4 KB    | Spanish  |
        And  I click "Delete" icon button near "Full Body Front Back" row in the "Image" Grid
        And Confirmation pop-up with message "Image will be deleted from this study. Are you sure you want to delete?" is displayed
        When I click "NO" button on Confirmation pop-up with message "Image will be deleted from this study. Are you sure you want to delete?"
        Then "Image" Grid contain the following data
            | Display Name         | File Size | Language |
            | Full Body Front Back | 2.4KB     | English  |
        And the User should remain on the "Image" page
        And "Full Body Front Back " row should not be removed from the "Image" Grid


    @Draft
    #21
    # This scenario will test that when user clicks YES on Delete Icon Confirmation pop-up
    Scenario:With "eCOA" Study Type selected, when user clicks YES on the Delete Icon then Confirmation pop-up should disappear and the Image should be removed
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I uplaod "Full Body Front Back" image under the "Upload Image" field
        And I enter following data
            | Display Name         | File Size | Language |
            | Full Body Front Back |           | Spanish  |
        And I click "Add" icon button
        And "Image" grid contains following data
            | Display Name         | File Size | Language |
            | Full Body Front Back | 6.4 KB    | Spanish  |
        And  I click "Delete" icon button near "Full Body Front Back" row in the "Image" Grid
        And Confirmation pop-up with message "Image will be deleted from this study. Are you sure you want to delete?" is displayed
        When I click "YES" button on the Confirmation pop-up with message "Image will be deleted from this study. Are you sure you want to delete?"
        Then "Full Body Front Back" row should be removed from the "Image" Grid
        And Confirmation pop-up should disappear


    @Draft
    #22
    # This scenario will test if Image is tied to a questionnaire and user hover over Delete Icon Delete pop-up text should be displayed
    Scenario:With "eCOA" Study Type selected, User hover over Delete icon button pop-up message should be displayed if Image is tied to Questionnaire
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I uplaod "Head Front" image under the "Upload Image" field
        And I enter following data
            | Display Name | File Size | Language |
            | Head Front   |           | English  |
        And I click "Add" icon button
        And "Image" grid contains following data
            | Display Name | File Size | Language |
            | Head Front   | 6.4 KB    | Englsih  |
        When I hover over "Delete" icon button near "Head Front" row in the "Image" Grid
        Then Pop-up message "This Image is tied to a questionnaire.To delete, please remove Image from questionnaire" is displayed
        And "OK" button is displayed


    @Draft
    #23
    # This scenario will test when user clicks OK button on the Delete Confirmation pop-up
    Scenario:With "eCOA" Study Type selected, when user clicks OK button on the Delete Confirmation pop-up
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I uplaod "Head Front" image under the "Upload Image" field
        And I enter following data
            | Display Name | File Size | Language |
            | Head Front   |           | English  |
        And I click "Add" icon button
        And "Image" grid contains following data
            | Display Name | File Size | Language |
            | Head Front   | 6.4 KB    | Englsih  |
        And  I hover over "Delete" icon button near "Head Front" row in the "Image" Grid
        And  Pop-up message "This Image is tied to a questionnaire.To delete, please remove Image from questionnaire" is displayed
        And "OK" button is displayed
        When I click "OK" button on the Pop-up
        Then "Head Front " should not be deleted from the "Image" Grid
        And User should remain on the "Image" page


    @Draft
    #24
    # This scenario will test that error message is displayed when user edits field with same Image Name
    Scenario:With "eCOA" Study Type selected, Error message should be displayed when the user edits and save the same Image name
        Given I select "eCOA" Study type
        And I navigate to "Images" page
        And I uplaod "Right Arm" image in the "Upload Image" field
        And I enter following data
            | Display Name | File Size | Language |
            | Right Arm    |           | English  |
        And I click "Add" icon button
        And "Image" grid contains following data
            | Display Name | File Size | Language |
            | Right Arm    | 6.4 KB    | Englsih  |
        And I click "Edit" icon button near "Right Arm" row in the "Image" Grid
        And I edit the row with following data
            | Display Name | File Size | Language |
            | Head Front   | 2.4KB     | English  |
        When I click "Save Changes" icon button
        Then "Display name must be unique" snackbar "info" is displayed
