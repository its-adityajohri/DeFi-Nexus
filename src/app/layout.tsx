import { Metadata } from 'next'
import './globals.css'



export const metadata: Metadata = {
  title: 'DeFi-Nexus',
  description: 'A Secure way to make your transaction.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
