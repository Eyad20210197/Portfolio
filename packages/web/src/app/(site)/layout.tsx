import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import PixelBlast from '@/components/PixelBlast';
import DockNav from '@/components/DockNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eyad Aboelftoh | Software Engineer',
  description:
    'Engineering portfolio for Eyad Aboelftoh, a software engineering student at Helwan University.',
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative min-h-screen bg-black text-white overflow-x-hidden`}
      >
        {/* 🌌 Background Effects */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <PixelBlast
            variant="circle"
            pixelSize={6}
            color="#B19EEF"
            patternScale={3}
            patternDensity={1.2}
            pixelSizeJitter={0.5}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.6}
            edgeFade={0.25}
            transparent
          />
        </div>

        {/* Readability Overlay */}
        <div className="fixed inset-0 bg-black/40 -z-10 pointer-events-none" />

        {/*  Top Dock Navigation (Header Replacement) */}
        <DockNav />

        {/*  Main Content */}
        <main className="container mx-auto px-6 pt-[120px] pb-16 min-h-screen">
          {children}
        </main>

        {/*  Footer */}
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-white/60 text-center">
            © {new Date().getFullYear()} Eyad Aboelftoh
          </div>
        </footer>
      </body>
    </html>
  );
}
