"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AnimatedTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements =
      containerRef.current?.querySelectorAll(".animate-on-scroll");
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div
      ref={containerRef}
      className="py-16 bg-gradient-to-br from-green-50 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto space-y-10"
        >
          <motion.div
            variants={item}
            className="animate-on-scroll  overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center ">
              <div className="bg-green-600 p-6 md:p-8 flex items-center justify-center md:w-1/4 rounded-lg">
                <motion.div
                  className="text-6xl md:text-7xl"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  🌾
                </motion.div>
              </div>
              <div className="p-6 md:p-8 md:w-3/4">
                <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-3 ">
                  A Revolution in Farming Starts Here!
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Discover the game-changing, fully automated high-yield farming
                  technology that increases productivity by
                  <span className="inline-block bg-yellow-300 text-green-800 font-bold px-2 py-1 rounded mx-1 transform ">
                    100x
                  </span>
                  — transforming farming into a profitable, modern profession
                  for young men across Asia and beyond.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="animate-on-scroll  overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center ">
              <div className="bg-amber-500 p-6 md:p-8 flex items-center justify-center md:w-1/4 rounded-lg">
                <motion.div
                  className="text-6xl md:text-7xl"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  🚜
                </motion.div>
              </div>
              <div className="p-6 md:p-8 md:w-3/4">
                <h3 className="text-xl md:text-2xl font-bold text-amber-800 mb-3">
                  Traditional Farming Is No Longer Enough
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  With over{" "}
                  <span className="font-semibold text-red-600">
                    733 million
                  </span>{" "}
                  people facing hunger and
                  <span className="font-semibold text-red-600">
                    {" "}
                    2.3 billion
                  </span>{" "}
                  suffering from food insecurity, we introduce a climate-smart
                  solution that empowers farmers and feeds the world.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="animate-on-scroll  overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center ">
              <div className="bg-emerald-500 p-6 md:p-8 flex items-center justify-center md:w-1/4 rounded-lg">
                <motion.div
                  className="text-6xl md:text-7xl"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  🌱
                </motion.div>
              </div>
              <div className="p-6 md:p-8 md:w-3/4">
                <h3 className="text-xl md:text-2xl font-bold text-emerald-800 mb-3">
                  Easier, Faster, More Profitable
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our innovation makes farming easier, faster, and more
                  profitable — helping young farmers stay in their communities
                  while earning more than city jobs.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="animate-on-scroll  overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center ">
              <div className="bg-blue-500 p-6 md:p-8 flex items-center justify-center md:w-1/4 rounded-lg">
                <motion.div
                  className="text-6xl md:text-7xl"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  🌍
                </motion.div>
              </div>
              <div className="p-6 md:p-8 md:w-3/4">
                <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-3">
                  Join The Revolution
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Help us bring this life-changing farming technology to the
                  world!
                </p>
                <div className="mt-4">
                  <a
                    href="#contact"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      // Update URL hash
                      window.location.hash = "contact";

                      // Show only contact section
                      document
                        .querySelectorAll(".section-content")
                        .forEach((section) => {
                          (section as HTMLElement).style.display = "none";
                        });

                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        contactSection.style.display = "block";
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    Get Involved Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
