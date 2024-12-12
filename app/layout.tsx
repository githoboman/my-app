import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from './contexts/cart-context'
import { FavoriteProvider } from './contexts/favorite-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WigWonder - Premium Wigs',
  description: 'Find your perfect style with our premium wigs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FavoriteProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </FavoriteProvider>
      </body>
    </html>
  )
}

