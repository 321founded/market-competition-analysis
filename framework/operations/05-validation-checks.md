# Validation & Quality Assurance

## Validation Framework

### Multi-Layer Validation Approach

#### Layer 1: Data Integrity Validation
**Objective**: Ensure data structure and format consistency
**Scope**: JSON schema compliance, field completeness, data types
**Frequency**: After each data collection session

#### Layer 2: Content Accuracy Validation
**Objective**: Verify factual accuracy and source credibility
**Scope**: Cross-reference information, validate claims, check recency
**Frequency**: During analysis phase and before final reporting

#### Layer 3: Analysis Consistency Validation
**Objective**: Ensure scoring and categorization consistency
**Scope**: Scoring calibration, category assignments, competitive positioning
**Frequency**: After scoring completion and before insights generation

#### Layer 4: Strategic Coherence Validation
**Objective**: Validate insights align with evidence and market reality
**Scope**: Logic checking, market knowledge validation, recommendation feasibility
**Frequency**: Before final report delivery

### Automated Validation Checks

#### Data Structure Validation
```javascript
// JSON Schema Validation Example
function validateCompetitorSchema(competitor) {
  const requiredFields = [
    'name', 'description', 'services', 'website',
    'sourceURL', 'category', 'lastUpdated'
  ];

  const validationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    completeness: 0
  };

  // Check required fields
  requiredFields.forEach(field => {
    if (!competitor[field] || competitor[field] === '') {
      validationResult.errors.push(`Missing required field: ${field}`);
      validationResult.isValid = false;
    }
  });

  // Calculate completeness score
  const totalFields = Object.keys(competitor).length;
  const expectedFields = 25; // Based on full schema
  validationResult.completeness = (totalFields / expectedFields) * 100;

  return validationResult;
}
```

#### URL Validation
```bash
# Use Bash to validate URL accessibility
function validateSourceURLs(competitor) {
  const urls = [
    competitor.website,
    competitor.sourceURL,
    competitor.logoURL,
    ...competitor.evidence.caseStudies
  ];

  urls.forEach(url => {
    if (url) {
      // Check URL accessibility
      curl -I --silent --fail "$url" > /dev/null
      if [ $? -ne 0 ]; then
        echo "WARNING: URL not accessible: $url"
      fi
    }
  });
}
```

#### Data Consistency Checks
```bash
# Use Grep to find inconsistencies across files
Grep({
  pattern: "Company Name",
  path: "data/[market]",
  output_mode: "content",
  glob: "*.json"
});

# Check for duplicate companies
Grep({
  pattern: '"name":\\s*"([^"]+)"',
  path: "data/[market]/categories",
  output_mode: "content"
});
```

### Content Accuracy Validation

#### Source Verification Protocol
```javascript
function validateSourceCredibility(source) {
  const credibilityChecks = {
    isOfficial: checkIfOfficialSource(source.url),
    isRecent: checkRecency(source.accessDate, 180), // 6 months
    isAccessible: validateURLAccess(source.url),
    hasAuthor: !!source.author,
    hasContext: !!source.relevantQuotes && source.relevantQuotes.length > 0
  };

  const credibilityScore = Object.values(credibilityChecks)
    .reduce((score, check) => score + (check ? 1 : 0), 0);

  return {
    score: credibilityScore,
    maxScore: 5,
    tier: calculateCredibilityTier(credibilityScore),
    checks: credibilityChecks,
    recommendation: credibilityScore >= 3 ? 'accept' : 'review_required'
  };
}
```

#### Cross-Reference Validation
```javascript
function crossValidateCompetitorData(competitor) {
  const validationResults = [];

  // Validate company basics across multiple sources
  if (competitor.evidence) {
    const employeeCount = extractEmployeeCount(competitor.evidence);
    const fundingInfo = extractFundingInfo(competitor.evidence);
    const serviceOfferings = extractServices(competitor.evidence);

    // Check for consensus across sources
    validationResults.push({
      dataPoint: 'employee_count',
      consensus: checkConsensus(employeeCount),
      confidence: calculateConfidence(employeeCount)
    });

    validationResults.push({
      dataPoint: 'funding_status',
      consensus: checkConsensus(fundingInfo),
      confidence: calculateConfidence(fundingInfo)
    });
  }

  return validationResults;
}
```

