'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageSlider } from '@/components/ui/image-slider';
import { ProviderService } from '@/services/provider.service';
import { MediaService } from '@/services/media.service';
import type { Media } from '@/lib/types';
import type { Provider } from '@/lib/types';

export default function ProviderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [mediaError, setMediaError] = useState<string | null>(null);

  const providerId = params?.id?.toString();

  // Fetch provider data
  useEffect(() => {
    if (!providerId) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [providerData, mediaData] = await Promise.all([
          ProviderService.getProviderById(providerId),
          MediaService.getMediaByProviderId(providerId).catch((err) => {
            console.error('Error fetching media:', err);
            setMediaError('Failed to load media');
            return [];
          }),
        ]);

        setProvider(providerData);
        setMedia(mediaData || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load provider details');
      } finally {
        setIsLoading(false);
        setIsMediaLoading(false);
      }
    };

    fetchData();
  }, [providerId]);

  const handleBack = () => {
    router.push('/providers');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-32 mb-6" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-md bg-destructive/10 p-4 text-destructive">
          <p>{error || 'Provider not found'}</p>
          <Button variant="ghost" className="mt-4" onClick={handleBack}>
            Back to Providers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button variant="outline" size="sm" onClick={handleBack} className="mb-6">
        ← Back to Providers
      </Button>

      <div className="bg-white rounded-lg shadow-sm border p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">{provider.providerName}</h1>
          <p className="text-muted-foreground">ID: {provider.id}</p>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Address
              </h3>
              <p className="mt-1">
                {provider.address}
                <br />
                {provider.city}, {provider.registeredCounty} {provider.zipCode}
              </p>
            </div>

            {provider.bedCount && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Bed Count
                </h3>
                <p className="mt-1">{provider.bedCount}</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Facility Images</h2>
            <div className="relative w-full bg-gray-50 rounded-lg overflow-hidden">
              {isMediaLoading ? (
                <div className="aspect-video flex items-center justify-center">
                  <p>Loading images...</p>
                </div>
              ) : mediaError ? (
                <div className="aspect-video flex items-center justify-center p-4 text-center">
                  <p className="text-destructive">{mediaError}</p>
                </div>
              ) : (
                <ImageSlider
                  images={media.map((m) => ({
                    id: m.id,
                    url: m.fileUrl,
                    alt: `Image of ${provider.providerName}`,
                  }))}
                  className="w-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
