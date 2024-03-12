import puppeteer from "puppeteer";

const ScrapText=async(url,selector)=>{
    const browser = await puppeteer.launch({
        timeout: 60000, // 60 seconds
      });
    const page = await browser.newPage();
    await page.setDefaultTimeout(60000);
    await page.goto(url);
    await page.waitForSelector(selector);
    const text = await page.$$eval(selector,childs=>{
        return childs.map(child=>child.textContent)
    })
    browser.close()
    return text;
}
export default ScrapText