### Scoring Consistency Validation

#### Calibration Checks
```javascript
function validateScoringConsistency(analysisMatrix) {
  const calibrationIssues = [];

  // Check for score clustering (everyone getting same score)
  analysisMatrix.dimensions.forEach(dimension => {
    const scores = analysisMatrix.competitors.map(comp =>
      comp.scores[dimension.name].score
    );

    const uniqueScores = [...new Set(scores)];
    if (uniqueScores.length < 3) {
      calibrationIssues.push({
        issue: 'score_clustering',
        dimension: dimension.name,
        message: `Only ${uniqueScores.length} unique scores used`
      });
    }

    // Check for unrealistic score distributions
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (average > 4.0 || average < 2.0) {
      calibrationIssues.push({
        issue: 'skewed_distribution',
        dimension: dimension.name,
        average: average,
        message: 'Score distribution may be unrealistic'
      });
    }
  });

  return calibrationIssues;
}
```

#### Relative Ranking Validation
```javascript
function validateRelativeRankings(competitors) {
  const rankingIssues = [];

  // Check if similar companies have similar scores
  const categorizedCompetitors = groupByCategory(competitors);

  Object.keys(categorizedCompetitors).forEach(category => {
    const categoryCompetitors = categorizedCompetitors[category];
    const scores = categoryCompetitors.map(comp => comp.compositeScore);

    // Variance check within category
    const variance = calculateVariance(scores);
    if (variance > 1.5) {
      rankingIssues.push({
        issue: 'high_category_variance',
        category: category,
        variance: variance,
        message: 'High score variance within category may indicate inconsistent scoring'
      });
    }
  });

  return rankingIssues;
}
```

### Quality Assurance Checklists

#### Pre-Analysis Checklist
```bash
# Data Completeness Check
□ All discovered competitors have profiles
□ All profiles contain required fields
□ Source documentation is complete
□ URLs are accessible and current
□ Category assignments are made

# Data Quality Check
□ Company names are consistent across files
□ No duplicate entries exist
□ Business information is current (within 12 months)
□ Service descriptions are accurate and specific
□ Contact information and websites are valid

# Source Quality Check
□ Each major claim has at least one credible source
□ Official sources used where available
□ Source diversity maintained (not all from same type)
□ Recent sources prioritized over outdated ones
□ Source credibility ratings are documented
```

#### Post-Analysis Checklist
```bash
# Scoring Validation
□ All competitors scored on all dimensions
□ Scoring criteria applied consistently
□ Evidence supports assigned scores
□ Confidence levels documented
□ Outlier scores are justified

# Categorization Validation
□ Category definitions are clear and distinct
□ All competitors fit clearly into assigned categories
□ Category sizes are reasonably balanced
□ Category characteristics match assigned companies
□ Edge cases are documented with rationale

# Analysis Coherence
□ Rankings align with supporting evidence
□ Insights are supported by data
□ Market gaps identified are real and significant
□ Recommendations are actionable and realistic
□ Contradictions are resolved or explained
```

### Error Detection & Resolution

#### Common Data Quality Issues
```javascript
// Automated error detection patterns
const commonIssues = [
  {
    pattern: 'empty_required_fields',
    check: (comp) => !comp.name || !comp.description,
    severity: 'error',
    fix: 'Gather missing basic information'
  },
  {
    pattern: 'outdated_information',
    check: (comp) => daysSince(comp.lastUpdated) > 180,
    severity: 'warning',
    fix: 'Update with recent information'
  },
  {
    pattern: 'missing_sources',
    check: (comp) => !comp.sourceURL || !comp.evidence,
    severity: 'error',
    fix: 'Add source documentation'
  },
  {
    pattern: 'broken_urls',
    check: (comp) => !isAccessible(comp.website),
    severity: 'warning',
    fix: 'Verify and update URLs'
  },
  {
    pattern: 'inconsistent_categories',
    check: (comp) => !isValidCategory(comp.category),
    severity: 'error',
    fix: 'Correct category assignment'
  }
];
```

