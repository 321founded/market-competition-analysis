# JSON Data Management

## Data Architecture

### File Organization Structure
```
data/
└── [market-name]/
    ├── metadata.json              # Market analysis metadata
    ├── categories/                # Competitor categories
    │   ├── market-leaders.json
    │   ├── emerging-players.json
    │   ├── niche-specialists.json
    │   └── regional-providers.json
    ├── analysis-matrix.json       # Comparative scoring matrix
    ├── insights.json             # Key findings and top 10
    └── sources.json              # Source documentation
```

### Schema Standards

#### Market Metadata Schema
```json
{
  "market": {
    "name": "Employee Benefits Greece",
    "definition": "Companies providing employee benefits solutions in Greece",
    "geography": ["Greece"],
    "segments": ["Enterprise", "SMB"],
    "lastAnalyzed": "2024-01-15",
    "analyst": "Market Analysis Agent",
    "totalCompetitors": 23,
    "categories": ["Modern Platforms", "Traditional Providers", "Global Giants"]
  },
  "methodology": {
    "analysisFramework": "6-dimension competitive assessment",
    "scoringScale": "1-5 scale with evidence requirements",
    "sourcesRequired": "minimum 2 sources per major claim",
    "confidenceTracking": true
  },
  "scope": {
    "inclusionCriteria": [
      "Active in Greek market within 12 months",
      "Offers employee benefits services",
      "Serves Greek companies or employees"
    ],
    "exclusionCriteria": [
      "Pure payroll providers without benefits",
      "Inactive or acquired companies",
      "Companies outside geographic scope"
    ]
  }
}
```

#### Category Schema
```json
{
  "categoryName": "Modern SaaS Platforms",
  "categoryDefinition": "Technology-first companies offering cloud-based employee benefits platforms with self-service capabilities and modern user experience.",
  "categoryCharacteristics": [
    "Cloud-native architecture",
    "Self-service employee portals",
    "API-first integration approach",
    "Subscription-based pricing"
  ],
  "marketDynamics": {
    "competitiveApproach": "Compete on user experience and technology innovation",
    "customerProfile": "Tech-forward companies, remote-first organizations",
    "growthTrends": "Expanding rapidly, high funding activity"
  },
  "competitors": [
    {
      "name": "Company Name",
      "description": "Brief description of company and value proposition",
      "services": ["Service 1", "Service 2", "Service 3"],
      "website": "https://company.com",
      "sourceURL": "https://discovery-source.com",
      "logoURL": "https://logo-cdn.com/logo.png",
      "metadata": {
        "lastUpdated": "2024-01-15",
        "confidence": "high",
        "primarySources": 3,
        "dataCompleteness": "90%"
      },
      "business": {
        "founded": "2018",
        "headquarters": "Athens, Greece",
        "employees": "50-100",
        "funding": "Series A, €5M",
        "businessModel": "SaaS subscription"
      },
      "capabilities": {
        "keyFeatures": ["Feature A", "Feature B", "Feature C"],
        "integrations": ["Platform 1", "Platform 2"],
        "compliance": ["GDPR", "Greek Labor Law"],
        "languages": ["Greek", "English"]
      },
      "market": {
        "targetCustomers": ["100-1000 employee companies"],
        "customerExamples": ["Customer 1", "Customer 2"],
        "partnerships": ["Partner 1", "Partner 2"],
        "geographicFocus": ["Greece", "Cyprus"]
      },
      "evidence": {
        "reviews": {
          "g2": {"score": 4.5, "reviewCount": 25, "url": "https://g2.com/..."},
          "capterra": {"score": 4.3, "reviewCount": 15, "url": "https://capterra.com/..."}
        },
        "caseStudies": ["https://company.com/case-study-1"],
        "awards": ["Best HR Tech 2023"],
        "mediaFaculty": ["TechCrunch coverage", "Industry report mention"]
      }
    }
  ]
}
```

