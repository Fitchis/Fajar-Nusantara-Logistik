'use client';

import { useAdminAuth } from '@/providers/admin-auth-provider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from './admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isLoading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect if loading
    if (isLoading) return;

    // Allow access to login page
    if (pathname === '/admin/login') return;

    // Redirect to login if not authenticated
    if (!session) {
      router.push('/admin/login');
    }
  }, [session, isLoading, pathname, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 bg-brand rounded-lg animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  // If on login page, don't show sidebar
  if (pathname === '/admin/login') {
    return children;
  }

  // If not authenticated, show nothing (will redirect in useEffect)
  if (!session) {
    return null;
  }

  // Show admin layout with sidebar
  return (
    <div className="flex h-screen bg-slate-950">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
