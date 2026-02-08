import type { Metadata } from 'next';
import { LanguageProvider } from '@/providers/language-provider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Fajar Nusantara Logistik - Solusi Pengiriman Terpercaya',
  description: 'Layanan logistik dan ekspedisi terpercaya untuk pengiriman barang, kendaraan, dan alat berat ke seluruh Indonesia.',
  keywords: 'logistik, ekspedisi, pengiriman, transportasi, Indonesia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
