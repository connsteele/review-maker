// Dependencies
const axios = require("axios"); // HTTP Client
const cheerio = require("cheerio"); // HTML parser, good for static pages
const puppeteer = require("puppeteer"); // Headless Browser, good for dynamic pages

console.log("Scrape has been run");

async function getTest() {
    // Fetch a page with axios
    const { data: html } = await axios.get('https://example.com');

    // Load into Cheerio
    const $ = cheerio.load(html);
    console.log('Page title:', $('title').text());

    // Launch Puppeteer to automate a browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
    console.log('Puppeteer page title:', await page.title());
    await browser.close();
}

getTest();