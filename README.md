# Market Competition Analysis Agent

A structured framework for comprehensive competitive market analysis with automated data collection, systematic evaluation, and interactive visualization.

## Overview

This agent template enables systematic analysis of any market's competitive landscape through:
- **Dual-layer methodology**: Business strategy (WHAT) + Technical operations (HOW)
- **Structured data collection**: JSON-based competitor profiles and analysis matrices
- **Interactive visualization**: Next.js app for exploring results
- **Reusable templates**: Apply to any market with consistent methodology

## Quick Start

### For New Market Analysis

1. **Duplicate Framework (CRITICAL FIRST STEP)**
   ```bash
   # Always create isolated copy to prevent conflicts
   cp -r /path/to/market-competition /path/to/market-competition-[project-name]
   cd /path/to/market-competition-[project-name]
   mkdir -p data/[market-name]/categories
   mkdir -p data/[market-name]/screenshots
   ```

2. **Define Market Scope**
   ```bash
   # Follow methodology/01-market-definition.md
   # Define: geography, segments, inclusion/exclusion criteria
   ```

3. **Execute Analysis Workflow**
   ```bash
   # Follow the complete 6-step methodology:
   # 1. Market Definition → 2. Discovery → 3. Categorization
   # 4. Analysis Dimensions → 5. Scoring Matrix → 6. Insights
   ```

4. **Capture Visual Evidence**
   ```bash
   # Install Puppeteer and capture competitor screenshots
   cd capture-scripts
   npm install puppeteer
   MARKET_NAME=[market-name] node batch-capture.js [market-name]
   ```

5. **Generate Visualization**
   ```bash
   cd app/market-visualizer
   npm install
   npm run dev
   # Navigate to localhost:3000 to view results
   ```

### For Using Existing Analysis
```bash
# Load existing market data
cd data/[market-name]
# View categories, analysis matrix, and insights
# Launch visualization app to explore interactively
```

## Framework Architecture

### Methodology (Business Strategy)
Located in `methodology/` - defines WHAT to do:

- **00-overview.md**: Framework principles and expected outcomes
- **01-market-definition.md**: Define scope and boundaries
- **02-competitor-discovery.md**: Systematic competitor identification
- **03-categorization.md**: Logical grouping strategies
- **04-analysis-dimensions.md**: Multi-dimensional evaluation criteria
- **05-scoring-matrix.md**: Comparative assessment framework
- **06-insights-extraction.md**: Strategic insights and rankings

### Operations (Technical Implementation)
Located in `operations/` - defines HOW to execute:

- **00-tools-overview.md**: Available tools and capabilities
- **01-search-strategies.md**: WebSearch optimization techniques
- **02-data-collection.md**: Systematic data gathering approaches (includes duplication protocol)
- **03-json-management.md**: Data structure and quality standards
- **04-source-tracking.md**: Citation and evidence documentation
- **05-validation-checks.md**: Quality assurance protocols
- **06-visualization-sync.md**: App integration patterns
- **07-screenshot-capture.md**: Puppeteer-based visual evidence collection

### Data Structure
```
data/
└── [market-name]/
    ├── metadata.json              # Market definition and scope
    ├── categories/                # Competitor groupings
    │   ├── market-leaders.json
    │   ├── emerging-players.json
    │   └── niche-specialists.json
    ├── screenshots/               # Visual evidence
    │   ├── [company-slug]/
    │   │   ├── homepage.png
    │   │   ├── pricing.png
    │   │   └── product.png
    │   └── batch-captures/
    ├── analysis-matrix.json       # Scoring and rankings
    └── insights.json             # Top 10 and key findings
```

### Templates
Located in `templates/` - JSON schemas and query patterns:
- **competitor.schema.json**: Standard competitor profile structure
- **category.schema.json**: Category grouping requirements
- **analysis-matrix.schema.json**: Scoring matrix format
- **market-metadata.schema.json**: Market definition structure
- **search-queries.json**: Optimized search patterns

## Workflow Guide

### Phase 0: Project Setup (5 minutes)
```
CRITICAL FIRST STEP: Always duplicate framework
Process: Copy entire framework to isolated directory
Tools: cp -r command, mkdir for directories
Output: Clean, isolated workspace ready for analysis
```

### Phase 1: Market Definition (30 minutes)
```
Input: Market request (e.g., "employee benefits Greece")
Process: Follow methodology/01-market-definition.md
Output: Clear scope, criteria, boundaries
Tools: Read market definition guide, document scope
```

### Phase 2: Discovery & Research (60-90 minutes)
```
Process:
- Follow methodology/02-competitor-discovery.md
- Use operations/01-search-strategies.md for efficiency
- Apply operations/02-data-collection.md patterns

Execution:
- Run parallel WebSearch queries using templates/search-queries.json
- Document all sources using operations/04-source-tracking.md
- Validate findings with operations/05-validation-checks.md

Output: Comprehensive competitor list with initial categorization
```

### Phase 3: Categorization & Analysis (45-60 minutes)
```
Process:
- Apply methodology/03-categorization.md framework
- Use methodology/04-analysis-dimensions.md for scoring criteria
- Follow methodology/05-scoring-matrix.md for consistent evaluation

Output:
- Categorized competitors with clear rationale
- Multi-dimensional scoring matrix
- Evidence-backed assessments
```

