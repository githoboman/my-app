'use client'

import { useState } from 'react'
import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useCart } from './cart-context'
import { useFavorite } from './favorite-context'

const dockItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Search', href: '#' },
  { icon: ShoppingCart, label: 'Cart', href: '/cart' },
  { icon: Heart, label: 'Favorites', href: '#' },
  { icon: User, label: 'Profile', href: '#' },
]

export default function FloatingDock() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const { cart } = useCart()
  const { favorites } = useFavorite()

  const cartItemCount = cart.reduce(function(sum, item) { return sum + item.quantity }, 0)
  const favoriteCount = favorites.length

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-gray-800 p-2 z-50">
      <nav className="flex items-center space-x-2">
        {dockItems.map(function(item, index) {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "transition-all duration-200 ease-in-out p-2 rounded-full text-white hover:bg-white/20 relative",
                hoveredIndex === index ? "scale-125" : "",
                hoveredIndex !== null && hoveredIndex !== index ? "scale-90 opacity-70" : ""
              )}
              onMouseEnter={function() { setHoveredIndex(index) }}
              onMouseLeave={function() { setHoveredIndex(null) }}
            >
              <item.icon className="h-6 w-6" />
              <span className="sr-only">{item.label}</span>
              {item.label === 'Cart' && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              {item.label === 'Favorites' && favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

