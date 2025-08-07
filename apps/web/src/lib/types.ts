export interface Provider {
  id: number;
  providerName: string;
  address: string;
  city: string;
  registeredCounty: string;
  zipCode: string;
  bedCount: number | null;
}

export interface Media {
  id: number;
  providerId: number;
  fileName: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
