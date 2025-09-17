import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

// Components
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const CategoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const InsightsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

async function getMarketData(marketId: string) {
  try {
    // For production deployment, data is in public/data
    const dataDirectory = path.join(process.cwd(), 'public', 'data', marketId);

    // Load metadata
    const metadataPath = path.join(dataDirectory, 'metadata.json');
    const metadataContent = await fs.readFile(metadataPath, 'utf8');
    const metadata = JSON.parse(metadataContent);

    // Load categories
    const categoriesDir = path.join(dataDirectory, 'categories');
    let categories = [];
    try {
      const categoryFiles = await fs.readdir(categoriesDir);
      categories = await Promise.all(
        categoryFiles
          .filter(f => f.endsWith('.json'))
          .map(async (filename) => {
            const filePath = path.join(categoriesDir, filename);
            const fileContent = await fs.readFile(filePath, 'utf8');
            const data = JSON.parse(fileContent);
            return {
              id: filename.replace(/\.json$/, ''),
              name: data.categoryName,
              definition: data.categoryDefinition,
              competitorCount: data.competitors?.length || 0,
              insights: data.categoryInsights?.keyFindings || []
            };
          })
      );
    } catch (error) {
      console.log('No categories directory found or error loading categories');
    }

    // Load insights if available
    let insights = null;
    try {
      const insightsPath = path.join(dataDirectory, 'insights.json');
      const insightsContent = await fs.readFile(insightsPath, 'utf8');
      insights = JSON.parse(insightsContent);
    } catch (error) {
      console.log('No insights file found');
    }

    return {
      metadata,
      categories,
      insights,
      marketId
    };
  } catch (error) {
    console.error('Error loading market data:', error);
    return null;
  }
}

interface MarketPageProps {
  params: {
    market: string;
  };
}

export default async function MarketPage({ params }: MarketPageProps) {
  const resolvedParams = await params;
  const marketData = await getMarketData(resolvedParams.market);

  if (!marketData) {
    notFound();
  }

  const { metadata, categories, insights } = marketData;
  const market = metadata.market || {};

  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Link href="/" className="flex items-center text-indigo-200 hover:text-white transition-colors mr-4">
              <BackIcon />
              <span className="ml-2">Back to Markets</span>
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            {market.name || resolvedParams.market}
          </h1>
          <p className="text-xl text-indigo-100">
            {market.definition || 'Market competitive analysis'}
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Market Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {market.totalCompetitors || categories.reduce((sum, cat) => sum + cat.competitorCount, 0)}
              </div>
              <div className="text-sm font-medium text-slate-600">Total Competitors</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {categories.length}
              </div>
              <div className="text-sm font-medium text-slate-600">Categories</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {market.geography?.length || 0}
              </div>
              <div className="text-sm font-medium text-slate-600">Markets</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className={`text-3xl font-bold mb-2 ${
                metadata.dataQuality?.confidence === 'high' ? 'text-green-600' :
                metadata.dataQuality?.confidence === 'medium' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {metadata.dataQuality?.confidence?.toUpperCase() || 'MEDIUM'}
              </div>
              <div className="text-sm font-medium text-slate-600">Confidence</div>
            </div>
          </div>

          {/* Market Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Market Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {market.geography && market.geography.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">Geographic Coverage</h3>
                  <p className="text-slate-600">{market.geography.join(', ')}</p>
                </div>
              )}
              {market.segments && market.segments.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">Market Segments</h3>
                  <p className="text-slate-600">{market.segments.join(', ')}</p>
                </div>
              )}
              {market.lastAnalyzed && (
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">Last Analyzed</h3>
                  <p className="text-slate-600">{market.lastAnalyzed}</p>
                </div>
              )}
              {market.analyst && (
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">Analyst</h3>
                  <p className="text-slate-600">{market.analyst}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

            {/* Categories Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <CategoryIcon />
                <h2 className="text-2xl font-bold text-slate-800">Competitor Categories</h2>
              </div>
              <p className="text-slate-600 mb-6">
                Explore competitor groups and detailed category analysis.
              </p>

              {categories.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500 mb-4">No categories available yet.</p>
                  <p className="text-sm text-slate-400">
                    Follow the methodology to create competitor categories.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/markets/${resolvedParams.market}/categories/${category.id}`}
                      className="block p-4 border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{category.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">{category.definition}</p>
                        </div>
                        <div className="text-sm font-medium text-indigo-600 ml-4">
                          {category.competitorCount} companies
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Insights Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <InsightsIcon />
                <h2 className="text-2xl font-bold text-slate-800">Strategic Insights</h2>
              </div>
              <p className="text-slate-600 mb-6">
                Top 10 rankings, competitive analysis, and strategic recommendations.
              </p>

              {!insights ? (
                <div className="text-center py-8">
                  <p className="text-slate-500 mb-4">Insights not available yet.</p>
                  <p className="text-sm text-slate-400">
                    Complete the analysis to generate strategic insights.
                  </p>
                </div>
              ) : (
                <div>
                  <Link
                    href={`/markets/${resolvedParams.market}/insights`}
                    className="block p-4 border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-slate-50 transition-colors mb-4"
                  >
                    <h3 className="font-semibold text-slate-800 mb-2">Top 10 Rankings</h3>
                    <p className="text-sm text-slate-600">
                      {insights.insights?.topTen?.length || 0} ranked competitors with detailed analysis
                    </p>
                  </Link>

                  <Link
                    href={`/markets/${resolvedParams.market}/analysis`}
                    className="block p-4 border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="font-semibold text-slate-800 mb-2">Competitive Matrix</h3>
                    <p className="text-sm text-slate-600">
                      Multi-dimensional scoring and comparative analysis
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Insights Preview */}
          {insights?.insights?.marketOverview?.keyFindings && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Key Market Findings</h2>
              <ul className="space-y-2">
                {insights.insights.marketOverview.keyFindings.slice(0, 3).map((finding: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-slate-700">{finding}</p>
                  </li>
                ))}
              </ul>
              {insights.insights.marketOverview.keyFindings.length > 3 && (
                <Link
                  href={`/markets/${resolvedParams.market}/insights`}
                  className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  View all insights &rarr;
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}