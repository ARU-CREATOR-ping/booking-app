"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Searchsection() {
  const [activeTab, setActiveTab] = useState<"flight" | "hotel" | "both">("flight");
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [loading, setLoading] = useState(false);

  // form state
  const [from, setFrom] = useState("");
  const router = useRouter();

  const [to, setTo] = useState("");
  const [guests, setGuests] = useState("1");

  // Default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const [departureDate, setDepartureDate] = useState(formatDate(tomorrow));
  const [returnDate, setReturnDate] = useState(formatDate(nextWeek));

  const performSearch = () => {
  if (activeTab === "flight") {
    router.push(`/flights?from=${from}&to=${to}`);
  } else if (activeTab === "hotel") {
    router.push(`/hotels?city=${to}`);
  
};


    // send event so results section can catch it
    window.dispatchEvent(
      new CustomEvent("showFlightResults", {
        detail: {
          type: activeTab,
          from,
          to,
          departureDate,
          returnDate,
          tripType,
          guests,
        },
      })
    );

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div id="search-section" className="gradient-bg min-h-screen py-">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.6 }}
            className="text-4xl font-bold text-glass mb-5"
          >
            <h1>Find Your Perfect Trip</h1>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0., duration: 0.8 }}
            viewport={{ once: false, amount: 0.6 }}
          >
            <p className="mt-4 text-2xl md:text-3xl font-semibold 
               bg-gradient-to-r from-blue-300 via-white to-blue-500 
               bg-clip-text text-transparent drop-shadow-lg text-center">
              Search flights and hotels at the best prices !
            </p>
          </motion.p>
        </div>

        {/* Main Search Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-15 max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-xl p-4">
            <button
              onClick={() => setActiveTab("flight")}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "flight"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              ✈️ Flights
            </button>
            <button
              onClick={() => setActiveTab("hotel")}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "hotel"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              🏨 Hotels
            </button>
            <button
              onClick={() => setActiveTab("both")}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "both"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              🌍 Flight + Hotel
            </button>
          </div>

          {/* Flight Form */}
          {activeTab === "flight" && (
            <div>
              {/* Trip type */}
              <div className="flex gap-4 mb-6">
                <label className="flex items-center gap-2 cursor-pointer text-gray-800">
                  <input
                    type="radio"
                    name="tripType"
                    value="roundtrip"
                    checked={tripType === "roundtrip"}
                    onChange={() => setTripType("roundtrip")}
                  />
                  <span className="font-medium">Round Trip</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-gray-800">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneway"
                    checked={tripType === "oneway"}
                    onChange={() => setTripType("oneway")}
                  />
                  <span className="font-medium">One Way</span>
                </label>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 placeholder-gray-500"
                />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 placeholder-gray-500"
                />
                <input
                  type="date"
                  value={returnDate}
                  disabled={tripType === "oneway"}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className={`p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 placeholder-gray-500 ${
                    tripType === "oneway" ? "opacity-50" : ""
                  }`}
                />
              </div>
            </div>
          )}

          {/* Hotel Form */}
          {activeTab === "hotel" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <input
                type="text"
                placeholder="Destination"
                className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 placeholder-gray-500"
              />
              <input
                type="date"
                className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 placeholder-gray-500"
              />
              <input
                type="date"
                className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 placeholder-gray-500"
              />
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
              >
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
          )}

          {/* Search Button */}
          <div className="text-center mt-6">
            <button
              onClick={performSearch}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              ) : (
                "Search Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
