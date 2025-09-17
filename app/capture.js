const puppeteer = require('puppeteer');

async function takeScreenshot(url, outputPath) {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  try {
    console.log(`Navigating to ${url}...`);
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    console.log(`Saving screenshot to ${outputPath}...`);
    await page.screenshot({ path: outputPath });
    console.log(`Screenshot saved successfully!`);

  } catch (error) {
    console.error(`Error taking screenshot of ${url}:`, error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

// Export the function so it can be called from other scripts
module.exports = { takeScreenshot };