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

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

async function getCategoryData(marketId: string, categoryId: string) {
  try {
    // For production deployment, data is in public/data
    const dataDirectory = path.join(process.cwd(), 'public', 'data', marketId);

    // Load category data
    const categoryPath = path.join(dataDirectory, 'categories', `${categoryId}.json`);
    const categoryContent = await fs.readFile(categoryPath, 'utf8');
    const categoryData = JSON.parse(categoryContent);

    // Load market metadata for context
    const metadataPath = path.join(dataDirectory, 'metadata.json');
    const metadataContent = await fs.readFile(metadataPath, 'utf8');
    const metadata = JSON.parse(metadataContent);

    return {
      category: categoryData,
      market: metadata.market || {},
      marketId
    };
  } catch (error) {
    console.error('Error loading category data:', error);
    return null;
  }
}

interface CategoryPageProps {
  params: {
    market: string;
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const data = await getCategoryData(resolvedParams.market, resolvedParams.category);

  if (!data) {
    notFound();
  }

  const { category, market } = data;
  const competitors = category.competitors || [];

  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Link href="/" className="flex items-center text-indigo-200 hover:text-white transition-colors mr-2">
              <BackIcon />
              <span className="ml-2">Markets</span>
            </Link>
            <span className="text-indigo-200 mx-2">/</span>
            <Link href={`/markets/${resolvedParams.market}`} className="text-indigo-200 hover:text-white transition-colors">
              {market.name || resolvedParams.market}
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            {category.categoryName}
          </h1>
          <p className="text-xl text-indigo-100">
            {competitors.length} competitors in this category
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category Definition */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Category Definition</h2>
            <p className="text-lg text-slate-700 mb-6">{category.categoryDefinition}</p>

            {category.categoryCharacteristics && category.categoryCharacteristics.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3">Key Characteristics</h3>
                  <ul className="space-y-2">
                    {category.categoryCharacteristics.map((characteristic: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-slate-600">{characteristic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {category.marketDynamics && (
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">Market Dynamics</h3>
                    <div className="space-y-3 text-sm">
                      {category.marketDynamics.competitiveApproach && (
                        <div>
                          <span className="font-medium text-slate-600">Competitive Approach:</span>
                          <p className="text-slate-600 mt-1">{category.marketDynamics.competitiveApproach}</p>
                        </div>
                      )}
                      {category.marketDynamics.customerProfile && (
                        <div>
                          <span className="font-medium text-slate-600">Customer Profile:</span>
                          <p className="text-slate-600 mt-1">{category.marketDynamics.customerProfile}</p>
                        </div>
                      )}
                      {category.marketDynamics.growthTrends && (
                        <div>
                          <span className="font-medium text-slate-600">Growth Trends:</span>
                          <p className="text-slate-600 mt-1">{category.marketDynamics.growthTrends}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Competitors Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Competitors in {category.categoryName}</h2>

            {competitors.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-slate-500">No competitors found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {competitors.map((competitor: {
                  name: string;
                  website?: string;
                  logoURL?: string;
                  description: string;
                  services?: string[];
                  founded?: string;
                  headquarters?: string;
                  employees?: string;
                  funding?: string;
                  reviews?: any;
                  strengths?: string[];
                  considerations?: string[];
                }, index: number) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">

                    {/* Company Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-1">{competitor.name}</h3>
                        <div className="flex items-center space-x-2">
                          {competitor.website && (
                            <a
                              href={competitor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-500 flex items-center text-sm"
                            >
                              Website <ExternalLinkIcon />
                            </a>
                          )}
                        </div>
                      </div>
                      {competitor.logoURL && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={competitor.logoURL}
                          alt={`${competitor.name} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      )}
                    </div>

                    {/* Company Description */}
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{competitor.description}</p>

                    {/* Company Details */}
                    <div className="space-y-3 text-sm">
                      {competitor.services && competitor.services.length > 0 && (
                        <div>
                          <span className="font-medium text-slate-700">Services:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {competitor.services.slice(0, 3).map((service: string, serviceIndex: number) => (
                              <span
                                key={serviceIndex}
                                className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                              >
                                {service}
                              </span>
                            ))}
                            {competitor.services.length > 3 && (
                              <span className="text-xs text-slate-500">
                                +{competitor.services.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Business Information */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {competitor.founded && (
                          <div>
                            <span className="font-medium text-slate-600">Founded:</span>
                            <span className="ml-1 text-slate-600">{competitor.founded}</span>
                          </div>
                        )}
                        {competitor.headquarters && (
                          <div>
                            <span className="font-medium text-slate-600">HQ:</span>
                            <span className="ml-1 text-slate-600">{competitor.headquarters}</span>
                          </div>
                        )}
                        {competitor.employees && (
                          <div>
                            <span className="font-medium text-slate-600">Employees:</span>
                            <span className="ml-1 text-slate-600">{competitor.employees}</span>
                          </div>
                        )}
                        {competitor.funding && (
                          <div>
                            <span className="font-medium text-slate-600">Funding:</span>
                            <span className="ml-1 text-slate-600">{competitor.funding}</span>
                          </div>
                        )}
                      </div>

                      {/* Reviews */}
                      {competitor.reviews && (
                        <div>
                          <span className="font-medium text-slate-700">Reviews:</span>
                          <div className="mt-1 flex space-x-3 text-xs">
                            {competitor.reviews.g2 && (
                              <span className="text-slate-600">
                                G2: {competitor.reviews.g2.score}/5 ({competitor.reviews.g2.reviewCount})
                              </span>
                            )}
                            {competitor.reviews.capterra && (
                              <span className="text-slate-600">
                                Capterra: {competitor.reviews.capterra.score}/5 ({competitor.reviews.capterra.reviewCount})
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Strengths & Considerations */}
                      {(competitor.strengths || competitor.considerations) && (
                        <div className="pt-2 border-t border-slate-100">
                          {competitor.strengths && competitor.strengths.length > 0 && (
                            <div className="mb-2">
                              <span className="font-medium text-green-700 text-xs">Strengths:</span>
                              <p className="text-xs text-slate-600 mt-1">
                                {competitor.strengths.slice(0, 2).join(', ')}
                              </p>
                            </div>
                          )}
                          {competitor.considerations && competitor.considerations.length > 0 && (
                            <div>
                              <span className="font-medium text-amber-700 text-xs">Considerations:</span>
                              <p className="text-xs text-slate-600 mt-1">
                                {competitor.considerations.slice(0, 2).join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Screenshots */}
                      {competitor.screenshots && Object.keys(competitor.screenshots).length > 0 && (
                        <div className="pt-3 border-t border-slate-100">
                          <span className="font-medium text-slate-700 text-xs mb-2 block">Screenshots:</span>
                          <div className="grid grid-cols-3 gap-2">
                            {Object.entries(competitor.screenshots).map(([key, url]: [string, string]) => (
                              <div key={key} className="relative group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={url}
                                  alt={`${competitor.name} ${key}`}
                                  className="w-full h-12 object-cover rounded border border-slate-200 hover:border-indigo-300 transition-all"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded transition-all"></div>
                                <span className="absolute bottom-0 left-0 right-0 text-xs text-white bg-black bg-opacity-60 px-1 py-0.5 rounded-b text-center truncate">
                                  {key}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Insights */}
          {category.categoryInsights && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Category Analysis</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.categoryInsights.keyFindings && category.categoryInsights.keyFindings.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">Key Findings</h3>
                    <ul className="space-y-2">
                      {category.categoryInsights.keyFindings.map((finding: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-600">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-4">
                  {category.categoryInsights.topPerformers && category.categoryInsights.topPerformers.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-700 mb-2">Top Performers</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.categoryInsights.topPerformers.map((performer: string, index: number) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                          >
                            {performer}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {category.categoryInsights.marketGaps && category.categoryInsights.marketGaps.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-700 mb-2">Market Gaps</h3>
                      <ul className="space-y-1">
                        {category.categoryInsights.marketGaps.map((gap: string, index: number) => (
                          <li key={index} className="text-sm text-slate-600">• {gap}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {(category.categoryInsights.threatAssessment || category.categoryInsights.futureOutlook) && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {category.categoryInsights.threatAssessment && (
                      <div>
                        <h3 className="font-semibold text-slate-700 mb-2">Threat Assessment</h3>
                        <p className="text-sm text-slate-600">{category.categoryInsights.threatAssessment}</p>
                      </div>
                    )}
                    {category.categoryInsights.futureOutlook && (
                      <div>
                        <h3 className="font-semibold text-slate-700 mb-2">Future Outlook</h3>
                        <p className="text-sm text-slate-600">{category.categoryInsights.futureOutlook}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}