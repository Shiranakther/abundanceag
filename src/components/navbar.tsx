"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Video } from 'lucide-react'
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Handle initial hash in URL
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      setActiveSection(hash)
      showOnlySection(hash)
    } else {
      showOnlySection("home")
    }

    window.addEventListener("scroll", handleScroll)

    // Listen for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        setActiveSection(hash)
        showOnlySection(hash)
      }
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const showOnlySection = (sectionId: string) => {
    // Hide all sections
    document.querySelectorAll(".section-content").forEach((section) => {
      ;(section as HTMLElement).style.display = "none"
    })

    // Show only the selected section
    const selectedSection = document.getElementById(sectionId)
    if (selectedSection) {
      selectedSection.style.display = "block"
    }
  }

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    setActiveSection(sectionId)

    // Update URL hash
    window.location.hash = sectionId

    // Show only the selected section
    showOnlySection(sectionId)

    // Scroll to top of the section
    const headerHeight = 80 // Approximate height of the header
    const sectionElement = document.getElementById(sectionId)
    if (sectionElement) {
      const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY - headerHeight
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-3" : "bg-[#144C1B] py-5"
      }`}
    >
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center">
          <Link
            href="/#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("home")
            }}
            className={`flex items-center gap-2 group`}
          >
            {/* Replace with the new logo */}
            <Image
              src="/images/Logo-1.png"
              alt="Abundance AG Logo"
              width={65}
              height={65}
              className="transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavButton
              label="Home"
              sectionId="home"
              onClick={scrollToSection}
              isScrolled={isScrolled}
              isActive={activeSection === "home"}
            />
            <NavButton
              label="About Us"
              sectionId="about"
              onClick={scrollToSection}
              isScrolled={isScrolled}
              isActive={activeSection === "about"}
            />
            <NavButton
              label="Products"
              sectionId="products"
              onClick={scrollToSection}
              isScrolled={isScrolled}
              isActive={activeSection === "products"}
            />
            <NavButton
              label="Contact"
              sectionId="contact"
              onClick={scrollToSection}
              isScrolled={isScrolled}
              isActive={activeSection === "contact"}
            />
            <Link
              href="/video"
              className={`relative px-4 py-2 font-medium rounded-full transition-all duration-300 flex items-center ${
                isScrolled
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              }`}
            >
              <Video className="h-4 w-4 mr-2" />
              Watch Video
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-full ${
              isScrolled ? "bg-green-100 text-green-700" : "bg-white/20 text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg mt-2 rounded-b-2xl border-t border-green-100 overflow-hidden">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <MobileNavButton
              label="Home"
              sectionId="home"
              onClick={scrollToSection}
              isActive={activeSection === "home"}
            />
            <MobileNavButton
              label="About Us"
              sectionId="about"
              onClick={scrollToSection}
              isActive={activeSection === "about"}
            />
            <MobileNavButton
              label="Products"
              sectionId="products"
              onClick={scrollToSection}
              isActive={activeSection === "products"}
            />
            <MobileNavButton
              label="Contact"
              sectionId="contact"
              onClick={scrollToSection}
              isActive={activeSection === "contact"}
            />
            <Link
              href="/video"
              className="text-gray-700 font-medium py-3 px-4 rounded-lg text-left transition-all duration-200 hover:text-green-600 hover:bg-green-50 flex items-center"
            >
              <Video className="h-4 w-4 mr-2" />
              Watch Video
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavButton({
  label,
  sectionId,
  onClick,
  isScrolled,
  isActive,
  isLast = false,
}: {
  label: string
  sectionId: string
  onClick: (id: string) => void
  isScrolled: boolean
  isActive: boolean
  isLast?: boolean
}) {
  return (
    <button
      onClick={() => onClick(sectionId)}
      className={`relative px-4 py-2 font-medium rounded-full transition-all duration-300 ${
        isActive
          ? isScrolled
            ? "bg-green-600 text-white"
            : "bg-white/30 text-white"
          : isLast
            ? isScrolled
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            : isScrolled
              ? "text-gray-700 hover:text-green-600"
              : "text-white hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  )
}

function MobileNavButton({
  label,
  sectionId,
  onClick,
  isActive,
}: {
  label: string
  sectionId: string
  onClick: (id: string) => void
  isActive: boolean
}) {
  return (
    <button
      onClick={() => onClick(sectionId)}
      className={`text-gray-700 font-medium py-3 px-4 rounded-lg text-left transition-all duration-200 ${
        isActive ? "bg-green-100 text-green-700" : "hover:text-green-600 hover:bg-green-50"
      }`}
    >
      {label}
    </button>
  )
}
