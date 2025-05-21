"use client"
import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import AnimatedTextSection from "./animated-text-section"
import Link from "next/link"
import Image from "next/image"

export default function VideoSection() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <>
      <section ref={sectionRef} className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-6">
              100x Yield: Automated Farming Tech That Solves the Global Food Crisis | High-Income Farming Solution
            </h2>

            <div className="relative">
              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl relative">
                {/* Video thumbnail with play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/thumbnail.png"
                    alt="Video thumbnail"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                  />
                  <div className="absolute inset-0 bg-black/30 z-10"></div>
                  <Link
                    href="/video"
                    className="relative z-20 bg-green-600/90 hover:bg-green-700 text-white rounded-full p-5 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Link
                  href="/video"
                  className="inline-flex items-center text-green-700 hover:text-green-900 font-medium"
                >
                  Watch full video
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Text Section */}
      <AnimatedTextSection />
    </>
  )
}
