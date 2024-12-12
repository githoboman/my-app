'use client'

import { useCart } from '../contexts/cart-context'
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import Footer from '../components/footer'
import FloatingDock from '../components/floating-dock'

const products = [
  { id: 1, name: 'Classic Bob', price: 129.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Wavy Long', price: 159.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Pixie Cut', price: 99.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 4, name: 'Curly Afro', price: 139.99, image: '/placeholder.svg?height=200&width=200' },
]

export default function Cart() {
  const { cart, removeFromCart } = useCart()

  const cartItems = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.id)!
  }))

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-white text-xl">Your cart is empty.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
                <div className="flex items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover mr-4" />
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold mr-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
              <Button className="mt-4">Proceed to Checkout</Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <FloatingDock />
    </div>
  )
}

