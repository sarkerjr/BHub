import { create } from 'zustand';
import type { Provider } from '@/lib/types';

export interface ProviderStoreState {
  providers: Provider[];
  setProviders: (providers: Provider[]) => void;
}

export const useProviderStore = create<ProviderStoreState>((set) => ({
  providers: [],
  setProviders: (providers) => set({ providers }),
}));
