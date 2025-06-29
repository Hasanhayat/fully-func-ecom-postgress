import React from 'react';

const Home = () => {
  return (
    <main className="bg-[#260c1a] min-h-screen text-[#edbfc6]">
      <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Discover Your <span className="text-[#af8d86]">Style</span><br />
            with BuyTech
          </h1>
          <p className="text-[#ffffffb3] mb-6">
            Browse thousands of fashion pieces that match your vibe.
          </p>
          <button className="bg-[#af8d86] hover:bg-[#edbfc6] text-[#260c1a] font-medium py-2 px-6 rounded-md transition">
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
            alt="Fashion Model"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
