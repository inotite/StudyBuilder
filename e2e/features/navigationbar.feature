@navigationbar
Feature: StudyBuilder NavigationBar
   As a user,
   I want to navigate through the YPrime StudyBuilder easily
   So that I can quickly configure my Study.

   # Begin AHA:PBI BASE-589 Study Builder Navigation Bar

   # this scenario will test that the navigation bar is visible when a user is within the StudyBuilder but not
   Scenario Outline: Navigation bar is visible on the <Page> page
      Given a web browser is on "Home"
      When I navigate to the "<Page>" page
      Then I am able to view the navigation bar
      And Footer text Copyright YYYY Powered by YPrime, Inc. is displayed 

      # These pages will need to be the syntax that they follow in the URL. No spaces between words.
      Examples: Pages
         | Page                  |

         | Study Settings        |
         | Languages             |
         | Countries             |
         | Subject Information   |
         | Caregivers            |
         | Drug Types            |
         | Dose Levels           |
         | Treatments            |
         | Questionnaire         |
         | Visits                |
         | Visit Questionnaires  |
         | Dispensation          |
         | Drug Return           |
         | Screen Reports        |
         | Data Model            |
         | SRD                   |

         | BUSINESS RULES        |
         | CALCULATIONS          |
         | ALARMS                |
         | IMAGES                |
         # | Study Files          |
         | SUBMIT ACTIONS        |
         | EMAIL BUILDER         |
         | TRANSLATIONS          |
         | WIDGETS               |
         | DCF WORKFLOW          |
         | REPORTS               |


   # this scenario will test that the navigation bar has the correct buttons displayed
   Scenario Outline: Navigation bar is visible and displays the correct buttons
      Given a web browser is on "Home"
      When I go to a page where the Navigation Bar is present
      Then I am able to view the "<Icon>" icon
      And I am able to view the "<Button>" button
      And I am able to view the YPrime logo

      Examples:
         | Icon                    | Button                                      |
         | fa-home, fa-user-circle | Study Setup, Configure, Document, Customize |


   # eCOA Only - this scenario will test that when clicking on items in the navigation bar that nested options display properly
   Scenario Outline: "<Category>" dropdown options display correctly when navigation bar options are displayed for an eCOA study
      Given I am working in a "eCOA" study
      When I go to a page where the Navigation Bar is present
      And I select the "<Category>" category
      Then I am able to view "<Menu Option>" in the navigation bar
      But I am not able to see "<Hidden Menu Option>" in the navigation bar

      Examples:
         | Category    | Menu Option                                                                                                               | Hidden Menu Option                  |
         | Study Setup | Study Settings, Languages, Countries, Subject Information, Caregivers                                                     | Drug Types, Dose Levels, Treatments |
         | Configure   | Questionnaire, Visits, Visit Questionnaires                                                                               | Dispensation, Drug Return           |
         | Document    | Screen Reports, Data Model, SRD                                                                                           |                                     |
         | Customize   | Business Rules, Calculations, Alarms, Images, Submit Actions, Email Builder, Translations, Widgets, DCF Workflow, Reports |                                     |

   # IRT Only - this scenario will test that when clicking on items in the navigation bar that nested options display properly
   Scenario Outline: "<Category>" dropdown options display correctly when navigation bar options are displayed for an IRT study
      Given I am working in a "IRT" study
      When I go to a page where the Navigation Bar is present
      And I select the "<Category>" category
      Then I am able to view "<Menu Option>" in the navigation bar
      But I am not able to see "<Hidden Menu Option>" in the navigation bar

      Examples:
         | Category    | Menu Option                                                                                                               | Hidden Menu Option              |
         | Study Setup | Study Settings, Languages, Countries, Drug Types, Dose Levels, Treatments                                                 | Subject Information, Caregivers |
         | Configure   | Questionnaire, Visits, Visit Questionnaires, Dispensation, Drug Return                                                    |                                 |
         | Document    | Data Model, SRD                                                                                                           | Screen Reports                  |
         | Customize   | Business Rules, Calculations, Alarms, Images, Submit Actions, Email Builder, Translations, Widgets, DCF Workflow, Reports |                                 |


   # Unified only - This scenario will test that when clicking on the items in the navigation bar that nested options display correctly
   Scenario Outline: "<Category>" dropdown options display correctly when navigation bar options are displayed for an Unified study
      Given I am working in a "Unified" study
      When I go to a page where the Navigation Bar is present
      And I select the "<Category>" category
      Then I am able to view "<Menu Option>" in the navigation bar

      Examples:
         | Category    | Menu Option                                                                                                               |
         | Study Setup | Study Settings, Languages, Countries, Subject Information, Caregivers, Drug Types, Dose Levels, Treatments                |
         | Configure   | Questionnaire, Visits, Visit Questionnaires, Dispensation, Drug Return                                                    |
         | Document    | Screen Reports, Data Model, SRD                                                                                           |
         | Customize   | Business Rules, Calculations, Alarms, Images, Submit Actions, Email Builder, Translations, Widgets, DCF Workflow, Reports |

   # Unified only - This scenario will test that Clicking on the "<Menu Option>" option in the Navigation Bar user is taken to the "<Page>" page for Unified Study
   Scenario Outline: Clicking on the "<Menu Option>" option in the Navigation Bar user is taken to the "<Page>" page for Unified Study
      Given a web browser is on "Home"
      And I go to a page where the Navigation Bar is present
      And I select the "<Category>" category
      When I click on a "<Menu Option>" option from dropdown
      Then I am re-directed to the "<Page>" page

      Examples:
         | Category    | Menu Option          | Page                 |
         | Study Setup | Study Settings       | Study Settings       |
         | Study Setup | Languages            | Languages            |
         | Study Setup | Countries            | Countries            |
         | Study Setup | Subject Information  | Subject Information  |
         | Study Setup | Caregivers           | Caregivers           |
         | Study Setup | Drug Types           | Drug Types           |
         | Study Setup | Dose Levels          | Dose Levels          |
         | Study Setup | Treatments           | Treatments           |
         | Configure   | Questionnaire        | Questionnaires       |
         | Configure   | Visits               | Visits               |
         | Configure   | Visit Questionnaires | Visit Questionnaires |
         | Configure   | Dispensation         | Dispensation         |
         | Configure   | Drug Return          | Drug Return          |
         | Document    | Screen Reports       | Screen Reports       |
         | Document    | Data Model           | Data Model           |
         | Document    | SRD                  | SRD                  |
         | Customize   | Business Rules       | Business Rules       |
         | Customize   | Calculations         | Calculations         |
         | Customize   | Alarms               | Alarms               |
         | Customize   | Images               | Images               |
         | Customize   | Submit Actions       | Submit Actions       |
         | Customize   | Email Builder        | Email Builder        |
         | Customize   | Translations         | Translations         |
         | Customize   | Widgets              | Widgets              |
         | Customize   | DCF Workflow         | DCF Workflow         |
         | Customize   | Reports              | Reports              |


#End AHA:PBI BASE-589 Study Builder Navigation Bar
