import { Metadata } from 'next'
import './globals.css'
import Navbar from "../components/Navbar";


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
      <body >
        <header className="w-50">
          <Navbar/>
        </header>
        {children}
      </body>
    </html>
  )
}
