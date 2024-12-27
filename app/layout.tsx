import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multiplayer Chess Game',
  description: 'A real-time multiplayer chess game built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}