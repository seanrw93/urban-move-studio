import { chromium } from 'playwright';
import path from 'path';

const DIR = 'C:/Users/Sean/AppData/Local/Temp/verify-sofia';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });

console.log('Navigating...');
await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });

const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
console.log('Body bg:', bg);

const logoText = await page.textContent('.navbar__logo').catch(() => 'NOT FOUND');
console.log('Logo:', logoText?.trim());

const heroLines = await page.$$eval('.hero__headline-line', els => els.map(e => e.textContent?.trim()));
console.log('Hero headline lines:', heroLines);

await page.screenshot({ path: DIR + '/1-hero.png' });
console.log('Screenshot 1 saved');

await page.evaluate(() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(800);
const cards = await page.$$('.pricing-card');
console.log('Pricing cards:', cards.length);
const recommended = await page.$('.pricing-card--recommended');
console.log('Recommended card:', !!recommended);
await page.screenshot({ path: DIR + '/2-pricing.png' });
console.log('Screenshot 2 saved');

const bookBtns = await page.$$('.pricing-card .button');
console.log('Book buttons:', bookBtns.length);
if (bookBtns[0]) {
  await bookBtns[0].click();
  await page.waitForTimeout(600);
  const modalOpen = await page.$('.booking-modal--open');
  console.log('Modal open:', !!modalOpen);
  const calendar = await page.$('.booking-modal__calendar');
  console.log('Calendar visible:', !!calendar);
  await page.screenshot({ path: DIR + '/3-modal.png' });
  console.log('Screenshot 3 saved');
}

await page.setViewportSize({ width: 375, height: 812 });
const closeBtn = await page.$('.booking-modal__close');
if (closeBtn) await closeBtn.click();
await page.waitForTimeout(300);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.screenshot({ path: DIR + '/4-mobile.png' });
console.log('Screenshot 4 saved');

const burger = await page.$('.navbar__burger');
if (burger) { await burger.click(); await page.waitForTimeout(400); }
await page.screenshot({ path: DIR + '/5-mobile-menu.png' });
console.log('Screenshot 5 saved');

await browser.close();
console.log('DONE');
