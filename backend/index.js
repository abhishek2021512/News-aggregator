import express from 'express';
import wweScrapper from './Scrapper/wwe.js';
import ipl from './Scrapper/ipl.js';
import finance from './Scrapper/finance.js';
import politics from './Scrapper/politics.js';
import cors from 'cors';

const app = express();
const port = 3000;

let ipldata, wwedata, financedata, politicsdata;

async function mainScrapper() {
  try {
    ipldata = await ipl();
    wwedata = await wweScrapper();
    financedata = await finance();
    politicsdata = await politics();
    
    console.log('Scraping completed');
  } catch (error) {
    console.error('Error scraping data:', error);
  }
}
mainScrapper();

// Middleware to enable CORS
app.use(cors());

// Route to send WWE data
app.get('/wwe', (req, res) => {
  res.json(wwedata);
});

// Route to send IPL data
app.get('/ipl', (req, res) => {
  res.json(ipldata);
});

// Route to send finance data
app.get('/finance', (req, res) => {
  res.json(financedata);
});

// Route to send politics data
app.get('/politics', (req, res) => {
  res.json(politicsdata);
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
