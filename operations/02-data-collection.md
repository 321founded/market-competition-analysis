# Data Collection & Management

## Data Collection Framework

### Project Setup & Isolation

#### Workspace Duplication Protocol
**CRITICAL**: Always create a isolated copy of the framework before starting analysis to prevent conflicts and enable safe experimentation.

```bash
# Step 1: Duplicate the entire framework
cp -r /path/to/market-competition /path/to/market-competition-[project-name]
cd /path/to/market-competition-[project-name]

# Step 2: Initialize new market directory
mkdir -p data/[market-name]
mkdir -p data/[market-name]/categories
mkdir -p data/[market-name]/screenshots

# Step 3: Document project context
echo "Project: [market-name] analysis
Started: $(date)
Analyst: [analyst-name]
Framework version: [version]" > PROJECT.md
```

**Benefits of Duplication**:
- **Isolation**: No risk of corrupting existing analyses
- **Customization**: Modify methodology for specific market needs
- **Version control**: Each project maintains its own git history
- **Parallel work**: Multiple analyses can run simultaneously
- **Backup**: Original framework remains pristine

### Systematic Collection Process

#### Phase 1: Baseline Data Collection
**Objective**: Gather essential information for all discovered competitors
**Time Allocation**: 60-90 minutes
**Parallel Processing**: Group competitors for simultaneous research

```javascript
// Example parallel collection pattern
const baselineData = await Promise.all([
  collectCompanyBasics(company1),
  collectCompanyBasics(company2),
  collectCompanyBasics(company3),
  collectCompanyBasics(company4)
]);
```

#### Phase 2: Dimensional Analysis
**Objective**: Score all competitors across defined analysis dimensions
**Time Allocation**: 45-60 minutes
**Focus**: Consistent evaluation criteria and evidence gathering

#### Phase 3: Validation & Enhancement
**Objective**: Fill gaps, verify accuracy, enhance profiles
**Time Allocation**: 30-45 minutes
**Priority**: Critical data points and high-impact competitors

### Data Types & Priorities

#### Essential Data (Must Have)
```json
{
  "name": "Company Name",
  "category": "Primary Category",
  "description": "Brief value proposition",
  "website": "https://company.com",
  "sourceURL": "Discovery source URL",
  "lastUpdated": "2024-01-15"
}
```

#### Business Intelligence (High Priority)
```json
{
  "headquarters": "City, Country",
  "founded": "2015",
  "employees": "100-500",
  "funding": "Series B, $25M",
  "businessModel": "SaaS subscription",
  "targetMarket": "Mid-market enterprises"
}
```

#### Competitive Analysis (High Priority)
```json
{
  "services": ["Service 1", "Service 2"],
  "keyFeatures": ["Feature A", "Feature B"],
  "pricing": "Starting at $X/month",
  "customers": ["Customer 1", "Customer 2"],
  "partnerships": ["Partner 1", "Partner 2"]
}
```

#### Supporting Evidence (Medium Priority)
```json
{
  "logoURL": "https://logo-url.com/logo.png",
  "reviews": {
    "g2Score": 4.5,
    "capterra": 4.3,
    "sources": ["G2 URL", "Capterra URL"]
  },
  "awards": ["Award 1", "Award 2"],
  "caseStudies": ["Case study URL 1"]
}
```

## Collection Techniques

### Parallel Research Patterns

#### Company Batch Processing
```bash
# Research 4-6 companies simultaneously
WebSearch: "[company1] overview features pricing"
WebSearch: "[company2] competitors customers"
WebSearch: "[company3] funding investors team"
WebSearch: "[company4] reviews ratings G2"
WebSearch: "[company5] case studies testimonials"
WebSearch: "[company6] partnerships integrations"
```

#### Dimension-Focused Collection
```bash
# Gather specific dimension data across multiple companies
WebSearch: "[company1] [company2] [company3] security compliance"
WebSearch: "[company4] [company5] [company6] pricing plans"
WebSearch: "[company7] [company8] customer support quality"
WebSearch: "[company9] [company10] integration capabilities"
```