#### Analysis Matrix Schema
```json
{
  "matrix": {
    "dimensions": [
      {
        "name": "Market Presence",
        "weight": 1.5,
        "description": "Market share, brand recognition, and geographic coverage",
        "scoringCriteria": {
          "5": "Dominant market position with strong brand recognition",
          "4": "Strong market presence, well-known brand",
          "3": "Established presence, recognized by target customers",
          "2": "Limited presence, emerging brand recognition",
          "1": "Minimal presence, little brand recognition"
        }
      }
    ],
    "competitors": [
      {
        "name": "Company Name",
        "category": "Modern SaaS Platforms",
        "scores": {
          "marketPresence": {
            "score": 4,
            "confidence": "high",
            "evidence": [
              "Featured in 3 major industry reports",
              "50+ customer testimonials on website",
              "Regular conference speaking presence"
            ],
            "sources": [
              "https://industry-report.com/analysis",
              "https://company.com/customers",
              "https://conference-agenda.com/speakers"
            ]
          }
        },
        "compositeScore": 3.8,
        "overallRanking": 5
      }
    ]
  },
  "metadata": {
    "analysisDate": "2024-01-15",
    "totalCompetitors": 23,
    "averageScore": 3.2,
    "scoringMethodology": "Weighted average with evidence requirements"
  }
}
```

#### Insights Schema
```json
{
  "insights": {
    "marketOverview": {
      "keyFindings": [
        "Market dominated by 3 major international players",
        "Strong emergence of local SaaS providers",
        "Regulatory compliance is key differentiator"
      ],
      "competitiveDynamics": "Price competition intense in SMB segment, feature differentiation important for enterprise",
      "marketTrends": [
        "Shift towards self-service platforms",
        "Integration with payroll systems becoming standard",
        "Focus on employee experience and mobile access"
      ]
    },
    "categoryAnalysis": [
      {
        "category": "Modern SaaS Platforms",
        "insights": [
          "Fastest growing segment with 40% YoY growth",
          "Strong on user experience but limited local compliance expertise",
          "Attracting significant venture investment"
        ],
        "topPerformers": ["Company A", "Company B"],
        "marketGaps": ["Greek language customer support", "Local tax integration"]
      }
    ],
    "topTen": [
      {
        "rank": 1,
        "company": "Company Name",
        "category": "Global Giants",
        "overallScore": 4.2,
        "strengths": ["Market leadership", "Comprehensive features", "Global scale"],
        "considerations": ["Higher pricing", "Complex implementation"],
        "bestFor": "Large enterprises with complex benefits needs",
        "whyRankedHere": "Combines market leadership with comprehensive feature set and proven enterprise implementation track record"
      }
    ]
  },
  "recommendations": {
    "marketEntry": [
      "Focus on mid-market segment with 100-500 employees",
      "Emphasize local compliance and Greek language support",
      "Partner with local payroll providers for integration"
    ],
    "competitive": [
      "Monitor emerging SaaS platforms for innovative features",
      "Invest in mobile-first employee experience",
      "Develop APIs for ecosystem integration"
    ],
    "investment": [
      "Consider partnerships with top-performing local players",
      "Evaluate acquisition opportunities in SaaS category",
      "Monitor regulatory changes affecting compliance requirements"
    ]
  },
  "metadata": {
    "analysisDate": "2024-01-15",
    "confidence": "high",
    "sourcesConsulted": 47,
    "competitorsAnalyzed": 23
  }
}
```

## Data Management Operations

### File Creation & Updates

#### Creating New Market Analysis
```bash
# Initialize market structure
mkdir -p data/[market-name]/categories

# Create core files
touch data/[market-name]/metadata.json
touch data/[market-name]/analysis-matrix.json
touch data/[market-name]/insights.json
touch data/[market-name]/sources.json
```

#### Category File Management
```javascript
// Use Write tool for new category files
Write({
  file_path: "/path/to/data/[market]/categories/[category-name].json",
  content: JSON.stringify(categorySchema, null, 2)
});

// Use MultiEdit for updating multiple category files
MultiEdit({
  file_path: "/path/to/categories/category1.json",
  edits: [
    {
      old_string: '"lastUpdated": "2024-01-01"',
      new_string: '"lastUpdated": "2024-01-15"'
    }
  ]
});
```

### Data Validation Protocols

#### Schema Validation Checklist
- [ ] All required fields present in each competitor record
- [ ] Date formats consistent (YYYY-MM-DD)
- [ ] URLs properly formatted and accessible
- [ ] Category assignments match defined categories
- [ ] Scoring values within valid range (1-5)
- [ ] Confidence levels use standard values (high/medium/low)

#### Cross-Reference Validation
```bash
# Use Grep to find inconsistencies
Grep({
  pattern: "company-name-variant",
  path: "data/[market]",
  output_mode: "files_with_matches"
});

# Check for missing logo URLs
Grep({
  pattern: '"logoURL": ""',
  path: "data/[market]/categories",
  output_mode: "content"
});
```

