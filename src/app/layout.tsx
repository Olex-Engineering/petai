import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react';
import { AppHeader } from '@/app/shareable/components/header/AppHeader';
import { GlobalProvider } from './shareable/providers/GlobalProvider';
import { ToastContainer } from 'react-toastify';

import './globals.css'
import './styles/global.css';
import 'react-toastify/dist/ReactToastify.min.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PetAI',
  description: 'Dog tamagochi game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <main className={'min-h-screen dark text-foreground bg-background'}>
            <AppHeader></AppHeader>
            {children}
          </main>
        </GlobalProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  )
};
