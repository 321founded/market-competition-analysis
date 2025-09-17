# Market Competition Analysis Framework

A comprehensive framework for systematic competitive market analysis with automated data collection, structured evaluation, and interactive visualization.

## 🏗️ Repository Structure

```
market-competition-analysis/
├── app/                          # Deployable Next.js visualization app
│   ├── public/data/             # Market data for visualization
│   ├── src/app/                 # App routes and components
│   ├── package.json             # App dependencies
│   └── vercel.json              # Deployment configuration
│
├── framework/                   # Reusable analysis framework
│   ├── methodology/             # Business strategy guides (WHAT to do)
│   │   ├── 00-overview.md
│   │   ├── 01-market-definition.md
│   │   ├── 02-competitor-discovery.md
│   │   ├── 03-categorization.md
│   │   ├── 04-analysis-dimensions.md
│   │   ├── 05-scoring-matrix.md
│   │   └── 06-insights-extraction.md
│   │
│   ├── operations/              # Technical implementation (HOW to execute)
│   │   ├── 00-tools-overview.md
│   │   ├── 01-search-strategies.md
│   │   ├── 02-data-collection.md
│   │   ├── 03-json-management.md
│   │   ├── 04-source-tracking.md
│   │   ├── 05-validation-checks.md
│   │   ├── 06-visualization-sync.md
│   │   └── 07-screenshot-capture.md
│   │
│   └── templates/               # JSON schemas and patterns
│       ├── competitor.schema.json
│       ├── category.schema.json
│       ├── analysis-matrix.schema.json
│       ├── market-metadata.schema.json
│       └── search-queries.json
│
├── examples/                    # Example market analyses
│   ├── employee_benefits_greece/
│   ├── employee-benefits-france/
│   └── loyalty-programs/
│
└── DEPLOYMENT.md               # Deployment instructions
```

## 🚀 Quick Start

### For New Market Analysis

1. **Duplicate Framework (CRITICAL FIRST STEP)**
   ```bash
   # Always create isolated copy to prevent conflicts
   cp -r market-competition-analysis my-market-analysis
   cd my-market-analysis
   ```

2. **Follow Methodology**
   ```bash
   # Study the framework guides
   cat framework/methodology/00-overview.md

   # Follow 6-step process:
   # 1. Market Definition → 2. Discovery → 3. Categorization
   # 4. Analysis Dimensions → 5. Scoring Matrix → 6. Insights
   ```

3. **Deploy Visualization**
   ```bash
   cd app
   npm install
   npm run build
   # Deploy to Vercel or run locally
   ```

### For App Deployment Only

```bash
cd app
npm install
vercel --prod
```

## 🎯 Key Features

### Dual-Layer Framework
- **Methodology (Business)**: WHAT to do - strategic approach
- **Operations (Technical)**: HOW to execute - implementation details

### Systematic Process
- **6-step methodology** from market definition to insights
- **Evidence-based** analysis with source documentation
- **Quality assurance** with validation protocols
- **Reusable templates** for any market

### Interactive Visualization
- **Multi-market support** with dynamic loading
- **Category breakdowns** and competitor profiles
- **Export capabilities** for reports and presentations
- **Vercel-ready** for instant deployment

## 📱 Live Demo

### Deployment URL
```
https://market-competition-analysis.vercel.app
```

### Example Markets
- Employee Benefits Greece
- Employee Benefits France
- Airline Loyalty Programs

## 🔧 Usage Examples

### Technology Market Analysis
```bash
Market: "CRM software Europe"
Categories: "Enterprise Platforms", "SMB Solutions", "Specialists"
Output: 45 competitors with feature comparison matrix
```

### Services Market Analysis
```bash
Market: "Employee benefits Greece"
Categories: "Modern Platforms", "Traditional Providers", "Global Giants"
Output: 23 competitors with regulatory compliance focus
```

## 🛠️ Technical Details

### App Stack
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Static export** for Vercel deployment
- **JSON-based** data structure

### Framework Dependencies
- **Puppeteer** for screenshot capture
- **JSON schemas** for validation
- **Markdown** for documentation
- **Git-based** version control

## 📖 Documentation

### For Analysts
1. **Always duplicate framework first** - CRITICAL: prevent conflicts
2. **Follow methodology guides** - systematic approach ensures quality
3. **Use parallel searches** - batch operations for efficiency
4. **Document sources** - maintain evidence trail
5. **Capture screenshots** - visual evidence adds value

### For Developers
1. **App in `/app`** - standalone Next.js application
2. **Framework in `/framework`** - reusable methodology
3. **Examples in `/examples`** - reference implementations
4. **JSON schemas** - enforce data consistency

## 🌐 Deployment

### Vercel (Recommended)
```bash
cd app
vercel
```

### Manual Build
```bash
cd app
npm run build
# Deploy `/out` directory to any static host
```

## 🤝 Contributing

### Adding New Methodology
1. Follow existing structure in `framework/methodology/`
2. Include both business and technical aspects
3. Provide examples and templates

### Adding New Markets
1. Use `examples/` as reference
2. Follow JSON schemas in `framework/templates/`
3. Update app data structure

## 📄 License

MIT License - Feel free to use for any competitive analysis needs.

---

*This framework enables systematic, repeatable competitive analysis while maintaining flexibility for market-specific adaptations.*