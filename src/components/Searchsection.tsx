"use client";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const [activeTab, setActiveTab] = useState<"flight" | "hotel" | "both">("flight");
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setTimeout(() => {
      alert(`✓ Great! We found amazing ${activeTab} deals for you!`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="gradient-bg min-h-screen py-100 ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Find Your Perfect Trip
          </h1>
          <p className="text-gray-600 text-lg">
            Search flights and hotels at the best prices
          </p>
        </div>

        {/* Main Search Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("flight")}
              className={`flex-1 py-7 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
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
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="roundtrip"
                    checked={tripType === "roundtrip"}
                    onChange={() => setTripType("roundtrip")}
                  />
                  <span className="font-medium">Round Trip</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
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
                  className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="To"
                  className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <input
                  type="date"
                  value={returnDate}
                  disabled={tripType === "oneway"}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className={`p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none ${
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
                className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="date"
                className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="date"
                className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <select className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
          )}

          {/* Combined Form */}
          {activeTab === "both" && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="font-semibold text-blue-800 mb-2">Flight Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input type="text" placeholder="From" className="p-3 border rounded-lg" />
                  <input type="text" placeholder="To" className="p-3 border rounded-lg" />
                  <input type="date" className="p-3 border rounded-lg" />
                  <input type="date" className="p-3 border rounded-lg" />
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <h3 className="font-semibold text-green-800 mb-2">Hotel Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="text" placeholder="Hotel destination" className="p-3 border rounded-lg" />
                  <select className="p-3 border rounded-lg">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                  </select>
                  <select className="p-3 border rounded-lg">
                    <option>1 Room</option>
                    <option>2 Rooms</option>
                  </select>
                </div>
              </div>
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
