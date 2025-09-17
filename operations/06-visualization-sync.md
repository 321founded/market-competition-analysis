# Visualization App Integration

## App Architecture Overview

### Data Flow Design
```
JSON Data Files → Data Processing Layer → React Components → User Interface
     ↓                    ↓                      ↓              ↓
Categories/*.json    Dynamic Loading      Charts & Tables   Interactive UI
Analysis Matrix     Data Transformation    Filtering        Market Selection
Insights.json       Format Conversion      Sorting          Export Options
```

### App Structure Integration
```
app/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Market selector homepage
│   │   ├── markets/
│   │   │   ├── [market]/
│   │   │   │   ├── page.tsx         # Market overview
│   │   │   │   ├── categories/
│   │   │   │   │   └── [category]/page.tsx  # Category details
│   │   │   │   └── insights/page.tsx        # Top 10 & insights
│   │   │   └── comparison/page.tsx  # Cross-market comparison
│   │   └── api/
│   │       └── markets/
│   │           └── [market]/route.ts # Data API endpoints
│   ├── components/
│   │   ├── charts/                  # Visualization components
│   │   ├── tables/                  # Data display components
│   │   └── market/                  # Market-specific components
│   └── lib/
│       ├── data/                    # Data loading utilities
│       ├── types/                   # TypeScript definitions
│       └── utils/                   # Helper functions
```

## Data Processing Layer

### Dynamic Market Loading
```typescript
// lib/data/marketLoader.ts
interface MarketData {
  metadata: MarketMetadata;
  categories: CategoryData[];
  analysisMatrix: AnalysisMatrix;
  insights: MarketInsights;
}

export async function loadMarketData(marketId: string): Promise<MarketData> {
  const basePath = `/data/${marketId}`;

  // Load metadata to understand market structure
  const metadata = await loadJSON(`${basePath}/metadata.json`);

  // Dynamically load all category files
  const categories = await Promise.all(
    metadata.categories.map(async (categoryId) =>
      loadJSON(`${basePath}/categories/${categoryId}.json`)
    )
  );

  // Load analysis and insights
  const [analysisMatrix, insights] = await Promise.all([
    loadJSON(`${basePath}/analysis-matrix.json`),
    loadJSON(`${basePath}/insights.json`)
  ]);

  return {
    metadata,
    categories,
    analysisMatrix,
    insights
  };
}
```

### Data Transformation Utils
```typescript
// lib/utils/dataTransforms.ts
export function prepareChartData(categories: CategoryData[]) {
  const competitors = categories.flatMap(cat => cat.competitors);

  return {
    // Services comparison chart data
    servicesData: competitors.map(comp => ({
      name: comp.name,
      services: comp.services.length,
      category: comp.category
    })),

    // Score distribution radar chart
    scoreData: competitors.map(comp => ({
      name: comp.name,
      marketPresence: comp.analysis?.scores?.marketPresence?.score || 0,
      technology: comp.analysis?.scores?.technology?.score || 0,
      customerExperience: comp.analysis?.scores?.customerExperience?.score || 0
    })),

    // Category breakdown pie chart
    categoryData: categories.map(cat => ({
      name: cat.categoryName,
      value: cat.competitors.length,
      color: getCategoryColor(cat.categoryName)
    }))
  };
}
```

### API Route Implementation
```typescript
// app/api/markets/[market]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { loadMarketData } from '@/lib/data/marketLoader';

export async function GET(
  request: NextRequest,
  { params }: { params: { market: string } }
) {
  try {
    const marketData = await loadMarketData(params.market);
    return NextResponse.json(marketData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Market data not found' },
      { status: 404 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Handle data updates from analysis agent
  const updates = await request.json();
  // Validate and save updates
  // Return updated data
}
```

## Visualization Components

### Market Overview Dashboard
```typescript
// components/market/MarketOverview.tsx
interface MarketOverviewProps {
  marketData: MarketData;
}

export function MarketOverview({ marketData }: MarketOverviewProps) {
  const chartData = prepareChartData(marketData.categories);

  return (
    <div className="space-y-8">
      {/* Market summary stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Competitors"
          value={marketData.metadata.totalCompetitors}
        />
        <StatCard
          title="Categories"
          value={marketData.categories.length}
        />
        <StatCard
          title="Market Leaders"
          value={marketData.insights.topTen.slice(0, 3).length}
        />
        <StatCard
          title="Last Updated"
          value={formatDate(marketData.metadata.lastAnalyzed)}
        />
      </div>

      {/* Category distribution */}
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={chartData.categoryData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Services Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={chartData.servicesData} />
          </CardContent>
        </Card>
      </div>

      {/* Category overview grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketData.categories.map(category => (
          <CategoryCard
            key={category.categoryName}
            category={category}
            marketId={marketData.metadata.market}
          />
        ))}
      </div>
    </div>
  );
}
```

