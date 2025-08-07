'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from 'store/auth.store';

useAuthStore;

export default function Page() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return null;
}
