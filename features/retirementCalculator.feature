Feature: Securian Retirement Calculator

 Scenario: Submit form with only required fields
    Given I open the retirement calculator page
    When I fill only required fields
    And I click the calculate button
    Then I should see the results section

 Scenario: Social Security toggle shows/hides additional fields
    Given I open the retirement calculator page
    When I toggle social security benefits off
    Then the social security fields should be hidden
    When I toggle social security benefits on
    Then the social security fields should be visible

  Scenario: Submit form with all fields filled
    Given I open the retirement calculator page
    When I fill all fields
    And I click the calculate button
    Then I should see the results section
    
   Scenario: User can update default calculator values
    Given I open the retirement calculator page
    When I fill only required fields
    Then I change default calculator values
    Then I click the calculate button
    Then I should see the results section

