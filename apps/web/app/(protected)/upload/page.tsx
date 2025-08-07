'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProviderService } from '@/services/provider.service';
import { MediaService } from '@/services/media.service';
import type { Provider } from '@/lib/types';

export default function ProviderImageUpload() {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProviders = async () => {
      try {
        setIsLoading(true);
        const providerData = await ProviderService.searchProviders('');
        setProviders(providerData);
      } catch (err) {
        setError('Failed to load providers');
        console.error('Error loading providers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProviders();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFiles(e.target.files);

    const filePreviews = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(filePreviews);
  };

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProvider || !files || files.length === 0) {
      setError('Please select a provider and at least one file');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const filesArray = Array.from(files);
      await MediaService.uploadMedia(selectedProvider, filesArray);

      // Redirect to provider details page after successful upload
      router.push(`/providers/${selectedProvider}`);
    } catch (error) {
      console.error('Error uploading files:', error);
      setError('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto w-2/3 px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upload Images to Provider</h1>

      {isLoading ? (
        <div>Loading providers...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <Label htmlFor="provider">Select Provider</Label>
            <Select
              onValueChange={setSelectedProvider}
              value={selectedProvider}
            >
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id?.toString()}>
                    {provider.providerName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Upload Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-sm text-muted-foreground">
              You can select multiple images to upload at once.
            </p>

            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">
                  Selected Images ({previews.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {previews.map((preview, index) => (
                    <div key={preview} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-lg border border-border">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newPreviews = [...previews];
                          newPreviews.splice(index, 1);
                          setPreviews(newPreviews);

                          // Update files state
                          if (files) {
                            const newFiles = new DataTransfer();
                            Array.from(files).forEach((file, i) => {
                              if (i !== index) newFiles.items.add(file);
                            });
                            setFiles(newFiles.files);
                          }
                        }}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      <span className="text-xs text-muted-foreground truncate block mt-1">
                        {files?.[index]?.name || 'image'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                selectedProvider === '' ||
                files === null ||
                files.length === 0 ||
                isUploading
              }
            >
              {isUploading ? 'Uploading...' : 'Upload Images'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
