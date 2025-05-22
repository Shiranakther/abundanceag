import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: "Abundance AG - Video Presentation",
  description: "100x Yield: Automated Farming Tech That Solves the Global Food Crisis",
}

export default function VideoPage() {
  // Replace this YouTube video ID with your actual video ID when you have it
  const youtubeVideoId = "Rd1HDWDEmSQ" // Placeholder - replace with your actual YouTube video ID

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-900 mb-6">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          100x Yield: Automated Farming Tech That Solves the Global Food Crisis
        </h1>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-xl">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&showinfo=0&autoplay=0`}
              title="Abundance AG Farming Technology"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            ></iframe>
          </div>
        </div>

        <div className="max-w-4xl mx-auto prose prose-green">
          <h2>Revolutionary Farming Technology</h2>
          <p>
            Discover our patented high-yield, green, sustainable and economical farming technology that increases
            productivity by 100x — transforming farming into a profitable, modern profession.
          </p>

          <h2>Key Benefits</h2>
          <ul>
            <li>
              <strong>High Yield:</strong> Our technology produces up to 100 times more yield than traditional farming
              methods.
            </li>
            <li>
              <strong>Sustainable:</strong> Environmentally friendly approach that conserves resources and reduces waste.
            </li>
            <li>
              <strong>Economical:</strong> Lower operating costs and higher returns make farming more profitable.
            </li>
            <li>
              <strong>Modern Solution:</strong> Automated systems reduce labor requirements and increase efficiency.
            </li>
          </ul>

          <div className="mt-8 bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Interested in Learning More?</h3>
            <p>Contact us to discover how our farming technology can revolutionize agriculture.</p>
            <div className="mt-4">
              <Link
                href="/#contact"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
