import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

// --- SVG Icons for Cards ---
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 16.707l.001-.001M7.707 16.707l-.001.001M16.293 16.293l-.001.001M16.293 16.293l.001-.001M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>
);
const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

// const iconMap: { [key: string]: React.ReactNode } = {
//   'global-insurance-giants': <GlobeIcon />,
//   'modern-platforms': <ServerIcon />,
//   'specialized-providers-consultants': <UsersIcon />,
// };

async function getAvailableMarkets() {
  try {
    // For production deployment, data is in public/data
    const dataDirectory = path.join(process.cwd(), 'public', 'data');
    const marketDirs = await fs.readdir(dataDirectory, { withFileTypes: true });

    const markets = await Promise.all(
      marketDirs
        .filter(dirent => dirent.isDirectory())
        .map(async (dirent) => {
          try {
            const metadataPath = path.join(dataDirectory, dirent.name, 'metadata.json');
            const metadataContent = await fs.readFile(metadataPath, 'utf8');
            const metadata = JSON.parse(metadataContent);

            // Get categories for this market
            const categoriesDir = path.join(dataDirectory, dirent.name, 'categories');
            let categoryCount = 0;
            try {
              const categoryFiles = await fs.readdir(categoriesDir);
              categoryCount = categoryFiles.filter(f => f.endsWith('.json')).length;
            } catch {
              // Categories directory might not exist yet
            }

            return {
              id: dirent.name,
              name: metadata.market?.name || dirent.name,
              definition: metadata.market?.definition || 'Market analysis',
              geography: metadata.market?.geography || [],
              totalCompetitors: metadata.market?.totalCompetitors || 0,
              categories: categoryCount,
              lastAnalyzed: metadata.market?.lastAnalyzed || null,
              confidence: metadata.dataQuality?.confidence || 'medium'
            };
          } catch {
            // If metadata doesn't exist, create basic entry
            return {
              id: dirent.name,
              name: dirent.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              definition: 'Market analysis (configuration needed)',
              geography: [],
              totalCompetitors: 0,
              categories: 0,
              lastAnalyzed: null,
              confidence: 'low'
            };
          }
        })
    );

    return markets;
  } catch {
    console.error('Error loading markets');
    return [];
  }
}

export default async function HomePage() {
  const markets = await getAvailableMarkets();

  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Market Competition Analysis
          </h1>
          <p className="mt-4 text-xl text-indigo-100">
            Comprehensive competitive analysis across multiple markets
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mb-8 px-4 sm:px-0">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Available Markets</h2>
            <p className="text-lg text-slate-600">
              Select a market to explore competitive analysis, category breakdowns, and strategic insights.
            </p>
          </div>

          {markets.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">No Markets Available</h3>
                <p className="text-slate-600 mb-6">
                  To get started, create a market analysis using the methodology framework.
                </p>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-700">
                    <strong>Quick Start:</strong> Follow the README.md guide to create your first market analysis.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {markets.map((market) => (
                <Link key={market.id} href={`/markets/${market.id}`}>
                  <div className="bg-white overflow-hidden shadow-md rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer h-full flex flex-col">
                    <div className="p-6 flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <GlobeIcon />
                          <h3 className="text-xl font-bold text-slate-900">{market.name}</h3>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          market.confidence === 'high' ? 'bg-green-100 text-green-800' :
                          market.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {market.confidence}
                        </div>
                      </div>
                      <p className="text-base text-slate-600 mb-4">{market.definition}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-700">Competitors:</span>
                          <span className="ml-1 text-slate-600">{market.totalCompetitors}</span>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Categories:</span>
                          <span className="ml-1 text-slate-600">{market.categories}</span>
                        </div>
                        {market.geography.length > 0 && (
                          <div className="col-span-2">
                            <span className="font-medium text-slate-700">Geography:</span>
                            <span className="ml-1 text-slate-600">{market.geography.join(', ')}</span>
                          </div>
                        )}
                        {market.lastAnalyzed && (
                          <div className="col-span-2">
                            <span className="font-medium text-slate-700">Last Updated:</span>
                            <span className="ml-1 text-slate-600">{market.lastAnalyzed}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-5 bg-slate-50">
                       <span className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 group-hover:underline">
                         Explore Analysis &rarr;
                       </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}