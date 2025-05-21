"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Search, X } from "lucide-react"

export default function YouTubePlayer() {
  const [videoUrl, setVideoUrl] = useState("")
  const [videoId, setVideoId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const extractVideoId = (url: string): string | null => {
    // Handle different YouTube URL formats
    const regexPatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*&v=)([^&?#]+)/,
      /youtube\.com\/shorts\/([^&?#]+)/,
    ]

    for (const pattern of regexPatterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (!videoUrl.trim()) {
      setError("Please enter a YouTube video URL")
      setIsLoading(false)
      return
    }

    const id = extractVideoId(videoUrl)
    if (!id) {
      setError("Invalid YouTube URL. Please enter a valid YouTube video link.")
      setIsLoading(false)
      return
    }

    // Simulate loading
    setTimeout(() => {
      setVideoId(id)
      setIsLoading(false)
    }, 500)
  }

  const clearVideo = () => {
    setVideoId(null)
    setVideoUrl("")
    setError(null)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4">YouTube Video Player</h2>
          <p className="text-gray-600 mb-6">Enter a YouTube video URL to watch it directly on our website.</p>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=...)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
                {videoUrl && (
                  <button
                    type="button"
                    onClick={() => setVideoUrl("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center min-w-[120px] transition-colors"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Watch
                  </>
                )}
              </button>
            </div>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          </form>

          {videoId && (
            <div className="space-y-4">
              <div className="relative pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                ></iframe>
              </div>
              <div className="flex justify-end">
                <button onClick={clearVideo} className="text-gray-600 hover:text-gray-800 flex items-center">
                  <X className="h-4 w-4 mr-1" />
                  Clear video
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