#### Category Deep-Dive
```bash
# Comprehensive category analysis
WebSearch: "[category] providers comparison matrix"
WebSearch: "[category] market leaders features"
WebSearch: "[category] customer preferences survey"
WebSearch: "[category] pricing benchmarks 2024"
```

### Source-Specific Collection Strategies

#### Official Company Sources
**Primary Collection Points**:
- About/Company pages for background information
- Product/Features pages for capability assessment
- Pricing pages for cost analysis
- Customer/Case Studies for validation
- News/Press pages for recent developments

**Collection Pattern**:
```bash
WebFetch: "[company]/about" for company background
WebFetch: "[company]/features" for product capabilities
WebFetch: "[company]/pricing" for cost information
WebFetch: "[company]/customers" for client validation
```

#### Third-Party Review Platforms
**Key Platforms**: G2, Capterra, TrustRadius, Gartner Peer Insights
**Collection Focus**:
- Overall ratings and review counts
- Specific feature ratings
- Customer testimonials and feedback
- Comparison mentions with competitors

**Search Patterns**:
```bash
WebSearch: "[company] G2 reviews rating"
WebSearch: "[company] Capterra user feedback"
WebSearch: "[company] TrustRadius customer reviews"
WebSearch: "[company] vs [competitor] comparison reviews"
```

#### Financial & Investment Sources
**Key Sources**: Crunchbase, PitchBook, SEC filings, press releases
**Collection Focus**:
- Funding rounds and valuations
- Investor information
- Revenue/growth metrics (if available)
- Acquisition or IPO developments

**Search Patterns**:
```bash
WebSearch: "[company] funding series valuation Crunchbase"
WebSearch: "[company] investors venture capital"
WebSearch: "[company] revenue growth financial"
WebSearch: "[company] acquisition merger IPO"
```

## Data Validation Protocols

### Multi-Source Verification
**Cross-Reference Strategy**:
- Verify company basics across 2-3 sources
- Confirm key metrics with official sources when possible
- Check recent developments against multiple news sources
- Validate customer claims with case studies or testimonials

**Validation Checklist**:
- [ ] Company name and website verified
- [ ] Business model confirmed from official sources
- [ ] Key services/products cross-referenced
- [ ] Recent developments validated (within 6 months)
- [ ] Contradictory information flagged and researched

### Data Quality Standards

#### Confidence Level Assessment
```json
{
  "dataPoint": "Company has 500+ employees",
  "confidence": "medium",
  "sources": [
    "https://company.com/about",
    "https://linkedin.com/company/company"
  ],
  "lastVerified": "2024-01-15",
  "notes": "Range estimate from LinkedIn, not exact number"
}
```

**Confidence Levels**:
- **High**: Multiple verified sources, recent information
- **Medium**: Single reliable source or older verified information
- **Low**: Estimated or inferred from indirect sources
- **Unknown**: No reliable information available

#### Information Currency
- **Recent** (0-6 months): Preferred for dynamic information
- **Current** (6-12 months): Acceptable for most business information
- **Dated** (12+ months): Use only if no recent information available
- **Historical**: Note clearly when information may be outdated

### Error Prevention & Quality Control

#### Common Data Quality Issues
1. **Outdated Information**: Company status, product offerings, leadership
2. **Conflicting Sources**: Different metrics across platforms
3. **Missing Context**: Information without geographic or temporal scope
4. **Incomplete Profiles**: Partial information that appears comprehensive

#### Quality Assurance Process
```bash
# Systematic validation workflow
1. Cross-reference key facts across sources
2. Check for recent company updates or changes
3. Validate competitor categorization assignments
4. Ensure data schema consistency across files
5. Flag uncertain or conflicting information
```

## Data Organization & Storage

### File Structure Standards

