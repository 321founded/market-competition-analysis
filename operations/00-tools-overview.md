# Tools & Capabilities Overview

## Available Tools for Market Analysis

### Primary Research Tools

#### WebSearch
**Purpose**: Comprehensive market and competitor research
**Capabilities**:
- Search web for industry reports, company information, market data
- Filter by domains (include/exclude specific websites)
- Get up-to-date information beyond knowledge cutoff
- Access real-time market developments and news

**Best Practices**:
- Always run multiple searches in parallel for efficiency
- Use domain filtering to focus on credible sources
- Combine broad and specific search terms
- Save search URLs for source documentation

#### WebFetch
**Purpose**: Detailed content extraction from specific URLs
**Capabilities**:
- Fetch and process specific web pages
- Extract structured information from company websites
- Analyze competitor product pages, pricing, features
- Process industry reports and analyst publications

**Best Practices**:
- Use for deep-dive analysis of key competitors
- Extract specific data points systematically
- Document content access dates for currency
- Handle redirects and broken links gracefully

### Data Management Tools

#### Read/Write/Edit
**Purpose**: Manage analysis files and documentation
**Capabilities**:
- Create and update JSON data files
- Manage markdown documentation
- Organize source materials and evidence
- Maintain version control of analysis progress

**Best Practices**:
- Use consistent file naming conventions
- Structure JSON for easy app integration
- Document all data sources and timestamps
- Maintain clean, organized file hierarchy

#### Glob/Grep
**Purpose**: Search and organize existing analysis files
**Capabilities**:
- Find files by patterns and content
- Search across multiple analysis projects
- Locate specific competitor mentions or data points
- Organize and categorize research materials

**Best Practices**:
- Use for consistency checks across files
- Find duplicate or conflicting information
- Validate data completeness and coverage
- Cross-reference information across sources

### Development & Visualization

#### Bash
**Purpose**: System operations and app management
**Capabilities**:
- Run development servers and build processes
- Install packages and dependencies
- Execute scripts for data processing
- Manage file operations efficiently
- Execute Puppeteer screenshot scripts

**Best Practices**:
- Use parallel processing for efficiency
- Avoid interactive commands that block progress
- Document command sequences for reproducibility
- Handle errors gracefully with fallbacks
- Always duplicate framework before starting new analysis

#### MultiEdit
**Purpose**: Efficient bulk file updates
**Capabilities**:
- Update multiple files simultaneously
- Maintain consistency across related documents
- Batch process competitor data updates
- Synchronize changes across analysis components

**Best Practices**:
- Plan edit sequences to avoid conflicts
- Validate changes before committing
- Use for maintaining data schema consistency
- Group related updates for atomic operations

## Task-Specific Tool Combinations

### Project Setup Phase
```bash
# CRITICAL: Always start with framework duplication
cp -r /path/to/market-competition /path/to/market-competition-[project-name]
cd /path/to/market-competition-[project-name]
mkdir -p data/[market-name]/categories
mkdir -p data/[market-name]/screenshots
```

### Market Discovery Phase
```bash
# Parallel search strategy
WebSearch: "[market] competitive landscape 2024"
WebSearch: "top [service] providers [geography]"
WebSearch: "[industry] market leaders analysis"
WebSearch: "[market] startups funding rounds"
```

### Competitor Analysis Phase
```bash
# Detailed company research
WebSearch: "[company] competitors alternatives"
WebFetch: company website for detailed analysis
WebSearch: "[company] customer reviews ratings"
WebSearch: "[company] funding investors valuation"
```

### Data Organization Phase
```bash
# File management and structure
Write: competitor JSON profiles
MultiEdit: update multiple company records
Glob: find all competitor mentions
Grep: validate data consistency
```

### Screenshot Capture Phase
```bash
# Visual evidence collection
cd capture-scripts
npm install puppeteer
node screenshot-competitor.js "Company Name" "https://website.com"
MARKET_NAME=[market] node batch-capture.js [market-name]
```

## Efficiency Optimization Patterns

### Parallel Processing
**Always batch similar operations**:
```javascript
// Good: Parallel searches
await Promise.all([
  WebSearch({query: "query1"}),
  WebSearch({query: "query2"}),
  WebSearch({query: "query3"})
]);

// Bad: Sequential searches
await WebSearch({query: "query1"});
await WebSearch({query: "query2"});
await WebSearch({query: "query3"});
```

### Source Documentation
**Systematic evidence tracking**:
```json
{
  "dataPoint": "value",
  "source": "https://example.com/page",
  "accessDate": "2024-01-15",
  "confidence": "high",
  "notes": "from official company website"
}
```

### Error Handling
**Graceful degradation strategies**:
- Use alternative search terms if initial queries fail
- Fall back to general searches if specific ones don't yield results
- Document data gaps rather than leaving incomplete analysis
- Continue with partial information while noting limitations

## Quality Assurance Techniques

### Data Validation
- Cross-reference information across multiple sources
- Use Grep to find inconsistencies in data files
- Validate JSON schema compliance
- Check date currency and source credibility

### Completeness Checks
- Use Glob to ensure all competitors have complete profiles
- Validate that all analysis dimensions are covered
- Check for missing logos, descriptions, or key data points
- Ensure geographic and category coverage is complete

### Consistency Maintenance
- Use MultiEdit for synchronized updates across files
- Maintain consistent naming conventions and data structures
- Validate that categorizations align across all documents
- Ensure scoring criteria applied uniformly

## Performance Guidelines

### Time Management
- **Discovery phase**: 45-60 minutes for comprehensive market research
- **Analysis phase**: 60-90 minutes for detailed competitor assessment
- **Documentation phase**: 30-45 minutes for structured data creation
- **Validation phase**: 15-30 minutes for quality assurance

### Resource Optimization
- Batch similar operations for maximum efficiency
- Use caching (temporary files) to avoid redundant searches
- Prioritize high-value sources over exhaustive coverage
- Focus on recent information (within 12 months when possible)

### Error Prevention
- Validate URLs before using WebFetch
- Check file paths before writing operations
- Use consistent data schemas to prevent integration issues
- Test app integration early to catch formatting problems

## Common Pitfalls to Avoid

### Technical Issues
- Don't start interactive processes that block progress
- Avoid writing to files before reading existing content
- Don't assume URLs are accessible without validation
- Never commit changes without explicit user approval

### Research Quality
- Don't rely on single sources for important claims
- Avoid outdated information when recent data is available
- Don't mix different data collection methodologies
- Never fabricate data points when information is unavailable

### Process Efficiency
- Don't perform sequential operations that could be parallelized
- Avoid redundant searches for the same information
- Don't create inconsistent file structures or naming
- Never skip source documentation for efficiency