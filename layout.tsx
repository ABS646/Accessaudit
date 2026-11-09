import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'AccessAudit — Accessibility risk review', description: 'Understand accessibility risks on your website and request a professional manual audit.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
