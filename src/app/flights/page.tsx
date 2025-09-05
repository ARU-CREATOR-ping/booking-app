"use client";

import { useSearchParams } from "next/navigation";

interface Flight {
  id: number;
  airline: string;
  from: string;
  to: string;
  price: number;
  duration: string;
  departure: string;
  arrival: string;
}

export default function FlightResults() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  // Mock flight data
  const flights: Flight[] = [
    {
      id: 1,
      airline: "IndiGo",
      from: "Delhi",
      to: "Mumbai",
      price: 3500,
      duration: "2h 10m",
      departure: "08:00 AM",
      arrival: "10:10 AM",
    },
    {
      id: 2,
      airline: "Air India",
      from: "Delhi",
      to: "Mumbai",
      price: 4200,
      duration: "2h 20m",
      departure: "11:00 AM",
      arrival: "01:20 PM",
    },
    {
      id: 3,
      airline: "SpiceJet",
      from: "Delhi",
      to: "Mumbai",
      price: 3100,
      duration: "2h",
      departure: "06:00 PM",
      arrival: "08:00 PM",
    },
  ];

  // Filter flights by user search
  const filteredFlights = flights.filter(
    (flight) =>
      flight.from.toLowerCase() === from.toLowerCase() &&
      flight.to.toLowerCase() === to.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Flights from {from} ✈️ {to}
      </h1>

      {filteredFlights.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No flights found. Try another search.
        </p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{flight.airline}</h2>
                <span className="text-lg font-bold text-blue-600">
                  ₹{flight.price}
                </span>
              </div>
              <p className="text-gray-600">
                {flight.departure} → {flight.arrival} ({flight.duration})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
