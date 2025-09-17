const { takeScreenshot } = require('./capture.js');
const fs = require('fs');
const path = require('path');

const companies = [
  {
    name: 'edenred',
    urls: {
      homepage: 'https://www.edenred.com',
      products: 'https://www.edenred.com/en/group/benefits-engagement',
      pricing: 'https://www.edenred.fr/entreprise'
    }
  },
  {
    name: 'swile',
    urls: {
      homepage: 'https://www.swile.co',
      products: 'https://www.swile.co/entreprise',
      app: 'https://www.swile.co/app'
    }
  },
  {
    name: 'pluxee',
    urls: {
      homepage: 'https://www.pluxee.fr',
      products: 'https://www.pluxee.fr/produits/titres-restaurant/pluxee-titres-restaurant/',
      pricing: 'https://www.pluxee.fr/contact'
    }
  },
  {
    name: 'may',
    urls: {
      homepage: 'https://www.getmay.fr',
      products: 'https://www.getmay.fr/fonctionnalites',
      pricing: 'https://www.getmay.fr/tarifs'
    }
  },
  {
    name: 'club-employes',
    urls: {
      homepage: 'https://club-employes.com',
      products: 'https://club-employes.com/solutions',
      cse: 'https://club-employes.com/cse'
    }
  }
];

async function captureAllScreenshots() {
  const baseDir = '../data/employee-benefits-france/screenshots';

  // Create base directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  for (const company of companies) {
    console.log(`\\n=== Capturing screenshots for ${company.name} ===`);

    // Create company directory
    const companyDir = path.join(baseDir, company.name);
    if (!fs.existsSync(companyDir)) {
      fs.mkdirSync(companyDir, { recursive: true });
    }

    // Capture each URL
    for (const [pageName, url] of Object.entries(company.urls)) {
      try {
        const outputPath = path.join(companyDir, `${pageName}.png`);
        console.log(`Capturing ${pageName} for ${company.name}...`);
        await takeScreenshot(url, outputPath);
        console.log(`✓ Successfully captured ${pageName}`);

        // Add a small delay to be respectful to servers
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`✗ Failed to capture ${pageName} for ${company.name}:`, error.message);
      }
    }
  }

  console.log('\\n=== Batch capture completed ===');
}

// Run the capture if this file is executed directly
if (require.main === module) {
  captureAllScreenshots().catch(console.error);
}

module.exports = { captureAllScreenshots };