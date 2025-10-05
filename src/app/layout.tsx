import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'Dhairya Himanshu Patel | Computer Science Student & Developer',
  description: 'Computer Science Engineering student at Parul University with expertise in MERN stack development and AI/ML. Passionate about creating innovative solutions.',
  keywords: ['Dhairya Patel', 'Computer Science', 'MERN Stack', 'AI/ML', 'Web Development', 'React', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Dhairya Himanshu Patel' }],
  openGraph: {
    title: 'Dhairya Himanshu Patel | Computer Science Student & Developer',
    description: 'Computer Science Engineering student with expertise in MERN stack development and AI/ML.',
    type: 'website',
  },
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
      </body>
    </html>
  )
}
