# Screenshot Capture with Puppeteer

## Overview

Automated screenshot capture provides visual evidence for competitive analysis, enabling documentation of competitor websites, pricing pages, product features, and user interfaces. This creates a visual archive for analysis and reporting.

## Setup & Installation

### Puppeteer Installation
```bash
# Install Puppeteer in your project
npm install puppeteer

# Or install globally for CLI usage
npm install -g puppeteer

# For headless browser with full Chrome features
npm install puppeteer-extra puppeteer-extra-plugin-stealth
```

### Project Structure
```
data/[market-name]/
├── screenshots/
│   ├── [company-slug]/
│   │   ├── homepage.png
│   │   ├── pricing.png
│   │   ├── product.png
│   │   ├── about.png
│   │   └── contact.png
│   └── batch-captures/
│       └── [date]/
└── capture-scripts/
    ├── screenshot-competitor.js
    ├── batch-capture.js
    └── capture-config.json
```

## Screenshot Strategy

### Standard Screenshot Types

#### Essential Screenshots (All Competitors)
1. **Homepage**: Primary landing page showing value proposition
2. **Pricing**: Pricing page or plans comparison
3. **Product/Features**: Main product or service description
4. **About**: Company information and team

#### Optional Screenshots (Based on Analysis Needs)
5. **Customers**: Customer logos, case studies, testimonials
6. **Contact**: Contact information and support options
7. **Careers**: Team size indicators and company culture
8. **Resources**: Blog, documentation, knowledge base

### Screenshot Configuration
```json
{
  "screenshotConfig": {
    "viewport": {
      "width": 1920,
      "height": 1080
    },
    "quality": 90,
    "format": "png",
    "fullPage": true,
    "timeout": 30000,
    "waitForSelector": "body",
    "delay": 2000
  },
  "pageTypes": {
    "homepage": {
      "paths": ["/", "/home", "/index"],
      "selectors": ["main", ".hero", ".header"],
      "fullPage": true
    },
    "pricing": {
      "paths": ["/pricing", "/plans", "/subscription", "/cost"],
      "selectors": [".pricing", ".plans", ".subscription"],
      "fullPage": true
    },
    "product": {
      "paths": ["/product", "/features", "/platform", "/solution"],
      "selectors": [".features", ".product", ".platform"],
      "fullPage": true
    },
    "about": {
      "paths": ["/about", "/company", "/team", "/who-we-are"],
      "selectors": [".about", ".company", ".team"],
      "fullPage": false
    }
  }
}
```

## Implementation Scripts

### Individual Competitor Screenshot Script
```javascript
// capture-scripts/screenshot-competitor.js
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class CompetitorScreenshot {
  constructor(config = {}) {
    this.config = {
      viewport: { width: 1920, height: 1080 },
      quality: 90,
      format: 'png',
      timeout: 30000,
      delay: 2000,
      ...config
    };
  }

  async captureCompetitor(company) {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      await page.setViewport(this.config.viewport);

      // Set user agent to avoid blocking
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

      const companySlug = this.createSlug(company.name);
      const screenshotDir = path.join('data', process.env.MARKET_NAME || 'current-market', 'screenshots', companySlug);

      // Create directory if it doesn't exist
      await fs.mkdir(screenshotDir, { recursive: true });

      const results = {
        company: company.name,
        website: company.website,
        captures: {},
        errors: []
      };

      // Define page types to capture
      const pageTypes = {
        homepage: [company.website],
        pricing: this.generatePricingUrls(company.website),
        product: this.generateProductUrls(company.website),
        about: this.generateAboutUrls(company.website)
      };

      for (const [pageType, urls] of Object.entries(pageTypes)) {
        let captured = false;

        for (const url of urls) {
          if (captured) break;

          try {
            console.log(`Capturing ${pageType} for ${company.name}: ${url}`);

            await page.goto(url, {
              waitUntil: 'networkidle2',
              timeout: this.config.timeout
            });

            // Wait for page to load
            await page.waitForTimeout(this.config.delay);

            // Check if page loaded successfully (not 404 or error)
            const title = await page.title();
            if (title.toLowerCase().includes('404') || title.toLowerCase().includes('not found')) {
              continue;
            }

            const screenshotPath = path.join(screenshotDir, `${pageType}.png`);

            await page.screenshot({
              path: screenshotPath,
              quality: this.config.quality,
              type: this.config.format,
              fullPage: true
            });

            results.captures[pageType] = {
              url: url,
              path: screenshotPath,
              timestamp: new Date().toISOString()
            };

            captured = true;
            console.log(`✓ Captured ${pageType} for ${company.name}`);

          } catch (error) {
            console.log(`✗ Failed to capture ${pageType} from ${url}: ${error.message}`);
            results.errors.push({
              pageType,
              url,
              error: error.message
            });
          }
        }

        if (!captured) {
          console.log(`⚠ Could not capture ${pageType} for ${company.name}`);
        }
      }

      // Save capture results
      const resultsPath = path.join(screenshotDir, 'capture-results.json');
      await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));

      return results;

    } finally {
      await browser.close();
    }
  }

  createSlug(name) {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  generatePricingUrls(baseUrl) {
    const paths = ['/pricing', '/plans', '/subscription', '/cost', '/purchase'];
    return paths.map(path => new URL(path, baseUrl).href);
  }

  generateProductUrls(baseUrl) {
    const paths = ['/product', '/features', '/platform', '/solution', '/services'];
    return paths.map(path => new URL(path, baseUrl).href);
  }

  generateAboutUrls(baseUrl) {
    const paths = ['/about', '/company', '/team', '/who-we-are', '/about-us'];
    return paths.map(path => new URL(path, baseUrl).href);
  }
}

module.exports = CompetitorScreenshot;

// CLI usage
if (require.main === module) {
  const company = {
    name: process.argv[2],
    website: process.argv[3]
  };

  if (!company.name || !company.website) {
    console.log('Usage: node screenshot-competitor.js "Company Name" "https://website.com"');
    process.exit(1);
  }

  const capturer = new CompetitorScreenshot();
  capturer.captureCompetitor(company)
    .then(results => {
      console.log('Screenshot capture completed:', results);
    })
    .catch(error => {
      console.error('Screenshot capture failed:', error);
    });
}
```

