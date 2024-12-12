import FloatingDock from './components/floating-dock'
import ProductList from './components/product-list'
import Footer from './components/footer'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <main className="flex-grow pb-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-4xl font-bold text-white text-center">WigWonder</h1>
          <p className="mb-8 text-xl text-white text-center">Find your perfect style with our premium wigs</p>
          <div className="flex justify-center mb-12">
            <Button variant="secondary" size="lg">Shop Now</Button>
          </div>
          <ProductList />
        </div>
      </main>
      <Footer />
      <FloatingDock />
    </div>
  )
}

