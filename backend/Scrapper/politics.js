import ScrapText from '../ScrapperFunctions/textScrapperFunction.js';
import urlScrapper from '../ScrapperFunctions/imageUrlScrapperFunction.js';
import onClickLinkExtractor from '../ScrapperFunctions/goToUrlScrapper.js';
const url='https://indianexpress.com/section/political-pulse/';
const imageSelector='#section > div > div > div.leftpanel > div.nation > div > div.snaps > a > img'
const descriptionSelector ='#section > div > div > div.leftpanel > div.nation > div > div.img-context > h2'
const goToUrlSellector ='#section > div > div > div.leftpanel > div.nation > div > div.img-context > h2 > a'
async function politics() {
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
            title: null
        });
        i++;
    }
    return articles;
}

export default politics;