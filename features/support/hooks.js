const { AfterStep } = require('@wdio/cucumber-framework');
const fs = require('fs');
const path = require('path');

AfterStep(async function (stepResult) {
  const step = stepResult.pickle.steps[this.__currentStepIndex || 0];
  const stepText = step.text.replace(/\s+/g, '_');
  const scenarioName = stepResult.pickle.name.replace(/\s+/g, '_');
  const status = stepResult.result.passed ? 'PASSED' : 'FAILED';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${scenarioName}_${stepText}_${status}_${timestamp}.png`;
  const filepath = path.join('./screenshots', filename);

  if (!fs.existsSync('./screenshots')) {
    fs.mkdirSync('./screenshots', { recursive: true });
  }

  await browser.saveScreenshot(filepath);
  console.log(`📸 Screenshot captured: ${filepath}`);

  this.__currentStepIndex = (this.__currentStepIndex || 0) + 1;
});
