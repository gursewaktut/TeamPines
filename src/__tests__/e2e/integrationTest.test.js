jest.setTimeout(10000);
const webdriver = require("selenium-webdriver");
const By = webdriver.By; // useful Locator utility to describe a query for a WebElement
const driver = new webdriver.Builder().forBrowser("firefox").build();
const actions = driver.actions({bridge: true});
// Instantiate a web browser page
describe('LanguageSelection', () => {
  it('checks if the language selected is the same as language being used', async () => {
    await driver.navigate().to("localhost:3000/")
      .then(() => driver.findElement(By.id("getstarted")))
      .then(element => element.click())
      .then(() => driver.findElement(By.id("Python")))
      .then(element => element.click())
      .then(() => driver.findElement(By.id("languages")))
      .then(element => element.getAttribute('value'))
      .then(value => {
        console.log(value);
        expect(value).toBe('python');
        driver.quit();
      });
  });
  //.then(driver.quit());
});
