import apiClient from '@/lib/api';
import { Media } from '@/lib/types';

export interface UploadMediaResponse {
  success: boolean;
  data: Media | Media[];
}

export const MediaService = {
  async uploadMedia(providerId: string, files: File[]): Promise<Media[]> {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('file', file);
    });

    const response = await apiClient.post<UploadMediaResponse>(
      `/media/providers/${providerId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (!response.success) {
      throw new Error('Failed to upload media');
    }

    return Array.isArray(response.data) ? response.data : [response.data];
  },

  async getMediaByProviderId(providerId: string): Promise<Media[]> {
    const response = await apiClient.get<{ success: boolean; data: Media[] }>(
      `/media/providers/${providerId}`
    );

    if (!response.success) {
      throw new Error('Failed to fetch media');
    }

    return response.data;
  },
};

export default MediaService;
