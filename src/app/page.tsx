import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import VideoSection from "@/components/video-section"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageContent />
    </main>
  )
}

function PageContent() {
  // This will be controlled by the Navbar component through URL hash
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="section-content">
        <div className="w-full h-[100vh] mb-4 relative top-0">
          <Image src="/images/herosection.png" alt="Abundance AG Hero" layout="fill" objectFit="cover" priority />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white section-content md:mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">About Us</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              Abundance AG is a provider of vegetable planting solutions, including patented high-yield, green,
              sustainable and economical farming technology.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              We also supply fresh foods at competitive prices.
            </p>

            {/* Image Section */}
            <div className="mt-6">
              <img
                src="/images/thumbnail.png"
                alt="Fresh foods"
                className="mx-auto rounded-lg shadow-md w-full max-w-xl"
              />
            </div>
          </div>
        </div>

        {/* Video Section (part of About) */}
        <VideoSection />
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50 section-content md:mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">Our Products</h2>

          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-center text-green-700 mb-8">
              Automated Vegetable Farming System
            </h3>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <Image
                src="/images/veg-sec.png"
                alt="Automated Farming System"
                width={800}
                height={400}
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold text-center text-green-700 mb-8">Fresh Foods</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="p-4">
                <Image
                  src="/images/veg1.jpeg"
                  alt="Fresh Vegetables"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h4 className="text-xl font-semibold text-green-700 mt-4 mb-2">Vegetables</h4>
                <p className="text-gray-600">Fresh vegetables grown with our advanced farming technology</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="p-4">
                <Image
                  src="/images/fish.jpg"
                  alt="Fresh Fish"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h4 className="text-xl font-semibold text-green-700 mt-4 mb-2">Fish</h4>
                <p className="text-gray-600">Sustainably sourced fresh fish for your healthy diet</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="p-4">
                <Image
                  src="/images/chicken.jpg"
                  alt="Fresh Chicken"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h4 className="text-xl font-semibold text-green-700 mt-4 mb-2">Chicken</h4>
                <p className="text-gray-600">Free-range, antibiotic-free chicken raised with care</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="p-4">
                <Image
                  src="/images/meat.jpg"
                  alt="Fresh Meat"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h4 className="text-xl font-semibold text-green-700 mt-4 mb-2">Meat</h4>
                <p className="text-gray-600">Premium quality meat from ethically raised livestock</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white section-content md:h-[80vh]  md:mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">Contact Us</h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-xl">
              <Phone className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">WhatsApp</h3>
              <p className="text-gray-700">+65-94522830</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-xl">
              <Mail className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Email</h3>
              <p className="text-gray-700">siewcf@abundanceag.com</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-xl">
              <MapPin className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Address</h3>
              <p className="text-gray-700">531A Upper Cross Street, #04-95. Singapore 051531</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Abundance AG. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
