'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../../contexts/cart-context'
import { useFavorite } from '../../contexts/favorite-context'
import FloatingDock from '../../components/floating-dock'
import Footer from '../../components/footer'

const products = [
  { 
    id: 1, 
    name: 'Classic Bob', 
    price: 129.99, 
    image: '/placeholder.svg?height=400&width=400',
    additionalImages: [
      '/placeholder.svg?height=200&width=200&text=Side',
      '/placeholder.svg?height=200&width=200&text=Back',
      '/placeholder.svg?height=200&width=200&text=Styled',
    ],
    description: 'The Classic Bob wig offers a timeless and sophisticated look. This versatile style features a straight cut that falls just above the shoulders, framing the face beautifully. Made with high-quality synthetic fibers, it looks and feels natural while being easy to maintain.',
    features: [
      'Length: 12 inches',
      'Cap Size: Average',
      'Material: Heat-resistant synthetic fiber',
      'Style: Straight',
      'Color: Natural black (other colors available)',
    ],
  },
  { 
    id: 2, 
    name: 'Wavy Long', 
    price: 159.99, 
    image: '/placeholder.svg?height=400&width=400',
    additionalImages: [
      '/placeholder.svg?height=200&width=200&text=Side',
      '/placeholder.svg?height=200&width=200&text=Back',
      '/placeholder.svg?height=200&width=200&text=Styled',
    ],
    description: 'The Wavy Long wig offers a glamorous and feminine look. This stunning style features long, flowing waves that cascade down your back. Made with premium synthetic fibers, it provides a natural look and feel while being durable and easy to style.',
    features: [
      'Length: 22 inches',
      'Cap Size: Average',
      'Material: Heat-resistant synthetic fiber',
      'Style: Wavy',
      'Color: Dark brown (other colors available)',
    ],
  },
  { 
    id: 3, 
    name: 'Pixie Cut', 
    price: 99.99, 
    image: '/placeholder.svg?height=400&width=400',
    additionalImages: [
      '/placeholder.svg?height=200&width=200&text=Side',
      '/placeholder.svg?height=200&width=200&text=Back',
      '/placeholder.svg?height=200&width=200&text=Styled',
    ],
    description: 'The Pixie Cut wig offers a chic and modern look. This short style features a textured cut that's both edgy and elegant. Made with high-quality synthetic fibers, it provides a natural appearance and is incredibly easy to maintain and style.',
    features: [
      'Length: 4 inches',
      'Cap Size: Average',
      'Material: Heat-resistant synthetic fiber',
      'Style: Textured short',
      'Color: Platinum blonde (other colors available)',
    ],
  },
  { 
    id: 4, 
    name: 'Curly Afro', 
    price: 139.99, 
    image: '/placeholder.svg?height=400&width=400',
    additionalImages: [
      '/placeholder.svg?height=200&width=200&text=Side',
      '/placeholder.svg?height=200&width=200&text=Back',
      '/placeholder.svg?height=200&width=200&text=Styled',
    ],
    description: 'The Curly Afro wig celebrates natural beauty with its full, bouncy curls. This voluminous style offers a bold and confident look. Crafted with high-quality synthetic fibers, it provides the appearance of natural hair texture while being easy to maintain.',
    features: [
      'Length: 6 inches when stretched',
      'Cap Size: Average',
      'Material: Heat-resistant synthetic fiber',
      'Style: Tight curls',
      'Color: Natural black (other colors available)',
    ],
  },
]

export default function ProductDetail() {
  const { id } = useParams()
  const productId = parseInt(id)
  const product = products.find(function(p) { return p.id === productId })

  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorite()
  const [selectedImage, setSelectedImage] = useState(product ? product.image : '')

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <Image 
                  src={selectedImage || product.image} 
                  alt={product.name} 
                  width={400} 
                  height={400} 
                  className="w-full rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={200} 
                  height={200} 
                  className="w-full rounded-lg cursor-pointer"
                  onClick={function() { setSelectedImage(product.image) }}
                />
                {product.additionalImages.map(function(img, index) {
                  return (
                    <Image 
                      key={index}
                      src={img} 
                      alt={product.name + " view " + (index + 1)} 
                      width={200} 
                      height={200} 
                      className="w-full rounded-lg cursor-pointer"
                      onClick={function() { setSelectedImage(img) }}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
              <p className="mb-4">{product.description}</p>
              <h2 className="text-xl font-semibold mb-2">Features:</h2>
              <ul className="list-disc list-inside mb-4">
                {product.features.map(function(feature, index) {
                  return <li key={index}>{feature}</li>
                })}
              </ul>
              <div className="flex space-x-4">
                <Button onClick={function() { addToCart(product.id) }} className="flex-grow">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  onClick={function() { toggleFavorite(product.id) }}
                  className={"p-2 " + (isFavorite(product.id) ? "bg-red-100" : "")}
                >
                  <Heart className={"h-6 w-6 " + (isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-gray-500")} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingDock />
    </div>
  )
}

