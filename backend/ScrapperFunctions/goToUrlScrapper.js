import puppeteer from "puppeteer";

const onClickLinkExtractor = async (url, selector) => {
    const browser = await puppeteer.launch({
        timeout: 60000, // 60 seconds
      });
    const page = await browser.newPage();
    await page.setDefaultTimeout(60000);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector(selector);

    const links = await page.$$eval(selector, links => links.map(a => a.href));

    browser.close();
    return links;
};

export default onClickLinkExtractor;
