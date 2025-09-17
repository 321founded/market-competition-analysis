# Source Documentation & Citation

## Source Documentation Framework

### Documentation Standards

#### Primary Source Requirements
Every significant data point must be supported by verifiable sources:
- **Company Information**: Official websites, investor relations, press releases
- **Financial Data**: SEC filings, funding announcements, official statements
- **Product Details**: Official product pages, documentation, demos
- **Customer Information**: Case studies, testimonials, official references

#### Source Quality Hierarchy
```
Tier 1 - Official Sources (Highest Credibility)
├── Company websites and investor relations
├── SEC filings and annual reports
├── Official press releases and statements
└── Government and regulatory filings

Tier 2 - Professional Analysis (High Credibility)
├── Gartner, Forrester, IDC reports
├── Professional research organizations
├── Industry analyst publications
└── Established business publications

Tier 3 - Industry Sources (Medium-High Credibility)
├── Industry trade publications
├── Professional association reports
├── Conference presentations and materials
└── Peer-reviewed business research

Tier 4 - User & Community Sources (Medium Credibility)
├── G2, Capterra, TrustRadius reviews
├── Customer case studies and testimonials
├── Professional community discussions
└── Industry expert opinions

Tier 5 - General Sources (Lower Credibility)
├── General news articles
├── Blog posts and opinion pieces
├── Social media posts
└── Unverified user content
```

### Source Documentation Schema

#### Individual Source Record
```json
{
  "sourceId": "unique-source-identifier",
  "url": "https://source-url.com/page",
  "title": "Page or Document Title",
  "sourceType": "official|analyst|industry|user|news",
  "credibilityTier": 1,
  "accessDate": "2024-01-15",
  "lastModified": "2024-01-10",
  "author": "Author Name or Organization",
  "publication": "Publication Name",
  "dataExtracted": [
    "company employee count",
    "funding amount",
    "product features"
  ],
  "relevantQuotes": [
    {
      "quote": "Specific relevant quote from source",
      "context": "Brief context about where this appeared",
      "dataPoint": "What this supports (e.g., 'employee count')"
    }
  ],
  "accessibility": "public|paywalled|registration_required",
  "language": "en",
  "archiveUrl": "https://archive.org/web/20240115/...",
  "screenshot": "path/to/screenshot.png",
  "notes": "Additional notes about source reliability or context"
}
```

#### Source Summary per Competitor
```json
{
  "competitorName": "Company Name",
  "sourcesSummary": {
    "totalSources": 8,
    "credibilityBreakdown": {
      "tier1": 3,
      "tier2": 2,
      "tier3": 2,
      "tier4": 1,
      "tier5": 0
    },
    "sourceTypes": {
      "official": 4,
      "analyst": 2,
      "user": 2
    },
    "dataCompleteness": "85%",
    "lastUpdated": "2024-01-15"
  },
  "keyDataPoints": [
    {
      "dataPoint": "Employee count: 150-200",
      "confidence": "high",
      "sourceCount": 2,
      "primarySource": "https://company.com/about",
      "backupSources": ["https://linkedin.com/company/company"]
    }
  ]
}
```

## Source Collection Process

### Systematic Source Discovery

#### Phase 1: Official Source Collection
```bash
# Primary company sources
WebFetch: "[company].com/about" for company information
WebFetch: "[company].com/investors" for financial data
WebFetch: "[company].com/press" for announcements
WebFetch: "[company].com/customers" for client validation

# Documentation extraction
- Save key quotes with context
- Note specific metrics and claims
- Capture relevant images or charts
- Record page structure and navigation
```

#### Phase 2: Third-Party Validation
```bash
# Professional analysis sources
WebSearch: "[company] Gartner report analysis"
WebSearch: "[company] Forrester evaluation"
WebSearch: "[company] IDC assessment"

# Industry coverage
WebSearch: "[company] industry report mention"
WebSearch: "[company] trade publication coverage"
WebSearch: "[company] conference presentation"
```

#### Phase 3: User & Community Sources
```bash
# Review platforms
WebSearch: "[company] G2 reviews detailed"
WebSearch: "[company] Capterra user feedback"
WebSearch: "[company] TrustRadius customer reviews"

# Community discussions
WebSearch: "[company] user experience discussion"
WebSearch: "[company] implementation case study"
WebSearch: "[company] customer testimonial"
```

### Source Validation Protocol

#### Accessibility Verification
```bash
# Check source availability
1. Verify URLs are accessible
2. Test for paywalls or registration requirements
3. Check for recent changes or updates
4. Identify potential link rot issues
5. Create archive copies for important sources
```

#### Credibility Assessment
```javascript
function assessSourceCredibility(source) {
  let score = 0;

  // Official source bonus
  if (source.sourceType === 'official') score += 3;

  // Recent information bonus
  const daysSinceModified = daysBetween(source.lastModified, today);
  if (daysSinceModified < 180) score += 2;
  if (daysSinceModified < 90) score += 1;

  // Author credibility
  if (source.author && isRecognizedExpert(source.author)) score += 2;

  // Publication credibility
  if (isEstablishedPublication(source.publication)) score += 2;

  return {
    score: score,
    tier: scoreToCredibilityTier(score),
    confidence: scoreToConfidence(score)
  };
}
```

