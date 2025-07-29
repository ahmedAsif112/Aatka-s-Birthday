'use client';
import './globals.css';
import { ConfigProvider } from 'antd';
import { AnimatePresence } from "framer-motion";
import Analytics from '@/components/Analytics'; // 👈 Add this line

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Analytics /> {/* 👈 Inject the tracking script */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#4658A4',
              colorText: '#6B7A99',
              colorTextSecondary: '#6B7A99',
              colorLink: '#4658A4',
              borderRadius: 5,
            },
          }}
        >
          <AnimatePresence>{children}</AnimatePresence>
        </ConfigProvider>
      </body>
    </html>
  );
}
