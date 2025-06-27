"use client";

import { motion, useTransform } from "framer-motion";
import Button from "./ui/Button";
import { Sparkles, Heart, Star, ShoppingBag } from "lucide-react";

export default function ScrollContent({ scrollProgress }) {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Section id="home" className="h-screen flex flex-col md:flex-row items-center justify-center md:justify-start px-6 md:px-16">
        <motion.div
          className="max-w-md text-white text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-7xl font-extrabold mb-6 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#b71476] via-[#2822dd] to-[#7e427f] animate-glowText"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            آروما الحیات
          </motion.h1>

          <motion.p
            className="text-base md:text-xl mb-8 text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            A fragrance that captures the essence of timeless sophistication
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
            >
              Discover More
            </Button>
          </motion.div>
        </motion.div>
      </Section>

      {/* Features Section */}
      <Section id="collection" className="h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 gap-10">
        <ContentCard
          scrollProgress={scrollProgress}
          triggerRange={[0.2, 0.4]}
          icon={<Sparkles className="w-8 h-8" />}
          title="Premium Ingredients"
          description="Crafted with the finest French botanicals and rare essences from around the world."
          side="right"
        />
        <img
          src="/adobe1.png"
          alt="Premium Ingredients"
          className="w-60 md:w-96 object-contain drop-shadow-[0_0_40px_rgba(255,215,0,0.7)]"
        />
      </Section>

      {/* Craftsmanship Section */}
      <Section id="about" className="h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 gap-10">
        <img
          src="/adobe2.png"
          alt="Artisan Crafted"
          className="w-60 md:w-96 object-contain drop-shadow-[0_0_40px_rgba(255,215,0,0.7)]"
        />
        <ContentCard
          scrollProgress={scrollProgress}
          triggerRange={[0.4, 0.6]}
          icon={<Heart className="w-8 h-8" />}
          title="Artisan Crafted"
          description="Each bottle is meticulously crafted by master perfumers with decades of experience."
          side="left"
        />
      </Section>

      {/* Luxury Section */}
      <Section className="h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 gap-10">
        <ContentCard
          scrollProgress={scrollProgress}
          triggerRange={[0.6, 0.8]}
          icon={<Star className="w-8 h-8" />}
          title="Timeless Luxury"
          description="A signature scent that evolves throughout the day, leaving an unforgettable impression."
          side="right"
        />
        <img
          src="/adobe3.png"
          alt="Timeless Luxury"
          className="w-60 md:w-96 object-contain drop-shadow-[0_0_40px_rgba(255,215,0,0.7)]"
        />
      </Section>

      {/* CTA Section */}
      <Section id="contact" className="h-screen flex items-center justify-center px-6 text-center">
        <motion.div
          className="text-white max-w-2xl"
          style={{
            opacity: useTransform(scrollProgress, [0.8, 0.9], [0, 1]),
            y: useTransform(scrollProgress, [0.8, 0.9], [50, 0]),
          }}
        >
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
            آروما الحیات
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed font-medium text-pink-700">
            Available in limited quantities. Each bottle is numbered and comes with a certificate of authenticity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Now - 399/-
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>

    
  );
}

// Section wrapper component
function Section({ children, className, id }) {
  return (
    <section id={id} className={`relative w-full ${className}`}>
      {children}
    </section>
  );
}

// Reusable animated content card
function ContentCard({ scrollProgress, triggerRange, icon, title, description, side }) {
  const opacity = useTransform(scrollProgress, triggerRange, [0, 1]);
  const x = useTransform(scrollProgress, triggerRange, side === "left" ? [-50, 0] : [50, 0]);

  return (
<motion.div
      className="relative max-w-md text-white p-6 md:p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-xl overflow-hidden"
      style={{ opacity, x }}
    >
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 opacity-30 blur-2xl animate-glow z-[-1]" />
      <div className="text-purple-300 mb-4">{icon}</div>
      <h3 className="text-xl md:text-3xl font-bold mb-4 tracking-wide">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  );
}
