const webdriver = require("selenium-webdriver");
const By = webdriver.By; // useful Locator utility to describe a query for a WebElement
const driver = new webdriver.Builder().forBrowser("firefox").build();
const actions = driver.actions({bridge: true});
// Instantiate a web browser page
driver.navigate().to("localhost:3000")
  .then(() => driver.findElement(By.id("getstarted")))
  .then(element => element.click())
  .then(() => driver.findElement(By.id("python")))
  .then(element => element.click())
  .then(() => driver.findElement(By.id("languages")))
  .then(element => element.getAttribute("value"))
  .then(value => console.log(value))
  .then(() => driver.findElement(By.id("languages")))
  .then(element => element.click());
