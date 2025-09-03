import SearchSection from "./Searchsection";

export default function Hero() {
  return (
    <section className="relative h-[75vh] bg-gradient-to-r from-blue-900 to-indigo-800 flex items-center justify-center text-center">
      {/* Hero Content */}
      <div className="z-10 text-white">
        <h1 className="text-5xl font-bold mb-4">Book Your Journey</h1>
        <p className="text-lg">Find the best flights, hotels & packages</p>
      </div>

      {/* Floating Search Section */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4">
        <SearchSection />
      </div>
    </section>
  );
}
