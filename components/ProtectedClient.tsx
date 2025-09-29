'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedClientProps {
  children: React.ReactNode;
  redirectTo?: string;
  requiredRole?: 'student' | 'mentor' | 'admin';
}

export default function ProtectedClient({ 
  children, 
  redirectTo = '/login',
  requiredRole 
}: ProtectedClientProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (requiredRole && session.user?.role !== requiredRole) {
      router.push('/'); // Redirect to home if role doesn't match
      return;
    }
  }, [session, status, router, redirectTo, requiredRole]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (requiredRole && session.user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
