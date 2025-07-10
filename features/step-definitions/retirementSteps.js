const { Given, When, Then } = require('@wdio/cucumber-framework');
const RetirementCalculatorPage = require('../../pageobjects/RetirementCalculator.page');
const RetirementCalculatorResultPage = require('../../pageobjects/RetirementCalculatorResult.page');
const testData = require('../../testdata/retirementData.json');

Given('I open the retirement calculator page', async () => {
    await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
    await browser.waitUntil(
    async () => (await browser.getTitle()) === 'How Much to Save for Retirement | Securian Financial',
    {
      timeout: 5000,
      timeoutMsg: 'Page title did not match expected within 10 seconds'
    }
  );
    // Accept cookie
    const cookieButton = await $('#onetrust-accept-btn-handler');
    if (await cookieButton.isDisplayed()) {
        await cookieButton.click();
        
    }
});

When('I fill only required fields', async () => {
  await RetirementCalculatorPage.fillOnlyRequiredFields(testData.requiredFields);
});

Then('I click the calculate button', async () => {
  await RetirementCalculatorPage.clickCalculateButton();
});

Then('I should see the results section', async () => {
    await RetirementCalculatorResultPage.resultHeaderValue();
});

When('I toggle social security benefits off', async () => {
  await RetirementCalculatorPage.setSocialSecurity(testData.socialSecurity.disabled);
});

Then('the social security fields should be hidden', async () => {
  await RetirementCalculatorPage.verifySocialSecurityFieldsVisible(false);
});

When('I toggle social security benefits on', async () => {
  await RetirementCalculatorPage.setSocialSecurity(testData.socialSecurity.enabled);
});

Then('the social security fields should be visible', async () => {
  await RetirementCalculatorPage.verifySocialSecurityFieldsVisible(true);
});

When('I fill all fields', async () => {
  await RetirementCalculatorPage.fillAllFields(testData.allFields);
});

When('I change default calculator values', async () => {
  await RetirementCalculatorPage.changeDefaultCalculatorValues(testData.defaultValues);
});