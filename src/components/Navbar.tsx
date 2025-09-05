"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 handle nav click (Flights & Hotels)
  const handleNavClick = (item: string) => {
    if (item === "Flights" || item === "Hotels") {
      // 👉 Tell SearchSection to update tab
      window.dispatchEvent(
        new CustomEvent("setSearchTab", {
          detail: item.toLowerCase() === "flights" ? "flight" : "hotel",
        })
      );

      // 👉 Smooth scroll to search section
      document.getElementById("search-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="relative">
      <nav
        className={`fixed w-full left-0 top-0 z-50 transition-all duration-700 ease-in-out ${
          scrolled
            ? "bg-white/40 backdrop-blur-lg shadow-md py-4"
            : "bg-gradient-to-r from-black/70 via-black/50 to-black/70 py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className={`text-2xl font-extrabold flex items-center space-x-2 transition-all duration-500 ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            <span>✈️</span>
            <span>TravelEase</span>
          </Link>

          {/* Middle: Menu */}
          <div className="hidden md:flex space-x-8">
            {["Flights", "Hotels", "Packages", "Deals", "Support"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`relative font-medium transition-all duration-300 group ${
                    scrolled ? "text-white" : "text-white"
                  }`}
                  style={{
                    textShadow: "0 0 8px rgba(3, 23, 245, 0.7)", // glow effect
                  }}
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              )
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-5 py-2 rounded-full text-sm font-semibold bg-white text-black hover:bg-gray-200 hover:scale-105 transition-transform duration-300 shadow-md">
              Login
            </button>
            <button className="px-5 py-2 rounded-full text-sm font-semibold border border-white text-white hover:bg-white hover:text-black hover:scale-105 transition-transform duration-300 shadow-md">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Curved separator for style */}
      {!scrolled && (
        <div className="absolute top-[72px] w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-8"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M321.39,56.29c58-18.18,123.72-30.87,197.44-35.72,82.39-5.49,168.53,1.51,255.19,20.45,96.74,20.89,181.87,52.76,268.27,84.11V0H0V27.35A600.21,600.21,0,0,1,321.39,56.29Z"
              opacity=".25"
              className="fill-white"
            ></path>
          </svg>
        </div>
      )}
    </header>
  );
}
