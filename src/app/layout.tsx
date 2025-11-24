import './globals.css'
import type { Metadata, Viewport } from 'next'
import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Dhairya Himanshu Patel | Computer Science Student & Developer',
  description: 'Computer Science Engineering student at Parul University with expertise in MERN stack development and AI/ML. Passionate about creating innovative solutions.',
  keywords: ['Dhairya Patel', 'Computer Science', 'MERN Stack', 'AI/ML', 'Web Development', 'React', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Dhairya Himanshu Patel' }],
  icons: {
    icon: [
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/dp-logo.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    shortcut: '/dp-logo.svg',
    apple: '/dp-logo.svg',
  },
  openGraph: {
    title: 'Dhairya Himanshu Patel | Computer Science Student & Developer',
    description: 'Computer Science Engineering student with expertise in MERN stack development and AI/ML.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <CustomCursor />
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