#### Competitor Profile Schema
```json
{
  "metadata": {
    "lastUpdated": "2024-01-15",
    "analyst": "Agent Name",
    "confidence": "high|medium|low",
    "completeness": "85%"
  },
  "basic": {
    "name": "Company Name",
    "website": "https://company.com",
    "category": "Primary Category",
    "description": "Value proposition"
  },
  "business": {
    "founded": "2015",
    "headquarters": "City, Country",
    "employees": "100-500",
    "businessModel": "SaaS",
    "targetMarket": "Enterprise"
  },
  "offerings": {
    "services": ["Service 1", "Service 2"],
    "keyFeatures": ["Feature A", "Feature B"],
    "pricing": "Starting at $X/month",
    "integrations": ["Platform 1", "Platform 2"]
  },
  "market": {
    "customers": ["Customer 1", "Customer 2"],
    "partnerships": ["Partner 1", "Partner 2"],
    "competitors": ["Competitor 1", "Competitor 2"],
    "marketPosition": "Challenger"
  },
  "evidence": {
    "sourceURL": "Discovery source",
    "logoURL": "Logo image URL",
    "screenshots": {
      "homepage": "screenshots/[company-slug]/homepage.png",
      "pricing": "screenshots/[company-slug]/pricing.png",
      "product": "screenshots/[company-slug]/product.png"
    },
    "reviews": {
      "g2": {"score": 4.5, "reviews": 150, "url": "G2 URL"},
      "capterra": {"score": 4.3, "reviews": 75, "url": "Capterra URL"}
    },
    "caseStudies": ["Case study URL 1", "Case study URL 2"],
    "awards": ["Award 1", "Award 2"]
  },
  "analysis": {
    "strengths": ["Strength 1", "Strength 2"],
    "considerations": ["Consideration 1"],
    "scores": {
      "marketPresence": {"score": 4, "confidence": "high"},
      "productCapability": {"score": 3, "confidence": "medium"},
      "customerExperience": {"score": 4, "confidence": "high"}
    }
  }
}
```

#### Source Documentation
```json
{
  "url": "https://source-url.com",
  "accessDate": "2024-01-15",
  "dataExtracted": ["company name", "employee count", "funding"],
  "credibility": "high|medium|low",
  "notes": "Official company website",
  "screenshot": "optional-screenshot-path.png"
}
```

### Version Control & Updates

#### Change Tracking
- Document all data updates with timestamps
- Maintain audit trail of source changes
- Flag when information conflicts with previous versions
- Note when companies are acquired, renamed, or change focus

#### Batch Update Processes
```bash
# Systematic update workflow
1. Identify companies needing updates (6+ months old)
2. Batch search for recent developments
3. Update competitor profiles with new information
4. Validate cross-references and relationships
5. Update analysis scores if capabilities changed
```

## Efficiency Optimization

### Time-Saving Techniques

#### Smart Batching
- Group similar research tasks (all pricing research together)
- Batch companies by category for comparative research
- Use parallel searches for independent data points
- Combine validation searches across multiple competitors

#### Template-Based Collection
- Use consistent search query templates
- Standardize data extraction patterns
- Create reusable validation checklists
- Maintain consistent evidence documentation formats

#### Automation Opportunities
- Use MultiEdit for batch updates across files
- Implement validation scripts for data completeness
- Automate source URL validation and accessibility checks
- Create templates for common competitor profile structures

### Resource Allocation Guidelines

#### High-Priority Data Collection
1. **Market Leaders**: Comprehensive profiles with high confidence data
2. **Emerging Threats**: Focus on capabilities and growth indicators
3. **Direct Competitors**: Detailed feature and positioning analysis
4. **Category Representatives**: Ensure each category well-represented

#### Efficient Research Allocation
- Spend 40% of time on top 20% of competitors (market leaders)
- Allocate 30% to emerging or high-growth companies
- Use 20% for comprehensive category coverage
- Reserve 10% for validation and gap-filling

#### Quality vs. Speed Balance
- Prioritize accuracy over speed for key competitors
- Accept lower confidence data for minor players
- Focus on strategic decision-relevant information
- Document limitations clearly rather than guess missing data