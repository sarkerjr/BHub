'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ProviderService } from '@/services/provider.service';
import type { Provider } from '@/lib/types';

export default function ProviderDetailsPage() {
  const params = useParams();
  const id = params?.id?.toString();
  const router = useRouter();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvider = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await ProviderService.getProviderById(id as string);
        setProvider(data);
      } catch (err) {
        console.error('Failed to fetch provider:', err);
        setError('Failed to load provider details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6"
        >
          ← Back to Search
        </Button>
        <div className="space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6"
        >
          ← Back to Search
        </Button>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error || 'Provider not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        ← Back to Search
      </Button>

      <Card className="overflow-hidden py-0">
        <CardHeader className="bg-gray-50 border-b py-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">
                {provider.providerName || 'Provider Details'}
              </CardTitle>
              <CardDescription className="mt-2">
                {provider.registeredCounty && `${provider.registeredCounty} • `}
                {provider.city && `${provider.city}`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Address
                </h3>
                <p className="mt-1">
                  {provider.address || 'N/A'}
                  {provider.city && `, ${provider.city}`}
                  {provider.registeredCounty &&
                    `, ${provider.registeredCounty}`}
                  {provider.zipCode && `, ${provider.zipCode}`}
                </p>
              </div>

              {provider.bedCount !== undefined &&
                provider.bedCount !== null && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Bed Count
                    </h3>
                    <p className="mt-1">{provider.bedCount}</p>
                  </div>
                )}
            </div>

            <div className="space-y-4">
              {provider.phone && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Phone
                  </h3>
                  <p className="mt-1">{provider.phone}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
