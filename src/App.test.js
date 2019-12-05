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

test("renders learn react link", async () => {
  await page.waitForSelector(".App");

  const header = await page.$eval(".App-header>p", e => e.innerHTML);
  expect(header).toBe(`Edit <code>src/App.js</code> and save to reload.`);

  const link = await page.$eval(".App-header>a", e => {
    return {
      innerHTML: e.innerHTML,
      href: e.href
    };
  });
  expect(link.innerHTML).toBe(`Learn React`);
  expect(link.href).toBe("https://reactjs.org/");
});

afterAll(() => {
  browser.close();
});
