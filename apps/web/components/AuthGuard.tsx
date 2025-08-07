'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuthStore from '../store/auth.store';

const publicPaths = ['/login', '/register', '/forgot-password'];

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const AuthGuard = ({ children, redirectTo = '/login' }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, init } = useAuthStore();
  const isPublicPath = publicPaths.includes(pathname);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated && !isPublicPath) {
      router.push(redirectTo);
    } else if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router, isPublicPath, pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isPublicPath || isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
