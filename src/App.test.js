import puppeteer from "puppeteer";

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
});

test("renders counter", async () => {
  await page.waitForSelector(".header");

  const header = await page.$eval(".header", e => e.innerHTML);
  expect(header).toBe("Counter");
});

test("sets initial state to zero", async () => {
  await page.waitForSelector(".counter-app");

  const count = await page.$eval(".count", e => e.innerHTML);
  expect(count).toBe("0");
});

test("increments counter by 1", async () => {
  await page.waitForSelector(".counter-app");

  await page.click(".increment");
  const count = await page.$eval(".count", e => e.innerHTML);
  expect(count).toBe("1");
});

test("decrements counter by 1", async () => {
  await page.waitForSelector(".counter-app");

  await page.click(".decrement");
  const count = await page.$eval(".count", e => e.innerHTML);
  expect(count).toBe("0");
});

afterAll(() => {
  browser.close();
});
