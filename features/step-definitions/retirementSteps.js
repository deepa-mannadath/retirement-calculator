const { Given, When, Then } = require('@wdio/cucumber-framework');

Given('I open the retirement calculator page', async () => {
    await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
    await browser.pause(2000);
    // Accept cookie
    const cookieButton = await $('#onetrust-accept-btn-handler');
    if (await cookieButton.isDisplayed()) {
        await cookieButton.click();
        await browser.pause(1000);
    }
});

When('I fill only required fields', async () => {
    await $('#current-age').setValue('30');
    await $('#retirement-age').setValue('65');
    const incomeInput = await $('#current-income');
    await incomeInput.waitForDisplayed();
    await incomeInput.click();
    await browser.pause(300);
    await incomeInput.clearValue();
    await browser.pause(200);
    await incomeInput.addValue('100000');
    await browser.pause(500);
    await $('body').click();
    const totalSavings = await $('#current-total-savings');
    await totalSavings.waitForDisplayed();
    await totalSavings.click();
    await browser.pause(300);
    await totalSavings.clearValue();
    await browser.pause(200);
    await totalSavings.addValue('10000');
    await browser.pause(500);
    await $('body').click();
    await $('#current-annual-savings').setValue('4');
    await $('#savings-increase-rate').setValue('2');
});

Then('I click the calculate button', async () => {
    const calculateBtn = await $('button=Calculate');
    await calculateBtn.waitForDisplayed({ timeout: 10000 });
    await calculateBtn.scrollIntoView();
    await calculateBtn.click();
    await browser.pause(1000);
});

Then('I should see the results section', async () => {
    const resultHeader = await $('h3*=Results');
    await expect(resultHeader).toBeDisplayed();
});

When('I toggle social security benefits off', async () => {
    const toggle = await $('label[for="yes-social-benefits"]');
    if (await toggle.isSelected()) {
        const noToggle = await $('label[for="no-social-benefits"]');
        await noToggle.click();
        await browser.pause(1000);
    }
});

Then('the social security fields should be hidden', async () => {
    const singleMarritalStatus = await $('label[for="single"]');
    expect(await singleMarritalStatus.isDisplayed()).toBe(false);
    const marriedMarritalStatus = await $('label[for="married"]');
    expect(await marriedMarritalStatus.isDisplayed()).toBe(false);
    const overrideInput = await $('#social-security-override');
    expect(await overrideInput.isDisplayed()).toBe(false);
});

When('I toggle social security benefits on', async () => {
    //finding the label instead of the radio button as the label is positioned over the radio button
    const yesToggle = await $('label[for="yes-social-benefits"]');
    if (!(await yesToggle.isSelected())) {
        await yesToggle.click();
        await browser.pause(1000);
    }
});

Then('the social security fields should be visible', async () => {
    //finding the label instead of the radio button as the label is positioned over the radio button
    const singleMarritalStatus = await $('label[for="single"]');
    expect(await singleMarritalStatus.isDisplayed()).toBe(true);
    //finding the label instead of the radio button as the label is positioned over the radio button
    const marriedMarritalStatus = await $('label[for="married"]');
    expect(await marriedMarritalStatus.isDisplayed()).toBe(true);
    const overrideInput = await $('#social-security-override');
    expect(await overrideInput.isDisplayed()).toBe(true);
});

When('I fill all fields', async () => {
    await $('#current-age').setValue('30');
    await $('#retirement-age').setValue('65');
    // Adding this code to overcome the input masking
    const incomeInput = await $('#current-income');
    await incomeInput.waitForDisplayed();
    await incomeInput.click();
    await browser.pause(300);
    await incomeInput.clearValue();
    await browser.pause(200);
    await incomeInput.addValue('100000');
    await browser.pause(500);
    await $('body').click();
    // Adding this code to overcome the input masking
    const totalSavings = await $('#current-total-savings');
    await totalSavings.waitForDisplayed();
    await totalSavings.click();
    await browser.pause(300);
    await totalSavings.clearValue();
    await browser.pause(200);
    await totalSavings.addValue('10000');
    await browser.pause(500);
    await $('body').click();
    // Adding this code to overcome the input masking
    const spouseIncome = await $('#spouse-income');
    await spouseIncome.waitForDisplayed();
    await spouseIncome.click();
    await browser.pause(300);
    await spouseIncome.clearValue();
    await browser.pause(200);
    await spouseIncome.addValue('10000');
    await browser.pause(500);
    await $('body').click();
    await $('#current-annual-savings').setValue('4');
    await $('#savings-increase-rate').setValue('2');
    const yesToggle = await $('label[for="yes-social-benefits"]');
    if (!(await yesToggle.isSelected())) {
        await yesToggle.click();
        await browser.pause(1000);
    }
    await $('#social-security-override').setValue('2000');

});

When('I change default calculator values', async () => {
    // using link text to identify the hyperlink
    const defaultButton = await $('=Adjust default values');
    await defaultButton.scrollIntoView();
    await defaultButton.click();
    await browser.pause(1000);
    const modal = await $('#default-values-modal');
    await modal.waitForDisplayed({ timeout: 10000 });
    await $('#additional-income').clearValue();
    await $('#additional-income').setValue('1000');
    await $('#retirement-duration').setValue('25');
    await $('#retirement-annual-income').setValue('80');
    await $('#pre-retirement-roi').setValue('80');
    await $('#post-retirement-roi').setValue('5');
    const saveButton = await $('button=Save changes');
    await saveButton.scrollIntoView();
    await saveButton.waitForDisplayed({ timeout: 10000 });
    await saveButton.waitForClickable({ timeout: 10000 });
    await saveButton.click();

});