#### Resolution Workflow
```bash
# Error Resolution Process
1. Identify Issues
   - Run automated validation checks
   - Review manual quality indicators
   - Cross-check with external sources

2. Prioritize Fixes
   - Critical errors (missing data, broken structure)
   - Important warnings (outdated info, weak sources)
   - Minor issues (formatting, optimization)

3. Execute Corrections
   - Update data files with correct information
   - Add missing source documentation
   - Resolve category assignment conflicts
   - Fix structural or formatting issues

4. Re-validate
   - Run validation checks again
   - Confirm all critical issues resolved
   - Document any remaining limitations
   - Update confidence assessments
```

### Validation Reporting

#### Validation Summary Report
```json
{
  "validationSummary": {
    "overallStatus": "passed_with_warnings",
    "validationDate": "2024-01-15",
    "totalCompetitors": 23,
    "validationResults": {
      "dataIntegrity": {
        "status": "passed",
        "errors": 0,
        "warnings": 3,
        "completeness": "94%"
      },
      "contentAccuracy": {
        "status": "passed",
        "verifiedSources": 89,
        "flaggedSources": 5,
        "averageConfidence": "high"
      },
      "analysisConsistency": {
        "status": "passed_with_warnings",
        "calibrationIssues": 2,
        "scoringConsistency": "good",
        "categoryCoherence": "excellent"
      }
    },
    "actionItems": [
      "Update 3 competitors with recent information",
      "Verify 5 flagged sources for accuracy",
      "Address 2 scoring calibration issues"
    ],
    "confidence": "high",
    "readyForDelivery": true
  }
}
```

#### Issue Tracking
```json
{
  "issueLog": [
    {
      "issueId": "VAL001",
      "type": "data_quality",
      "severity": "warning",
      "description": "Company X missing employee count information",
      "affectedCompetitor": "Company X",
      "detectedDate": "2024-01-15",
      "status": "resolved",
      "resolution": "Added employee estimate from LinkedIn",
      "resolvedDate": "2024-01-15",
      "validator": "Analysis Agent"
    }
  ]
}
```

### Continuous Improvement

#### Validation Metrics Tracking
```javascript
// Track validation performance over time
const validationMetrics = {
  errorRate: 'errors / total_data_points',
  sourceQuality: 'tier1_sources / total_sources',
  completeness: 'populated_fields / total_possible_fields',
  consistency: 'consistent_scores / total_scores',
  accuracy: 'verified_claims / total_claims'
};

function trackValidationTrends(historicalData) {
  // Monitor improvement in validation metrics
  // Identify recurring quality issues
  // Optimize validation processes
  // Update validation criteria based on learnings
}
```

#### Process Refinement
Based on validation results, continuously improve:
- **Data Collection**: Focus on high-quality sources
- **Scoring Methods**: Refine calibration techniques
- **Categorization**: Improve category definitions
- **Source Standards**: Raise credibility requirements
- **Validation Checks**: Add new automated validations

### Quality Standards Documentation

#### Minimum Quality Standards
```
Data Completeness: 90% of required fields populated
Source Quality: 70% of sources from Tier 1-2 credibility
Information Currency: 80% of information within 12 months
Scoring Consistency: Score variance within categories < 1.0
Category Coherence: 95% of assignments clearly defensible
Overall Confidence: Minimum "medium" confidence level
```

#### Acceptance Criteria
- All critical errors resolved
- Source documentation complete for key claims
- Scoring calibration validated and consistent
- Insights supported by evidence
- Recommendations actionable and realistic
- Stakeholder review completed and approved