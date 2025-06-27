"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useTransform } from "framer-motion"
import { Environment, PerspectiveCamera, Float, useGLTF } from "@react-three/drei"
import * as THREE from "three"

export default function PerfumeScene({ scrollProgress }) {
  const bottleRef = useRef(null)
  const cameraRef = useRef(null)

  // Scroll-based animations
  const modelX = useTransform(scrollProgress, [0, 0.25, 0.5, 0.75, 1], [0, -3, 0, 3, 0])
  const modelRotationY = useTransform(scrollProgress, [0, 0.25, 0.5, 0.75, 1], [0, Math.PI * 0.3, Math.PI * 0.6, Math.PI * 0.9, Math.PI * 1.2])
  const cameraZ = useTransform(scrollProgress, [0, 0.5, 1], [8, 6, 10])

  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.position.x = modelX.get()
      bottleRef.current.rotation.y = modelRotationY.get()
      bottleRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }

    if (cameraRef.current) {
      cameraRef.current.position.z = cameraZ.get()
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 8]} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7209b7" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#f093fb" />

      <Environment preset="studio" />

      {/* Perfume Model from Sketchfab */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
        <group ref={bottleRef}>
          <PerfumeBottle />
        </group>
      </Float>

      <ParticleField />
    </>
  )
}

// ✅ Replaces old hard-coded bottle with GLTF model
function PerfumeBottle() {
  const { scene } = useGLTF('/modernist_perfume_bottle/scene.gltf')
  return (
    <primitive
      object={scene}
      scale={0.05} // ⬅️ Smaller size
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI, 0]}
    />
  )
}

// Optional preload for performance
useGLTF.preload("/models/perfume/scene.gltf")

// Particle effect (unchanged)
function ParticleField() {
  const particlesRef = useRef(null)

  const particlesGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(200 * 3)
  for (let i = 0; i < 200; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial size={0.02} color="#f093fb" transparent opacity={0.6} />
    </points>
  )
}
