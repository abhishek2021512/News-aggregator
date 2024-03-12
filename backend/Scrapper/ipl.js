import ScrapText from '../ScrapperFunctions/textScrapperFunction.js';
import urlScrapper from '../ScrapperFunctions/imageUrlScrapperFunction.js';
import onClickLinkExtractor from '../ScrapperFunctions/goToUrlScrapper.js';
const url='https://www.iplt20.com/news';
const imageSelector='body > main > section > div.bottom-section-main.w-100.pb-4 > section.col-100.floatLft.text-left.pt-5.pb-4.wru-main > div > div > div.col-md-12.col-lg-12 > div > div > div > div > div.latest-slider-main > a > div.latest-slider-main-img.position-relative > img'
const descriptionSelector ='body > main > section > div.bottom-section-main.w-100.pb-4 > section.col-100.floatLft.text-left.pt-5.pb-4.wru-main > div > div > div.col-md-12.col-lg-12 > div > div > div > div > div.latest-slider-main > a > div.latest-slider-main-bottom'
const goToUrlSellector ='body > main > section > div.bottom-section-main.w-100.pb-4 > section.col-100.floatLft.text-left.pt-5.pb-4.wru-main > div > div > div.col-md-12.col-lg-12 > div > div > div > div > div.latest-slider-main > a'
async function ipl() {
    const articles = [];
    const descriptions = await ScrapText(url, descriptionSelector);
    const imageUrls = await urlScrapper(url, imageSelector);
    const webUrls = await onClickLinkExtractor(url, goToUrlSellector);
    let i = 0;
    while (i < descriptions.length) {
        articles.push({
            description: descriptions[i],
            imageUrl: imageUrls[i],
            webUrl: webUrls[i],
        });
        i++;
    }

    return articles;
}
ipl()

export default ipl