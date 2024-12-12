'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from 'lucide-react'
import { useCart } from './cart-context'
import { useFavorite } from './favorite-context'

const products = [
  { id: 1, name: 'Classic Bob', price: 129.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Wavy Long', price: 159.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Pixie Cut', price: 99.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 4, name: 'Curly Afro', price: 139.99, image: '/placeholder.svg?height=200&width=200' },
]

export default function ProductList() {
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorite()

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Featured Wigs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          return (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
              <Link href={`/product/${product.id}`}>
                <Image src={product.image} alt={product.name} width={200} height={200} className="w-full" />
              </Link>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                aria-label={isFavorite && isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`h-6 w-6 ${isFavorite && isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
              </button>
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                </Link>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <Button onClick={() => addToCart(product)} className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>
          )
        })}
      </div>    </div>
  )
}

