'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScraperService, ScrapedProvider } from '@/services/scraper.service';

export default function ScraperPage() {
  const [data, setData] = useState<ScrapedProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [saveResult, setSaveResult] = useState<{
    created: number;
    updated: number;
    total: number;
  } | null>(null);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const term = searchTerm.toLowerCase();
    return data.filter((provider) =>
      Object.values(provider).some((value) =>
        value?.toString().toLowerCase().includes(term)
      )
    );
  }, [data, searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setSaveResult(null);

    try {
      const result = await ScraperService.fetchScrapedData();
      setData(result);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Failed to load scraped data. Please try again.');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDatabase = async () => {
    if (data?.length === 0) return;

    setSaving(true);
    setError(null);

    try {
      const result = await ScraperService.saveToDatabase(data);
      setSaveResult(result.data);
    } catch (err) {
      console.error('Failed to save data:', err);
      setError('Failed to save data. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Scraper Dashboard
          </h1>
          <p className="text-muted-foreground">
            {data?.length > 0
              ? `Showing ${filteredData?.length} of ${data?.length} providers`
              : 'No data loaded. Fetch data to begin.'}
          </p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button
            onClick={fetchData}
            disabled={loading || saving}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Fetching...
              </>
            ) : (
              'Fetch Scraped Data'
            )}
          </Button>
          <Button
            onClick={handleSaveToDatabase}
            disabled={data?.length === 0 || saving || loading}
            variant="outline"
            className="w-full sm:w-auto"
          >
            {saving ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save to Database'
            )}
          </Button>
        </div>
      </div>

      {/* Status Messages */}
      <div className="space-y-4">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start space-x-2">
            <svg
              className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {saveResult && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start space-x-2">
            <svg
              className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="font-medium">Success</p>
              <p className="text-sm">
                Successfully saved {saveResult.total} providers (
                {saveResult.created} created, {saveResult.updated} updated)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Search and Table */}
      <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
        <div className="p-4 border-b">
          <div className="relative max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Input
              placeholder="Search providers..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              className="pl-10 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold text-gray-700">
                  Provider Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Address
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  City
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  County
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Zip Code
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">
                  Beds
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      <p className="text-sm text-gray-500">
                        Loading provider data...
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredData?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <svg
                        className="h-10 w-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm text-gray-500">
                        {data?.length === 0
                          ? 'No data available. Click "Fetch Scraped Data" to load providers.'
                          : 'No providers match your search.'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData?.map((provider, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {provider.providerName || '-'}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {provider.address || '-'}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {provider.city || '-'}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {provider.registeredCounty || '-'}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {provider.zipCode || '-'}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {provider.bedCount !== null &&
                      provider.bedCount !== undefined
                        ? provider.bedCount
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
