class RetirementCalculatorPage {
    // Locators
    get currentAgeInput() {
        return $('#current-age');
    }
    get retirementAgeInput() {
        return $('#retirement-age');
    }
    get incomeInput() {
        return $('#current-income');
    }
    get totalSavingsInput() {
        return $('#current-total-savings');
    }
    get spouseIncomeInput() {
        return $('#spouse-income');
    }
    get annualSavingsInput() {
        return $('#current-annual-savings');
    }
    get savingsIncreaseRateInput() {
        return $('#savings-increase-rate');
    }
    get socialSecurityOverrideInput() {
        return $('#social-security-override');
    }
    get calculateButton() {
        return $('button=Calculate');
    }
    // Radio button and labels
    get socialSecurityYesRadio() {
        return $('#yes-social-benefits');
    }
    get yesSocialLabel() {
        return $('label[for="yes-social-benefits"]');
    }
    get noSocialLabel() {
        return $('label[for="no-social-benefits"]');
    }
    get singleLabel() {
        return $('label[for="single"]');
    }
    get marriedLabel() {
        return $('label[for="married"]');
    }
    get overrideInput() {
        return $('#social-security-override');
    }
    // using link text to identify the hyperlink
    get adjustDefaultsLink() {
        return $('=Adjust default values');
    }

    get defaultModal() {
        return $('#default-values-modal');
    }

    get additionalIncomeInput() {
        return $('#additional-income');
    }

    get retirementDurationInput() {
        return $('#retirement-duration');
    }

    get annualRetirementIncomeInput() {
        return $('#retirement-annual-income');
    }

    get preRetirementRoiInput() {
        return $('#pre-retirement-roi');
    }

    get postRetirementRoiInput() {
        return $('#post-retirement-roi');
    }

    get saveChangesButton() {
        return $('button=Save changes');
    }
    // Reusable input method for masked fields
    async enterMaskedValue(element, value) {
        await element.waitForDisplayed();
        await element.click();
        await element.clearValue();
        await element.addValue(value);
        await $('body').click();
    }

    // Method to fill only required fields
    async fillOnlyRequiredFields(data) {
        await this.currentAgeInput.setValue(data.currentAge);
        await this.retirementAgeInput.setValue(data.retirementAge);
        await this.enterMaskedValue(this.incomeInput, data.income);
        await this.enterMaskedValue(this.totalSavingsInput, data.totalSavings);
        await this.annualSavingsInput.setValue(data.annualSavings);
        await this.savingsIncreaseRateInput.setValue(data.savingsRate);
    }

    //Method to click calculate button
    async clickCalculateButton() {
        const btn = await this.calculateButton;
        await btn.waitForDisplayed({ timeout: 3000 });
        await btn.scrollIntoView();
        await btn.waitForClickable({ timeout: 5000 });
        await btn.click();
    }
    //Toggle social security on/off based on value
    async setSocialSecurity(enabled = true) {
        const isSelected = await this.socialSecurityYesRadio.isSelected();

        if (enabled && !isSelected) {
            await this.yesSocialLabel.click();
        } else if (!enabled && isSelected) {
            await this.noSocialLabel.click();
        }
    }
    //Method to Check visibility of social security fields

    async verifySocialSecurityFieldsVisible(expectedVisible = true) {
        const singleVisible = await this.singleLabel.isDisplayed();
        const marriedVisible = await this.marriedLabel.isDisplayed();
        const overrideVisible = await this.overrideInput.isDisplayed();

        expect(singleVisible).toBe(expectedVisible);
        expect(marriedVisible).toBe(expectedVisible);
        expect(overrideVisible).toBe(expectedVisible);
    }
    // Fill all fields with provided test data

    async fillAllFields(data = testData.allFields) {
        await this.currentAgeInput.setValue(data.currentAge);
        await this.retirementAgeInput.setValue(data.retirementAge);

        await this.enterMaskedValue(this.incomeInput, data.income);
        await this.enterMaskedValue(this.totalSavingsInput, data.totalSavings);
        await this.enterMaskedValue(this.spouseIncomeInput, data.spouseIncome);

        await this.annualSavingsInput.setValue(data.annualSavings);
        await this.savingsIncreaseRateInput.setValue(data.savingsIncreaseRate);

        // Enable social security if not already selected
        if (!(await this.socialSecurityYesRadio.isSelected())) {
            await this.yesSocialLabel.click();
        }
        await this.enterMaskedValue(this.socialSecurityOverrideInput, data.socialSecurityOverride);

    }

    //Method for changing Default Calculator Values
    async changeDefaultCalculatorValues(data) {
        await this.adjustDefaultsLink.scrollIntoView();
        await this.adjustDefaultsLink.click();
        await this.defaultModal.waitForDisplayed({ timeout: 10000 });

        await this.enterMaskedValue(this.additionalIncomeInput, data.additionalIncome);
        await this.retirementDurationInput.setValue(data.retirementDuration);
        await this.annualRetirementIncomeInput.setValue(data.annualRetirementIncome);
        await this.preRetirementRoiInput.setValue(data.preRetirementRoi);
        await this.postRetirementRoiInput.setValue(data.postRetirementRoi);
        await this.saveChangesButton.scrollIntoView();
        await this.saveChangesButton.waitForDisplayed({ timeout: 10000 });
        await this.saveChangesButton.waitForClickable({ timeout: 10000 });
        await this.saveChangesButton.click();
    }
    
}

module.exports = new RetirementCalculatorPage();





