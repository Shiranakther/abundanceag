"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, Download } from "lucide-react"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  autoPlay?: boolean
  showControls?: boolean
  loop?: boolean
}

export default function VideoPlayer({
  src,
  poster,
  title,
  autoPlay = false,
  showControls = true,
  loop = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isControlsVisible, setIsControlsVisible] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)
    }

    const onLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
    }

    const onEnded = () => {
      if (!loop) {
        setIsPlaying(false)
      }
    }

    const onLoadedData = () => {
      setIsLoading(false)
    }

    const onError = () => {
      setError("Error loading video. Please try again later.")
      setIsLoading(false)
    }

    const onWaiting = () => {
      setIsLoading(true)
    }

    const onPlaying = () => {
      setIsLoading(false)
    }

    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("ended", onEnded)
    video.addEventListener("loadeddata", onLoadedData)
    video.addEventListener("error", onError)
    video.addEventListener("waiting", onWaiting)
    video.addEventListener("playing", onPlaying)

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("error", onError)
      video.removeEventListener("waiting", onWaiting)
      video.removeEventListener("playing", onPlaying)
    }
  }, [loop])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const newTime = pos * videoRef.current.duration

    videoRef.current.currentTime = newTime
    setProgress(pos * 100)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)

    if (videoRef.current) {
      videoRef.current.volume = newVolume
      if (newVolume === 0) {
        videoRef.current.muted = true
        setIsMuted(true)
      } else if (isMuted) {
        videoRef.current.muted = false
        setIsMuted(false)
      }
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      containerRef.current.requestFullscreen()
    }
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleShowControls = () => {
    setIsControlsVisible(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setIsControlsVisible(false)
      }
    }, 3000)
  }

  const hideControls = () => {
    if (isPlaying) {
      setIsControlsVisible(false)
    }
  }

  const downloadVideo = () => {
    const a = document.createElement("a")
    a.href = src
    a.download = title ? `${title.replace(/\s+/g, "-").toLowerCase()}.mp4` : "video.mp4"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video bg-black rounded-xl overflow-hidden shadow-xl ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
      onMouseEnter={handleShowControls}
      onMouseMove={handleShowControls}
      onMouseLeave={hideControls}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-white text-center p-4">
            <p className="text-red-500 mb-2">{error}</p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={() => {
                setError(null)
                if (videoRef.current) {
                  videoRef.current.load()
                }
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-full rounded-xl cursor-pointer"
        autoPlay={autoPlay}
        muted={autoPlay || isMuted}
        loop={loop}
        playsInline
        poster={poster}
        onClick={togglePlay}
        preload="auto"
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace(".mp4", ".webm")} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Large Center Play Button (visible when paused or on hover) */}
      {(!isPlaying || isControlsVisible) && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          onClick={togglePlay}
        >
          <div className="bg-black/50 hover:bg-green-600 rounded-full p-4 cursor-pointer transition-all duration-300">
            {isPlaying ? <Pause className="h-10 w-10 text-white" /> : <Play className="h-10 w-10 text-white" />}
          </div>
        </div>
      )}

      {/* Video Controls (visible on hover or when paused) */}
      {showControls && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-10 pb-2 transition-opacity duration-300 ${
            isControlsVisible || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Progress Bar */}
          <div
            ref={progressRef}
            className="w-full h-1 bg-gray-500/50 rounded-full mb-3 cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div
              className="absolute top-0 left-0 h-full bg-green-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className="absolute top-1/2 transform -translate-y-1/2 h-3 w-3 bg-green-600 rounded-full"
              style={{ left: `${progress}%` }}
            ></div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>

              {/* Restart Button */}
              <button
                onClick={restartVideo}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Restart video"
              >
                <SkipBack className="h-5 w-5" />
              </button>

              {/* Volume Control */}
              <div className="flex items-center gap-2 group relative">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>

                {/* Volume Slider (appears on hover) */}
                <div className="hidden group-hover:block absolute bottom-8 left-0 bg-black/80 p-2 rounded-md">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 accent-green-600"
                  />
                </div>
              </div>

              {/* Time Display */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* Download Button */}
              <button
                onClick={downloadVideo}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Download video"
              >
                <Download className="h-5 w-5" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Toggle fullscreen"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