### Batch Screenshot Script
```javascript
// capture-scripts/batch-capture.js
const CompetitorScreenshot = require('./screenshot-competitor');
const fs = require('fs').promises;
const path = require('path');

class BatchScreenshot {
  constructor(marketName) {
    this.marketName = marketName;
    this.capturer = new CompetitorScreenshot();
  }

  async captureAllCompetitors() {
    try {
      // Load all competitors from category files
      const categoriesDir = path.join('data', this.marketName, 'categories');
      const categoryFiles = await fs.readdir(categoriesDir);

      const allCompetitors = [];

      for (const file of categoryFiles) {
        if (file.endsWith('.json')) {
          const categoryPath = path.join(categoriesDir, file);
          const categoryData = JSON.parse(await fs.readFile(categoryPath, 'utf8'));

          if (categoryData.competitors) {
            allCompetitors.push(...categoryData.competitors);
          }
        }
      }

      console.log(`Found ${allCompetitors.length} competitors to capture`);

      const batchResults = {
        marketName: this.marketName,
        totalCompetitors: allCompetitors.length,
        startTime: new Date().toISOString(),
        results: [],
        summary: {
          successful: 0,
          failed: 0,
          totalScreenshots: 0
        }
      };

      // Process competitors with delay to avoid overwhelming servers
      for (let i = 0; i < allCompetitors.length; i++) {
        const competitor = allCompetitors[i];

        if (!competitor.website) {
          console.log(`Skipping ${competitor.name} - no website`);
          continue;
        }

        console.log(`\nProcessing ${i + 1}/${allCompetitors.length}: ${competitor.name}`);

        try {
          const result = await this.capturer.captureCompetitor(competitor);
          batchResults.results.push(result);
          batchResults.summary.successful++;
          batchResults.summary.totalScreenshots += Object.keys(result.captures).length;

          // Delay between competitors to be respectful
          if (i < allCompetitors.length - 1) {
            console.log('Waiting 5 seconds before next capture...');
            await new Promise(resolve => setTimeout(resolve, 5000));
          }

        } catch (error) {
          console.error(`Failed to capture ${competitor.name}:`, error.message);
          batchResults.results.push({
            company: competitor.name,
            website: competitor.website,
            captures: {},
            errors: [{ error: error.message }]
          });
          batchResults.summary.failed++;
        }
      }

      batchResults.endTime = new Date().toISOString();

      // Save batch results
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const batchDir = path.join('data', this.marketName, 'screenshots', 'batch-captures', timestamp);
      await fs.mkdir(batchDir, { recursive: true });

      const resultsPath = path.join(batchDir, 'batch-results.json');
      await fs.writeFile(resultsPath, JSON.stringify(batchResults, null, 2));

      console.log('\n=== Batch Screenshot Summary ===');
      console.log(`Total competitors: ${batchResults.totalCompetitors}`);
      console.log(`Successful captures: ${batchResults.summary.successful}`);
      console.log(`Failed captures: ${batchResults.summary.failed}`);
      console.log(`Total screenshots: ${batchResults.summary.totalScreenshots}`);
      console.log(`Results saved to: ${resultsPath}`);

      return batchResults;

    } catch (error) {
      console.error('Batch capture failed:', error);
      throw error;
    }
  }
}

module.exports = BatchScreenshot;

// CLI usage
if (require.main === module) {
  const marketName = process.argv[2];

  if (!marketName) {
    console.log('Usage: node batch-capture.js [market-name]');
    process.exit(1);
  }

  const batcher = new BatchScreenshot(marketName);
  batcher.captureAllCompetitors()
    .then(results => {
      console.log('Batch capture completed successfully');
    })
    .catch(error => {
      console.error('Batch capture failed:', error);
      process.exit(1);
    });
}
```

