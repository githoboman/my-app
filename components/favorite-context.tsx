'use client'

import React, { createContext, useState, useContext } from 'react'

function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = function(productId: string) {
    setFavorites(function(prevFavorites: string[]) {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter(function(id) { return id !== productId })
      } else {
        return [...prevFavorites, productId]
      }
    })
  }

  const isFavorite = function(productId: string) {
    return favorites.includes(productId)
  }

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  )
}
const FavoriteContext = createContext(undefined)

export function useFavorite() {
  const context = useContext(FavoriteContext)
  if (context === undefined) {
    throw new Error('useFavorite must be used within a FavoriteProvider')
  }
  return context
}

export { FavoriteProvider }

