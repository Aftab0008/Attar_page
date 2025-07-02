import { useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Menu, X, ShoppingBag, User, Search } from "lucide-react";
import Button from "../components/ui/Button";

export default function AttarCollection() {
  const { scrollYProgress } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navbarOpacity = useTransform(scrollYProgress, [0, 0.1], [0.9, 0.95]);
  const navbarBlur = useTransform(scrollYProgress, [0, 0.1], [10, 20]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/attars" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const attars = [
    ["Badshah Amour", 300, 600],
    ["White Oudh", 300, 600],
    ["Cool Lex", 300, 720],
    ["White Musk", 360, 600],
    ["Tajamul Musk", 300, 520],
    ["Musk Miski", 260, 800],
    ["Black Oudh", 400, 600],
    ["Brown Oudh", 300, 600],
    ["Mukhallat Rooh", 300, 720],
    ["Oudh Rose", 360, 720],
    ["White Rose", 300, 720],
    ["Extreme Silky Wood", 250, 500],
    ["Black Musk Sultan", 250, 500],
    ["Oudh Hind", 350, 720],
    ["K.G. Perfume", 350, 700],
    ["White Rose Musk", 300, 600],
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-30 px-4 py-4"
        style={{ backdropFilter: `blur(${navbarBlur.get()}px)` }}
      >
        <motion.div
          className="max-w-7xl mx-auto"
          style={{ opacity: navbarOpacity }}
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 shadow-lg">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/logo.png"
                  alt="Aroma Al-Hayat Logo"
                  className="w-10 h-10 object-contain rounded-full"
                />
                <span className="text-white font-light text-xl tracking-wide ml-2">
                  Aroma Al-Hayat
                </span>
              </motion.div>

              {/* Desktop Nav */}
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

              {/* Desktop Icons */}
              <div className="hidden md:flex items-center space-x-4">
                {[Search, User, ShoppingBag].map((Icon, i) => (
                  <motion.button
                    key={i}
                    className="text-white/80 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-white/10 relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-6">
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

            {/* Mobile Dropdown */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 flex flex-col space-y-4 px-4 pb-4"
              >
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white/90 hover:text-yellow-400 font-light tracking-wide transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.nav>

      {/* Main Section */}
      <section className="pt-24 min-h-screen px-4 md:px-16 py-12 bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-10 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
            Attar Collection
          </h2>
          <p className="text-center text-gray-300 mb-8 text-lg">
            Explore our finest attars available in 3ml, 6ml & 12ml sizes.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {attars.map(([name, p3, p6], index) => (
              <div key={index} className="p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl relative overflow-hidden transition-transform transform hover:scale-105">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 opacity-20 blur-2xl animate-glow z-[-1]" />
                <div className="flex justify-center mb-4">
                  <img src="/adobe1.png" alt="Attar Bottle" className="w-40 h-48 object-contain drop-shadow-[0_0_40px_rgba(255,215,0,0.7)] transition-transform duration-300 hover:scale-105" />
                </div>
                <h3 className="text-2xl font-semibold text-yellow-400 mb-2 text-center">{name}</h3>
                <ul className="text-white/90 text-center">
                  <li><span className="font-bold">3ml:</span> ₹{p3}</li>
                  <li><span className="font-bold">6ml:</span> ₹{p6}</li>
                  <li><span className="font-bold">12ml:</span> ₹{p6 * 2}</li>
                </ul>
                <div className="text-center">
                  <a href="https://wa.me/8210981450" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-700 text-white rounded-lg hover:from-pink-700 hover:to-purple-800 transition">
                    Order on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-pink-400 font-semibold">
            Free delivery on orders above ₹500
          </p>
        </div>
      </section>
    </>
  );
}
