import './globals.css'
import { Providers } from '@/redux/Provider'
import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'

const exo_2 = Exo_2({ weight: ["300", "400", "500", "600", "700"], subsets: ['cyrillic'] })


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
      <body className={exo_2.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
