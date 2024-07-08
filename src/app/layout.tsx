import './globals.css'
import { Providers } from '@/redux/Provider'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ weight: ["300", "400", "600", "700"], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clinica de la Piel',
  description: 'Clinica Dermatologica',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
