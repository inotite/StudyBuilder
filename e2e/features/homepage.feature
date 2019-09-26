@homepage
Feature: StudyBuilder Homepage
   As a user,
   I want to navigate through the YPrime StudyBuilder easily
   So that I can quickly configure my Study.

   #Begin AHA:PBI Base-151 Study Builder - Homepage

   # this scenario will test that there are no icons displayed on the page before a study type is selected
   Scenario: Homepage With No Study Type selected
      Given a web browser is on "Home"
      When I have not selected a Study Type
      Then I do not see any icons on the page

   # this scenario will test that the proper study types are shown when a user selects the study type dropdown
   Scenario Outline: Selecting "<StudyType>" from dropdown
      Given a web browser is on "Home"
      When I click "<StudyType>" on the Study Type dropdown menu
      Then "<OptionValue>" is selected
      And I am able to select a response

      Examples: Study Types
         | StudyType | OptionValue |
         | eCOA      | 0           |
         | IRT       | 1           |
         | Unified   | 2           |


   # this scenario will test that icons are displayed correctly in the category for an eCOA study
   Scenario: icons are displayed correctly in the category for an eCOA study
      Given a web browser is on "Home"
      When I click "eCOA" on the Study Type dropdown menu
      Then the icons are in the right section in the correct order.
         | Category    | icon names                                                                                                                |
         | STUDY SETUP | Study Settings, Languages, Countries, Subject Information, Caregivers                                                     |
         | CONFIGURE   | Questionnaire, Visits, Visit Questionnaires                                                                               |
         | DOCUMENT    | Screen Reports, Data Model, SRD                                                                                           |
         | CUSTOMIZE   | BUSINESS RULES, CALCULATIONS, ALARMS, IMAGES, SUBMIT ACTIONS, EMAIL BUILDER, TRANSLATIONS, WIDGETS, DCF WORKFLOW, REPORTS |

   # this scenario will test that icons are displayed correctly in the category for an IRT study
   Scenario: icons are displayed correctly in the category for an IRT study
      Given a web browser is on "Home"
      When I click "IRT" on the Study Type dropdown menu
      Then the icons are in the right section in the correct order.
         | Category    | icon names                                                                                                                |
         | STUDY SETUP | Study Settings, Languages, Countries, Drug Types, Dose Levels, Treatments                                                 |
         | CONFIGURE   | Questionnaire, Visits, Visit Questionnaires, Dispensation, Drug Return                                                    |
         | DOCUMENT    | Data Model, SRD                                                                                                           |
         | CUSTOMIZE   | BUSINESS RULES, CALCULATIONS, ALARMS, IMAGES, SUBMIT ACTIONS, EMAIL BUILDER, TRANSLATIONS, WIDGETS, DCF WORKFLOW, REPORTS |

   # this scenario will test that icons are displayed correctly in the category for an Unified study
   Scenario: icons are displayed correctly in the category for an Unified study
      Given a web browser is on "Home"
      When I click "Unified" on the Study Type dropdown menu
      Then the icons are in the right section in the correct order.
         | Category    | icon names                                                                                                                |
         | STUDY SETUP | Study Settings, Languages, Countries, Subject Information, Caregivers, Drug Types, Dose Levels, Treatments                |
         | CONFIGURE   | Questionnaire, Visits, Visit Questionnaires, Dispensation, Drug Return                                                    |
         | DOCUMENT    | Screen Reports, Data Model, SRD                                                                                           |
         | CUSTOMIZE   | BUSINESS RULES, CALCULATIONS, ALARMS, IMAGES, SUBMIT ACTIONS, EMAIL BUILDER, TRANSLATIONS, WIDGETS, DCF WORKFLOW, REPORTS |

   # this scenario will test that icons codes are displayed correctly for the icon names for an Unified study
   Scenario: icons codes are displayed correctly for the icon names for an Unified study
      Given a web browser is on "Home"
      When I click "Unified" on the Study Type dropdown menu
      Then the icons are displayed on the page with the correct class.
         | icon names           | icon codes             |
         | Study Settings       | fa-cogs                |
         | Languages            | fa-language            |
         | Countries            | fa-globe-americas      |
         | Subject Information  | fa-users-cog           |
         | Caregivers           | fa-user-md             |
         | Drug Types           | fa-pills               |
         | Dose Levels          | fa-sort-amount-up      |
         | Treatments           | fa-random              |
         | Questionnaire        | fa-book-open           |
         | Visits               | fa-hospital            |
         | Visit Questionnaires | fa-question            |
         | Dispensation         | fa-prescription-bottle |
         | Drug Return          | fa-truck               |
         | Screen Reports       | fa-chart-line          |
         | Data Model           | fa-table               |
         | SRD                  | fa-file                |

   #this negative scenario will test that the incorrect icons do not display on the screen based on the study type selected
   Scenario Outline: Homepage Hiding Icons With "<StudyType>" selected
      Given a web browser is on "Home"
      When I click "<StudyType>" on the Study Type dropdown menu
      Then "<icon names>" icon names are not displayed on the page
      And "<icon codes>" icon codes are not displayed on the page

      Examples: Study Type Icons
         | StudyType | icon names                                                     | icon codes                                                               |
         | eCOA      | Drug Types, Dose Levels, Treatments, Dispensation, Drug Return | fa-pills, fa-sort-amount-up, fa-random, fa-prescription-bottle, fa-truck |
         | IRT       | Subject Information, Caregivers, Screen Reports                | fa-users-cog, fa-user-md, fa-chart-line                                  |

   # this scenario will test that the navigation bar is not visible when a user is on the StudyBuilder Homepage
   Scenario: Navigation bar not visible when user is on StudyBuilder Homepage
      Given a web browser is on "Home"
      Then Navigation bar is not visible to a user

   # this scenario will test that when clicking on the links and icons on tha page the user is directed to the proper page
   Scenario Outline: Navigating to "<Page>" when "Unified" is selected
      Given a web browser is on "Home"
      When I click "Unified" on the Study Type dropdown menu
      And I click on a "<Icon>" Icon
      Then I am re-directed to the "<Page>"

      Examples: Pages
         | Icon                | Page                |
         | Questionnaire       | Questionnaires      |
         | Study Settings      | Study Settings      |
         | Languages           | Languages           |
         | Countries           | Countries           |
         | Subject Information | Subject Information |
         | Caregivers          | Caregivers          |
         | Drug Types          | Drug Types          |
         | Dose Levels         | Dose Levels         |
         | Treatments          | Treatments          |
         | Dispensation        | Dispensation        |
         | Drug Return         | Drug Return         |
         | Visits              | Visits              |
         | Screen Reports      | Screen Reports      |
         | Data Model          | Data Model          |
         | SRD                 | SRD                 |
         | BUSINESS RULES      | Business Rules      |
         | CALCULATIONS        | Calculations        |
         | ALARMS              | Alarms              |
         | IMAGES              | Images              |
         | SUBMIT ACTIONS      | Submit Actions      |
         | EMAIL BUILDER       | Email Builder       |
         | TRANSLATIONS        | Translations        |
         | WIDGETS             | Widgets             |
         | DCF WORKFLOW        | DCF Workflow        |
         | REPORTS             | Reports             |

   Scenario: Footer tag present when on home page
      Given a web browser is on "Home"
      Then The footer component should load

# End AHA:PBI Base-151 Study Builder - Homepage