## Integration with Data Collection

### Updated Competitor Schema
Include screenshot paths in competitor profiles:

```json
{
  "evidence": {
    "sourceURL": "Discovery source",
    "logoURL": "Logo image URL",
    "screenshots": {
      "homepage": "screenshots/company-slug/homepage.png",
      "pricing": "screenshots/company-slug/pricing.png",
      "product": "screenshots/company-slug/product.png",
      "about": "screenshots/company-slug/about.png"
    },
    "screenshotMetadata": {
      "captureDate": "2024-01-15T10:30:00Z",
      "viewport": "1920x1080",
      "successful": ["homepage", "pricing", "product"],
      "failed": ["about"]
    }
  }
}
```

### Workflow Integration
```bash
# Step 1: Complete competitor discovery and data collection
# (Follow existing methodology)

# Step 2: Set up screenshot environment
cd capture-scripts
npm install puppeteer

# Step 3: Capture individual competitor (for testing)
node screenshot-competitor.js "Company Name" "https://company.com"

# Step 4: Batch capture all competitors
MARKET_NAME=employee_benefits_greece node batch-capture.js employee_benefits_greece

# Step 5: Update competitor profiles with screenshot paths
# (Manual or scripted update of JSON files)
```

## Quality & Performance Guidelines

### Screenshot Quality Standards
- **Resolution**: Minimum 1920x1080 for desktop views
- **Format**: PNG for quality, JPG for size optimization
- **Full Page**: Capture entire page content when possible
- **Load Time**: Wait minimum 2 seconds for dynamic content
- **Error Handling**: Graceful fallback for failed captures

### Performance Considerations
- **Rate Limiting**: 5-second delays between captures
- **Batch Size**: Process 10-20 competitors per session
- **Timeout Handling**: 30-second timeout per page
- **Memory Management**: Close browser instances between batches
- **Storage**: Monitor disk space for large batches

### Respect & Ethics
- **Robots.txt**: Check and respect robots.txt files
- **Rate Limiting**: Don't overwhelm target servers
- **Public Content**: Only capture publicly accessible pages
- **Legal Use**: Screenshots for analysis, not reproduction
- **Attribution**: Maintain source attribution in metadata

## Troubleshooting

### Common Issues & Solutions

#### Page Load Failures
```javascript
// Add retry logic
const maxRetries = 3;
for (let attempt = 1; attempt <= maxRetries; attempt++) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    break;
  } catch (error) {
    if (attempt === maxRetries) throw error;
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}
```

#### Dynamic Content Issues
```javascript
// Wait for specific elements
await page.waitForSelector('.pricing-table', { timeout: 10000 });
// Or wait for network activity to settle
await page.waitForLoadState('networkidle');
```

#### Memory Issues
```javascript
// Clear resources between captures
await page.evaluate(() => {
  // Clear caches
  window.localStorage.clear();
  window.sessionStorage.clear();
});
```

### Monitoring & Validation
- **File Size**: Check screenshot file sizes (typical: 200KB-2MB)
- **Image Quality**: Spot-check screenshots for clarity
- **Coverage**: Verify all intended pages were captured
- **Timestamps**: Ensure capture dates are recent and accurate

## Advanced Features

### Mobile Screenshots
```javascript
// Add mobile viewport capture
const mobileConfig = {
  viewport: { width: 375, height: 667 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true
};
```

### Competitive Feature Comparison
```javascript
// Capture specific UI elements for comparison
await page.screenshot({
  path: 'pricing-table.png',
  clip: await page.$eval('.pricing-table', el => ({
    x: el.offsetLeft,
    y: el.offsetTop,
    width: el.offsetWidth,
    height: el.offsetHeight
  }))
});
```

### Automated Annotation
```javascript
// Add annotations to screenshots
const sharp = require('sharp');
await sharp(screenshotPath)
  .composite([{
    input: Buffer.from(`<svg>...</svg>`),
    top: 10,
    left: 10
  }])
  .png()
  .toFile(annotatedPath);
```