### Data Quality Maintenance

#### Automated Quality Checks
```javascript
// Example validation function patterns
function validateCompetitorRecord(competitor) {
  const required = ['name', 'description', 'services', 'website'];
  const missing = required.filter(field => !competitor[field]);

  return {
    isValid: missing.length === 0,
    missingFields: missing,
    completeness: (required.length - missing.length) / required.length
  };
}

function validateSourceDocumentation(competitor) {
  const hasSourceURL = !!competitor.sourceURL;
  const hasEvidence = competitor.evidence && Object.keys(competitor.evidence).length > 0;

  return {
    hasDiscoverySource: hasSourceURL,
    hasValidationEvidence: hasEvidence,
    sourceQuality: assessSourceCredibility(competitor.evidence)
  };
}
```

#### Data Consistency Rules
1. **Naming Consistency**: Company names must match across all files
2. **Category Integrity**: All referenced categories must exist in metadata
3. **URL Validation**: All URLs should be accessible and properly formatted
4. **Date Currency**: All timestamps should be within analysis timeframe
5. **Score Validation**: All scores must be 1-5 with supporting evidence

### Performance Optimization

#### File Size Management
- Keep individual category files under 1MB for performance
- Split large categories into sub-categories if needed
- Use external references for large assets (images, documents)
- Compress or optimize logo images before storing URLs

#### JSON Structure Optimization
```json
// Efficient structure - avoid deep nesting
{
  "competitors": [
    {
      "id": "company-slug",
      "basic": {...},
      "scores": {...}
    }
  ]
}

// Avoid excessive nesting that complicates processing
{
  "categories": {
    "saas": {
      "subcategories": {
        "enterprise": {
          "competitors": {...}  // Too deep
        }
      }
    }
  }
}
```

#### Batch Operations
```javascript
// Efficient batch updates using MultiEdit
const updates = competitors.map(comp => ({
  old_string: `"lastUpdated": "${comp.oldDate}"`,
  new_string: `"lastUpdated": "${newDate}"`
}));

MultiEdit({
  file_path: categoryFilePath,
  edits: updates
});
```

## Integration with Visualization

### App-Compatible Data Format
Ensure JSON structure supports visualization requirements:

#### Chart Data Preparation
```json
{
  "chartData": {
    "servicesComparison": competitors.map(comp => ({
      "name": comp.name,
      "services": comp.services.length,
      "category": comp.category
    })),
    "scoreDistribution": competitors.map(comp => ({
      "name": comp.name,
      "marketPresence": comp.scores.marketPresence.score,
      "technology": comp.scores.technology.score
    }))
  }
}
```

#### Dynamic Loading Support
```json
{
  "metadata": {
    "market": "employee-benefits-greece",
    "displayName": "Employee Benefits Greece",
    "lastUpdated": "2024-01-15",
    "categories": ["modern-platforms", "traditional-providers"]
  }
}
```

### Export Formats
Support multiple export formats for different use cases:

#### CSV Export Structure
```csv
Company,Category,Market Presence,Technology,Customer Experience,Overall Score
Company A,SaaS Platform,4,5,4,4.3
Company B,Traditional,5,2,3,3.3
```

#### Summary Report JSON
```json
{
  "executive_summary": {
    "market": "Employee Benefits Greece",
    "total_competitors": 23,
    "categories": 4,
    "market_leaders": ["Company A", "Company B", "Company C"],
    "key_insights": ["Insight 1", "Insight 2"],
    "last_updated": "2024-01-15"
  }
}
```

## Error Handling & Recovery

### Common JSON Issues
1. **Malformed JSON**: Use validation before writing files
2. **Encoding Issues**: Ensure UTF-8 encoding for international characters
3. **Large Files**: Implement streaming for very large datasets
4. **Concurrent Updates**: Use file locking or atomic writes

### Backup & Recovery
```bash
# Create backup before major updates
cp data/[market]/categories/category.json data/[market]/categories/category.json.backup

# Validate JSON syntax before committing changes
python -m json.tool data/[market]/categories/category.json > /dev/null
```

### Data Migration
When schema changes are needed:
1. Create migration scripts for data transformation
2. Test migrations on backup copies
3. Validate data integrity after migration
4. Update documentation to reflect schema changes