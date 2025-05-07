// Dependencies
const axios = require("axios"); // HTTP Client
const cheerio = require("cheerio"); // HTML parser, good for static pages
const puppeteer = require("puppeteer-extra"); // Headless Browser, good for dynamic pages
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(stealthPlugin());

console.log("Scrape has been run");

async function getKoboCoverImg() {
    // May want to use puppeteer to do a search to get the book
        // Jumping through many -# versions could be problematic compared to navigating more of the website

    // the -# here gives different books of this name(or editions), sometimes there is no book/page relating to it
    // in that case I need to have a behavior/timeout. I think I should iterate through a few pages
    // based on the name and then display image results to the viewer
    // sometimes for unique book names with only 1 edition there is no -#
    const url = "https://www.kobo.com/us/en/ebook/the-blade-itself-4";

    // Setup for puppeteer
    const browser = await puppeteer.launch({
        headless:true,
    });
    const page = await browser.newPage();

    // Navitage to the page and wait till the network is idle
    const options = {waitUntil: "networkidle2"}; // can try 0 also
    await page.goto(url, options);

    // Wait for the cover image to load
    const elementImg = "img.cover-image"
    await page.waitForSelector(elementImg);

    // Extract the src attribute of the cover image
    const coverUrl = await page.$eval(elementImg, img => img.src);
    const splitUrl = coverUrl.split("/");
    // Remove parts of the URL that resize the image
    const startIndex = -5;
    const deleteItems = 4;
    splitUrl.splice(startIndex, deleteItems);
    const fullResUrl = splitUrl.join("/");
    console.log(fullResUrl);
     

    await browser.close();
}

getKoboCoverImg();