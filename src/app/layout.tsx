/**
 * ATUL-1 Root Layout
 *
 * The main layout wrapping all pages. Includes:
 * - Font loading (Orbitron, Inter, JetBrains Mono, Space Grotesk)
 * - Bootstrap CSS (pre-compiled)
 * - Global styles (ATUL-1 design system)
 * - Navigation console
 * - Loading screen
 * - Metadata for SEO
 */

import type { Metadata } from 'next';
import { Orbitron, Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss';
import AppShell from './AppShell';

// Font Configuration
const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: 'ATUL-1 | The Digital Universe',
    template: '%s | ATUL-1',
  },
  description:
    'Explore the ATUL-1 Digital Universe — an interactive cinematic portfolio showcasing the engineering journey, projects, and skills of Atul Chauhan, a Software Engineer from Mumbai, India.',
  keywords: [
    'Atul Chauhan',
    'ATUL-1',
    'Software Engineer',
    'Java Developer',
    'Spring Boot',
    'Portfolio',
    'Interactive Portfolio',
    '3D Portfolio',
    'Mumbai',
    'India',
  ],
  authors: [{ name: 'Atul Chauhan' }],
  creator: 'Atul Chauhan',
  publisher: 'Atul Chauhan',
  metadataBase: new URL('https://atul-1.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://atul-1.vercel.app',
    siteName: 'ATUL-1',
    title: 'ATUL-1 | The Digital Universe',
    description:
      'An interactive cinematic portfolio showcasing the engineering journey of Atul Chauhan.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ATUL-1 Digital Universe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATUL-1 | The Digital Universe',
    description:
      'An interactive cinematic portfolio showcasing the engineering journey of Atul Chauhan.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}