const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[1]/div[2]/div[1]/section[3]/div/div/div/div/section[2]/div[2]/div/ul/li[1]/a/div[2]/div[2]');
    const score = await el.getProperty('textContent');
    const rawScore = await score.jsonValue();

    const [el2] = await page.$x('/html/body/div[1]/div[2]/div[1]/section[3]/div/div/div/div/section[2]/div[2]/div/ul/li[1]/a/div[2]/div[1]/div[1]/span');
    const player1 = await el2.getProperty('textContent');
    const player1Name = await player1.jsonValue();

    const [el3] = await page.$x('/html/body/div[1]/div[2]/div[1]/section[3]/div/div/div/div/section[2]/div[2]/div/ul/li[1]/a/div[2]/div[1]/div[5]/span');
    const player2 = await el3.getProperty('textContent');
    const player2Name = await player2.jsonValue();

    const [el4] = await page.$x('/html/body/div[1]/div[2]/div[1]/section[3]/div/div/div');
    const liveResults = await el3.getProperty('textContent');
    const liveResultsFeed = await liveResults.jsonValue();

    console.log({player1Name, rawScore, player2Name, liveResultsFeed});

    browser.close();
}

scrapeProduct("https://bwfworldtour.bwfbadminton.com/tournament/3748/barcelona-spain-masters-2020/live/")