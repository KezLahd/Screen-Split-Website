import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Screen Split - Professional Screen & Webcam Capture Tool',
  description: 'The perfect tool for streamers, educators, and presenters who want to show both their screen and face in one clean window.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any'
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml'
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
