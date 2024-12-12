import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">WigWonder</h2>
            <p>Find your perfect style</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <a href="https://wa.me/1234567890" className="flex items-center mb-2">
              <Phone className="mr-2" />
              WhatsApp: +1 (234) 567-890
            </a>
            <a href="mailto:contact@wigwonder.com" className="flex items-center">
              <Mail className="mr-2" />
              Email: contact@wigwonder.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

