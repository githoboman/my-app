'use client'

import React, { createContext, useState, useContext } from 'react'

const CartContext = createContext(undefined)

function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = function(productId) {
    setCart(function(prevCart) {
      const existingItem = prevCart.find(function(item) { return item.id === productId })
      if (existingItem) {
        return prevCart.map(function(item) {
          return item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        })
      } else {
        return [...prevCart, { id: productId, quantity: 1 }]
      }
    })
  }

  const removeFromCart = function(productId) {
    setCart(function(prevCart) { return prevCart.filter(function(item) { return item.id !== productId }) })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { CartProvider }

