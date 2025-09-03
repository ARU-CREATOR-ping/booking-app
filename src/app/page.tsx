"use client";

import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import SearchSection from "../components/Searchsection";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section with background */}
      <section
        className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center pt-125"
        style={{ backgroundImage: "url('/images/navbar-bg.jpg')" }} // 👈 put your image in public/images/hero-bg.jpg
      >
        
        

        
        

        {/* Floating Search Box */}
        <div className="relative z-10 w-full max-w-4xl px-4">
          <SearchSection />
        </div>
      </section>
    </main>
  );
}