#### Information Cross-Validation
```javascript
function validateDataPoint(dataPoint, sources) {
  const validationResult = {
    dataPoint: dataPoint,
    confidence: 'low',
    sourceCount: sources.length,
    consensus: false,
    conflictingInfo: [],
    recommendedValue: null
  };

  // Check for consensus across sources
  const values = sources.map(s => s.extractedValue);
  const consensus = findConsensusValue(values);

  if (consensus.agreement > 0.7) {
    validationResult.confidence = 'high';
    validationResult.consensus = true;
    validationResult.recommendedValue = consensus.value;
  }

  // Identify conflicts
  const conflicts = findConflictingValues(values);
  if (conflicts.length > 0) {
    validationResult.conflictingInfo = conflicts;
    validationResult.confidence = 'medium';
  }

  return validationResult;
}
```

## Citation Standards

### In-Line Citations
```json
{
  "dataPoint": "Company raised $25M Series B in 2023",
  "sources": [
    {
      "url": "https://company.com/press/series-b-announcement",
      "type": "official",
      "accessDate": "2024-01-15",
      "quote": "We are excited to announce our $25M Series B funding round led by Acme Ventures"
    },
    {
      "url": "https://techcrunch.com/2023/08/15/company-raises-25m",
      "type": "news",
      "accessDate": "2024-01-15",
      "quote": "Company announced today it has raised $25 million in Series B funding"
    }
  ],
  "confidence": "high"
}
```

### Source Attribution Format
```
Standard Citation Format:
[Data Point]: [Value]
Source: [URL] ([Source Type], accessed [Date])
Quote: "[Relevant quote]"
Confidence: [High/Medium/Low]
```

### Evidence Documentation
```json
{
  "evidencePackage": {
    "claim": "Company is market leader in employee benefits SaaS",
    "supportingEvidence": [
      {
        "type": "market_share",
        "source": "https://gartner.com/report/employee-benefits-2024",
        "evidence": "Company holds 15% market share, highest in SaaS category",
        "weight": "high"
      },
      {
        "type": "customer_adoption",
        "source": "https://company.com/customers",
        "evidence": "500+ enterprise customers including Fortune 500 companies",
        "weight": "medium"
      },
      {
        "type": "industry_recognition",
        "source": "https://hr-tech-awards.com/2024-winners",
        "evidence": "Winner of 'Best Employee Benefits Platform 2024'",
        "weight": "medium"
      }
    ],
    "confidence": "high",
    "lastValidated": "2024-01-15"
  }
}
```

## Source Management Operations

### Archive & Backup Strategy

#### Critical Source Preservation
```bash
# For important sources, create permanent archives
1. Save full page screenshots
2. Create web archive snapshots (archive.org)
3. Download PDF copies of reports when possible
4. Save key images and charts separately
5. Document critical quotes with full context
```

#### Source Monitoring
```javascript
// Track source changes over time
function monitorSourceChanges(sourceList) {
  sourceList.forEach(source => {
    // Check if content has changed since last access
    // Flag outdated or modified information
    // Update access dates and change logs
    // Identify broken links or moved content
  });
}
```

### Quality Assurance

#### Source Quality Review
```bash
# Weekly source quality audit
1. Verify all critical sources remain accessible
2. Check for any updated information from official sources
3. Validate that source credibility ratings remain accurate
4. Identify and replace any low-quality sources
5. Update confidence levels based on new information
```

#### Citation Completeness Check
```javascript
function auditCitationCompleteness(competitorData) {
  const auditResults = {
    totalDataPoints: 0,
    sourcedDataPoints: 0,
    missingCitations: [],
    lowConfidenceItems: [],
    completeness: 0
  };

  // Check each data point for proper source documentation
  // Identify claims without supporting sources
  // Flag low-confidence assertions
  // Calculate overall citation completeness score

  return auditResults;
}
```

### Source Documentation Best Practices

#### Efficient Source Collection
```bash
# Batch source documentation during research
1. Collect sources immediately during data gathering
2. Use consistent naming and organization
3. Document context and relevance immediately
4. Save screenshots for critical visual information
5. Note any access restrictions or requirements
```

#### Source Organization
```
sources/
├── by-company/
│   ├── company-a/
│   │   ├── official-sources/
│   │   ├── analyst-reports/
│   │   ├── user-reviews/
│   │   └── news-coverage/
│   └── company-b/
├── by-type/
│   ├── industry-reports/
│   ├── funding-announcements/
│   ├── product-comparisons/
│   └── market-analysis/
└── archives/
    ├── screenshots/
    ├── documents/
    └── web-archives/
```

#### Documentation Workflow
```bash
# Standard source documentation process
1. Identify and collect source during research
2. Assess credibility and relevance immediately
3. Extract and quote relevant information
4. Document access details and context
5. Store archive copy if critical
6. Update competitor profile with sourced data
7. Cross-reference with existing sources
8. Flag any conflicts or inconsistencies
```

## Compliance & Ethics

### Data Source Ethics
- Respect website terms of service and robots.txt
- Use publicly available information only
- Properly attribute all sources and quotes
- Avoid excessive automated requests that burden servers
- Respect copyright and fair use guidelines

### Privacy Considerations
- Use only publicly disclosed business information
- Avoid personal information about employees
- Respect confidential or proprietary information
- Focus on publicly available business metrics and statements

### Source Reliability Standards
- Prioritize authoritative and official sources
- Verify information through multiple sources when possible
- Flag uncertain or unverifiable information clearly
- Update outdated information regularly
- Maintain objectivity in source selection and interpretation