import type { Metadata } from "next"
import YouTubePlayer from "@/components/youtube-player"

export const metadata: Metadata = {
  title: "Abundance AG - Video Search",
  description: "Search and watch YouTube videos related to farming technology",
}

export default function VideoSearchPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8">Video Search</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Search for YouTube videos about farming technology, sustainable agriculture, and more. Simply paste a YouTube
          URL in the search box below to watch the video.
        </p>

        <YouTubePlayer />
      </div>
    </div>
  )
}