### Category Detail View
```typescript
// components/market/CategoryDetail.tsx
export function CategoryDetail({ category, marketId }: CategoryDetailProps) {
  return (
    <div className="space-y-6">
      {/* Category description */}
      <Card>
        <CardHeader>
          <CardTitle>{category.categoryName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{category.categoryDefinition}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Key Characteristics</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {category.categoryCharacteristics?.map(char => (
                  <li key={char}>{char}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Market Dynamics</h4>
              <p className="text-sm text-gray-600">
                {category.marketDynamics?.competitiveApproach}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitors table */}
      <Card>
        <CardHeader>
          <CardTitle>Competitors in {category.categoryName}</CardTitle>
        </CardHeader>
        <CardContent>
          <CompetitorsTable
            competitors={category.competitors}
            showScores={true}
          />
        </CardContent>
      </Card>

      {/* Category-specific insights */}
      <Card>
        <CardHeader>
          <CardTitle>Category Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryInsights category={category} />
        </CardContent>
      </Card>
    </div>
  );
}
```

### Competitive Analysis Matrix
```typescript
// components/charts/AnalysisMatrix.tsx
export function AnalysisMatrix({ analysisData }: AnalysisMatrixProps) {
  const [selectedDimensions, setSelectedDimensions] = useState([
    'marketPresence',
    'technology'
  ]);

  return (
    <div className="space-y-6">
      {/* Dimension selector */}
      <div className="flex gap-2 flex-wrap">
        {analysisData.dimensions.map(dim => (
          <button
            key={dim.name}
            onClick={() => toggleDimension(dim.name)}
            className={`px-3 py-1 rounded ${
              selectedDimensions.includes(dim.name)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {dim.name}
          </button>
        ))}
      </div>

      {/* 2D scatter plot for selected dimensions */}
      <Card>
        <CardHeader>
          <CardTitle>Competitive Positioning</CardTitle>
        </CardHeader>
        <CardContent>
          <ScatterPlot
            data={prepareScatterData(analysisData, selectedDimensions)}
            xAxis={selectedDimensions[0]}
            yAxis={selectedDimensions[1]}
          />
        </CardContent>
      </Card>

      {/* Detailed scoring table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <ScoringTable
            competitors={analysisData.competitors}
            dimensions={analysisData.dimensions}
          />
        </CardContent>
      </Card>
    </div>
  );
}
```

## Real-Time Data Integration

### Live Data Updates
```typescript
// lib/hooks/useMarketData.ts
export function useMarketData(marketId: string) {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMarketData(marketId)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [marketId]);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const newData = await loadMarketData(marketId);
      setData(newData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [marketId]);

  return { data, loading, error, refreshData };
}
```

### Data Synchronization
```typescript
// lib/utils/datSync.ts
export class DataSyncManager {
  private marketId: string;
  private lastSyncTime: Date;

  constructor(marketId: string) {
    this.marketId = marketId;
    this.lastSyncTime = new Date();
  }

  async syncWithFileSystem(): Promise<void> {
    // Check file modification times
    const files = await getMarketFiles(this.marketId);
    const hasUpdates = files.some(file =>
      file.lastModified > this.lastSyncTime
    );

    if (hasUpdates) {
      // Reload data and update UI
      await this.reloadMarketData();
      this.lastSyncTime = new Date();
    }
  }

  async saveUpdates(updates: Partial<MarketData>): Promise<void> {
    // Save updates to JSON files
    // Trigger UI refresh
    // Update sync timestamp
  }
}
```

## Export & Sharing Features

### Data Export Options
```typescript
// components/export/ExportOptions.tsx
export function ExportOptions({ marketData }: ExportOptionsProps) {
  const exportFormats = [
    {
      format: 'csv',
      label: 'CSV Spreadsheet',
      handler: () => exportToCSV(marketData)
    },
    {
      format: 'pdf',
      label: 'PDF Report',
      handler: () => exportToPDF(marketData)
    },
    {
      format: 'json',
      label: 'Raw Data (JSON)',
      handler: () => exportToJSON(marketData)
    },
    {
      format: 'xlsx',
      label: 'Excel Workbook',
      handler: () => exportToExcel(marketData)
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Export Options</h3>
      <div className="grid grid-cols-2 gap-4">
        {exportFormats.map(format => (
          <button
            key={format.format}
            onClick={format.handler}
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="text-center">
              <div className="mb-2">
                <ExportIcon format={format.format} />
              </div>
              <div className="font-medium">{format.label}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Chart Export Utilities
```typescript
// lib/utils/chartExport.ts
export async function exportChartToPNG(
  chartRef: RefObject<HTMLDivElement>,
  filename: string
): Promise<void> {
  if (!chartRef.current) return;

  const canvas = await html2canvas(chartRef.current);
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
}

export function generateChartConfig(data: any, type: string) {
  // Generate chart.js or D3 configuration
  // Optimized for export quality
  return {
    ...baseConfig,
    options: {
      ...baseConfig.options,
      animation: false, // Disable for static export
      responsive: false,
      maintainAspectRatio: false
    }
  };
}
```

## Performance Optimization

### Data Loading Optimization
```typescript
// lib/utils/performanceOptims.ts
export class DataLoader {
  private cache = new Map<string, any>();

  async loadWithCache<T>(key: string, loader: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const data = await loader();
    this.cache.set(key, data);
    return data;
  }

  async preloadMarketData(marketIds: string[]): Promise<void> {
    // Preload common markets for faster switching
    await Promise.all(
      marketIds.map(id => this.loadWithCache(id, () => loadMarketData(id)))
    );
  }
}
```

### Component Optimization
```typescript
// components/optimized/VirtualizedTable.tsx
export const VirtualizedCompetitorTable = memo(function VirtualizedCompetitorTable({
  competitors
}: VirtualizedTableProps) {
  const rowRenderer = useCallback(({ index, key, style }) => (
    <div key={key} style={style}>
      <CompetitorRow competitor={competitors[index]} />
    </div>
  ), [competitors]);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          rowCount={competitors.length}
          rowHeight={80}
          rowRenderer={rowRenderer}
        />
      )}
    </AutoSizer>
  );
});
```

## Integration Testing

### Data Integrity Tests
```typescript
// tests/integration/dataIntegrity.test.ts
describe('Data Integration', () => {
  test('should load market data without errors', async () => {
    const marketData = await loadMarketData('employee-benefits-greece');
    expect(marketData.metadata).toBeDefined();
    expect(marketData.categories).toHaveLength(4);
    expect(marketData.insights.topTen).toHaveLength(10);
  });

  test('should transform data for charts correctly', () => {
    const chartData = prepareChartData(mockCategories);
    expect(chartData.servicesData).toHaveLength(mockCategories.length);
    expect(chartData.scoreData[0]).toHaveProperty('marketPresence');
  });

  test('should handle missing data gracefully', async () => {
    const incompleteData = await loadMarketData('incomplete-market');
    expect(incompleteData).toBeDefined();
    // Should not throw errors even with missing fields
  });
});
```

### UI Integration Tests
```typescript
// tests/integration/uiIntegration.test.ts
describe('UI Integration', () => {
  test('should render market overview with real data', async () => {
    const marketData = await loadMarketData('test-market');
    render(<MarketOverview marketData={marketData} />);

    expect(screen.getByText('Total Competitors')).toBeInTheDocument();
    expect(screen.getByText(marketData.metadata.totalCompetitors.toString()))
      .toBeInTheDocument();
  });

  test('should handle market switching', async () => {
    const { rerender } = render(<MarketSelector />);

    fireEvent.click(screen.getByText('Employee Benefits Greece'));
    await waitFor(() => {
      expect(screen.getByText('Modern Platforms')).toBeInTheDocument();
    });
  });
});
```

## Deployment Considerations

### Static Generation
```typescript
// next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async generateStaticParams() {
    // Pre-generate pages for all available markets
    const markets = await getAvailableMarkets();
    return markets.map(market => ({ market: market.id }));
  }
};
```

### Build Optimization
```bash
# Build script with data validation
#!/bin/bash
echo "Validating data integrity..."
npm run validate-data

echo "Building application..."
npm run build

echo "Testing static exports..."
npm run test:static

echo "Deployment ready!"
```