### Phase 4: Visual Evidence Collection (30-60 minutes)
```
Process:
- Install Puppeteer in capture-scripts directory
- Use operations/07-screenshot-capture.md for guidance
- Execute batch screenshot capture for all competitors

Execution:
- cd capture-scripts && npm install puppeteer
- node batch-capture.js [market-name]
- Validate screenshot quality and coverage

Output:
- Screenshots for all competitor websites (homepage, pricing, product)
- Organized in data/[market]/screenshots/ directory
- Visual evidence for analysis and reporting
```

### Phase 5: Insights & Visualization (30-45 minutes)
```
Process:
- Extract insights using methodology/06-insights-extraction.md
- Create top 10 rankings with multiple perspectives
- Sync data with app using operations/06-visualization-sync.md

Output:
- Strategic insights and recommendations
- Interactive visualization dashboard
- Export-ready reports with visual evidence
```

## Key Features

### Systematic Methodology
- **Evidence-based**: Every claim supported by documented sources
- **Consistent scoring**: 1-5 scale with clear criteria and rationale
- **Multiple perspectives**: Overall, category, innovation, and customer rankings
- **Quality tracking**: Confidence levels and completeness metrics

### Efficient Operations
- **Parallel processing**: Batch similar operations for speed
- **Source documentation**: Automatic citation and evidence tracking
- **Data validation**: Multi-layer quality assurance checks
- **Template-driven**: Reusable patterns for consistent results

### Interactive Visualization
- **Dynamic loading**: Support for multiple markets
- **Responsive charts**: Category breakdowns, scoring matrices, competitor positioning
- **Export options**: PDF, CSV, Excel, JSON formats
- **Real-time updates**: Sync with data file changes

## Usage Examples

### Technology Market Analysis
```bash
Market: "CRM software Europe"
Categories: "Enterprise Platforms", "SMB Solutions", "Industry Specialists"
Dimensions: Market Presence, Product Capabilities, Customer Experience, Innovation
Output: 45 competitors across 4 categories with detailed analysis
```

### Services Market Analysis
```bash
Market: "Employee benefits Greece"
Categories: "Modern Platforms", "Traditional Providers", "Global Giants"
Dimensions: Service Quality, Geographic Coverage, Compliance, Customer Support
Output: 23 competitors with regulatory compliance focus
```

### B2B Software Market
```bash
Market: "Project management tools"
Categories: "Enterprise", "Team Collaboration", "Agile Specialists"
Dimensions: Feature Completeness, User Experience, Integration, Scalability
Output: Cross-platform comparison with feature gap analysis
```

## Quality Standards

### Data Requirements
- **Completeness**: 90%+ of required fields populated
- **Source quality**: 70%+ from Tier 1-2 credibility sources
- **Currency**: 80%+ of information within 12 months
- **Confidence**: Minimum "medium" confidence for key assessments

### Analysis Standards
- **Scoring consistency**: Calibrated across all competitors
- **Category coherence**: Clear, defensible groupings
- **Evidence support**: All scores backed by documented evidence
- **Strategic relevance**: Insights actionable for business decisions

## Advanced Features

### Multi-Market Comparison
- Compare competitive dynamics across different markets
- Identify cross-market expansion opportunities
- Track competitor presence across regions

### Trend Analysis
- Monitor market evolution over time
- Track competitor performance changes
- Identify emerging threats and opportunities

### Export & Sharing
- PDF executive summaries
- Detailed Excel workbooks
- JSON data for integration
- Interactive dashboard sharing

## Best Practices

### For Analysts
1. **Always duplicate framework first** - CRITICAL: prevent conflicts and data corruption
2. **Start with market definition** - clear scope prevents scope creep
3. **Use parallel searches** - batch operations for maximum efficiency
4. **Document sources immediately** - don't rely on memory for citations
5. **Capture visual evidence** - screenshots provide valuable context
6. **Validate consistently** - cross-check key facts across sources
7. **Focus on recent information** - prioritize currency over completeness

### For Stakeholders
1. **Review methodology first** - understand how insights were generated
2. **Check confidence levels** - weight recommendations by data quality
3. **Consider limitations** - note gaps and uncertainties in analysis
4. **Use multiple rankings** - different perspectives reveal different insights
5. **Track competitive changes** - markets evolve, analysis should too

## Technical Requirements

### Dependencies
- Next.js 14+ for visualization app
- Node.js 18+ for development
- Modern browser for interactive features

### File Structure
- JSON files for data (human-readable, version-controllable)
- Markdown for documentation (easy to edit and read)
- React components for visualization (modern, responsive)

### Performance
- Optimized for 15-50 competitors per market
- Sub-second loading for visualization
- Efficient search patterns minimize research time
- Batch operations for maximum speed

## Support & Extension

### Adding New Markets
1. Follow the complete methodology workflow
2. Use existing templates and schemas
3. Validate with operations/05-validation-checks.md
4. Test visualization integration

### Customizing Analysis
- Modify dimensions in methodology/04-analysis-dimensions.md
- Adjust scoring criteria for market-specific needs
- Add custom categorization frameworks
- Extend visualization with new chart types

### Contributing
- Follow established JSON schemas
- Document all methodology changes
- Test operations procedures thoroughly
- Maintain backward compatibility

---

*This framework enables systematic, repeatable competitive analysis while maintaining flexibility for market-specific adaptations. The dual-layer approach ensures both strategic rigor and operational efficiency.*