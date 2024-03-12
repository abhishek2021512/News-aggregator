import ScrapText from '../ScrapperFunctions/textScrapperFunction.js';
import urlScrapper from '../ScrapperFunctions/imageUrlScrapperFunction.js';
import onClickLinkExtractor from '../ScrapperFunctions/goToUrlScrapper.js';

const pageUrl = 'https://www.wwe.com/news/';
const desptionSelector = 'body > div.l-page > div.wwe-landing-page.wwe-landing-page--author.news.ng-scope > div.ng-scope > div > div > div.wwe-landing-page-content > div > div > div.card-copy > h2';
const imageSelector = 'body > div.l-page > div.wwe-landing-page.wwe-landing-page--author.news.ng-scope > div.ng-scope > div > div > div.wwe-landing-page-content > div > div > div.card-image-area > div > a > div > img';
const webUrlSelector = 'body > div.l-page > div.wwe-landing-page.wwe-landing-page--author.news.ng-scope > div.ng-scope > div > div > div.wwe-landing-page-content > div > div > div.card-image-area > div > a';

async function wweScrapper() {
   const articles = [];
   const descriptions = await ScrapText(pageUrl, desptionSelector);
   const imageUrls = await urlScrapper(pageUrl, imageSelector);
   const webUrls = await onClickLinkExtractor(pageUrl, webUrlSelector);
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

wweScrapper();
export default wweScrapper;

