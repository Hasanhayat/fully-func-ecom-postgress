import React from 'react';
import { Link } from 'react-router';

const Home = () => {
  return (
    <main className="bg-gradient-to-b from-[#1a0611] to-[#260c1a] min-h-screen text-[#f4d7dc] font-sans">
      <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left Content */}
        <div className="flex-1 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Discover Your <span className="text-[#e2b4a9]">Style</span><br />
            with <span className="text-[#f9e6e0]">BuyTech</span>
          </h1>
          <p className="text-[#ffffffbb] text-lg mb-8 max-w-lg">
            Explore a curated collection of fashion essentials that define who you are.
          </p>
          <button className="bg-[#e2b4a9] hover:bg-[#f4d7dc] text-[#260c1a] font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <Link to='/shop'>Shop Now</Link>
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 animate-fade-in">
          <img
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
            alt="Fashion Model"
            className="rounded-3xl shadow-2xl w-full h-[500px] object-cover border border-[#af8d86]/20"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
