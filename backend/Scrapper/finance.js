import ScrapText from '../ScrapperFunctions/textScrapperFunction.js';
import urlScrapper from '../ScrapperFunctions/imageUrlScrapperFunction.js';
import onClickLinkExtractor from '../ScrapperFunctions/goToUrlScrapper.js';
const url='https://economictimes.indiatimes.com/news/economy/articlelist/1286551815.cms';
const imageSelector='#pageContent > div > div > span > span > img'
const descriptionSelector ='#pageContent > div > div > h3'
const goToUrlSellector ='#pageContent > div > div > h3 > a'
async function finance() {
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
finance()

export default finance