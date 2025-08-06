export interface Provider {
  providerName?: string;
  address?: string;
  city?: string;
  registeredCounty?: string;
  zipCode?: string;
  bedCount?: number | null;
  [key: string]: string | number | null | undefined;
}
