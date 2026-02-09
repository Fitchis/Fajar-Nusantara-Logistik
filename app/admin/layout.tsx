import { AdminAuthProvider } from '@/providers/admin-auth-provider';
import AdminLayout from '@/components/admin-layout';

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuthProvider>
  );
}
