// Home.jsx
"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { motion, useScroll, useTransform } from "framer-motion"
import PerfumeScene from "./components/PerfumeScene"
import ScrollContent from "./components/ScrollContent"
import Navbar from "./components/Navbar"
import SplashCursor from "../Reactbite/SplashCursor/SplashCursor" // adjust path if needed

export default function Home() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Animate background gradient as user scrolls
  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [
      "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      "linear-gradient(135deg, #16213e 0%, #0f3460 50%, #533483 100%)",
      "linear-gradient(135deg, #533483 0%, #7209b7 50%, #a663cc 100%)",
      "linear-gradient(135deg, #a663cc 0%, #f093fb 50%, #f5f7fa 100%)",
    ]
  )

  return (
    <div ref={containerRef} className="relative" id="home">
      {/* Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ background: backgroundGradient }}
      />

      {/* Navbar */}
      <Navbar scrollProgress={scrollYProgress} />

      {/* Custom Cursor */}
      <SplashCursor />

      {/* 3D Perfume Scene */}
      <div className="fixed inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <PerfumeScene scrollProgress={scrollYProgress} />
        </Canvas>
      </div>

      {/* Page Scroll Content */}
      <div className="relative z-20">
        <ScrollContent scrollProgress={scrollYProgress} />
      </div>
    </div>
  )
}
