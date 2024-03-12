import puppeteer from "puppeteer";

const urlScrapper = async (url, selector) => {
    const browser = await puppeteer.launch({
        timeout: 60000, // 60 seconds
      });
    const page = await browser.newPage();
    await page.setDefaultTimeout(60000);
    await page.goto(url);
    await page.waitForSelector(selector);
    const imageUrls = await page.$$eval(selector, (images) => {
        return images.map((image) => image.src);
    });
    browser.close();
    return imageUrls;
};

export default urlScrapper;
