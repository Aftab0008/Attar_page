"use client"

import { useState, useEffect } from "react"
import { motion, useTransform } from "framer-motion"
import { Menu, X, ShoppingBag, User, Search } from "lucide-react"
import Button from "./ui/Button"

export default function Navbar({ scrollProgress }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navbarOpacity = useTransform(scrollProgress, [0, 0.1], [0.9, 0.95])
  const navbarBlur = useTransform(scrollProgress, [0, 0.1], [10, 20])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: "Home", href: "#home" },
     { name: "Collection", href: "/attars" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-30 px-4 py-4"
        style={{
          backdropFilter: `blur(${navbarBlur.get()}px)`,
        }}
      >
        <motion.div className="max-w-7xl mx-auto" style={{ opacity: navbarOpacity }}>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 shadow-lg">
            <div className="flex items-center justify-between">
              
              {/* Updated Logo */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
              <img
  src="/logo.png"
  alt="Aroma Al-Hayat Logo"
  className="w-10 h-10 object-contain rounded-l-full rounded-r-full"
/>
 <span className="text-white font-light text-xl tracking-wide ml-2">Aroma Al-Hayat</span>

              </motion.div>
               

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-300 font-light tracking-wide"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-4">
                <motion.button
                  className="text-white/80 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="text-white/80 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="text-white/80 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-white/10 relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </motion.button>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-6"
                  >
                    Shop Now
                  </Button>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                onClick={toggleMenu}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-25 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleMenu} />
        <motion.div
          className="absolute top-20 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            y: isMenuOpen ? 0 : -20,
            scale: isMenuOpen ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors duration-300 font-light tracking-wide py-2 px-4 rounded-lg hover:bg-white/10"
                onClick={toggleMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="border-t border-white/20 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="text-white/80 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-white/10">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="text-white/80 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-white/10">
                    <User className="w-5 h-5" />
                  </button>
                  <button className="text-white/80 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-white/10 relative">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      0
                    </span>
                  </button>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                  onClick={toggleMenu}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}