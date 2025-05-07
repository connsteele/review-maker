// Dependencies
const axios = require("axios"); // HTTP Client
const cheerio = require("cheerio"); // HTML parser, good for static pages
const puppeteer = require("puppeteer-extra"); // Headless Browser, good for dynamic pages
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(stealthPlugin());

console.log("Scrape has been run");

async function getTest() {

    const url = "https://www.kobo.com/us/en/ebook/howling-dark-4";

    // Setup for puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navitage to the page and wait till the network is idle
    const options = {waitUntil: "networkidle2"}; // can try 2 also
    await page.goto(url, options);

    // Wait for the cover image to load
    // await page.waitForSelector("img.cover-image");

    console.log('Puppeteer page title:', await page.title());
    await browser.close();
}

getTest();