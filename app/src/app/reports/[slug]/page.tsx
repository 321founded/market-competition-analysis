import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import { notFound } from 'next/navigation';
import ServicesChart from '@/components/ServicesChart';

interface Competitor {
  name: string;
  description: string;
  services: string[];
  sourceURL: string;
  logoURL: string | null;
}

interface CategoryData {
  categoryName: string;
  categoryDefinition: string;
  competitors: Competitor[];
}

async function getReportData(slug: string): Promise<CategoryData | null> {
  const filePath = path.join(process.cwd(), '..', 'data', 'employee_benefits_greece', `${slug}.json`);
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  const dataDirectory = path.join(process.cwd(), '..', 'data', 'employee_benefits_greece');
  const files = await fs.readdir(dataDirectory);
  return files.map(file => ({
    slug: file.replace(/\.json$/, ''),
  }));
}

export default async function ReportPage({ params }: { params: { slug: string } }) {
  const data = await getReportData(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <Link href="/" className="text-indigo-200 hover:text-white text-sm font-medium mr-4">
            &larr; Back to Categories
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            {data.categoryName}
          </h1>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mb-10">
            <p className="text-xl text-slate-600 mb-8">{data.categoryDefinition}</p>
            <div className="bg-white shadow-xl rounded-xl overflow-hidden p-6">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">Services Offered Comparison</h2>
               <ServicesChart data={data.competitors} />
            </div>
          </div>

          <div className="space-y-10">
            {data.competitors.map((competitor) => (
              <div key={competitor.name} className="bg-white overflow-hidden shadow-xl rounded-xl flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 bg-slate-50 p-6 flex items-center justify-center relative">
                  {competitor.logoURL ? (
                    <Image 
                      src={competitor.logoURL} 
                      alt={`${competitor.name} logo`} 
                      fill 
                      style={{ objectFit: 'contain', padding: '1rem' }}
                    />
                  ) : (
                    <div className="w-full h-24 flex items-center justify-center text-sm text-slate-500">
                      Logo not found
                    </div>
                  )}
                </div>
                <div className="w-full md:w-2/3 p-6">
                  <h3 className="text-2xl font-bold text-slate-900">{competitor.name}</h3>
                  <p className="mt-3 text-base text-slate-600">{competitor.description}</p>
                  
                  <div className="mt-5">
                    <h4 className="font-semibold text-md text-slate-800">Key Services:</h4>
                    <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 text-sm">
                      {competitor.services.map(service => (
                        <li key={service} className="flex items-center">
                          <svg className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 text-right">
                    <a 
                      href={competitor.sourceURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Visit Source
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}