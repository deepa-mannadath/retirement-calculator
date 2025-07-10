class RetirementCalculatorResultPage {
  // Locators
  get resultHeader() {
    return $('h3*=Results');
  }

  // Method to check the result header
  async resultHeaderValue() {
    await expect(this.resultHeader).toBeDisplayed();
  }
}
module.exports = new RetirementCalculatorResultPage();