import React from 'react';
import { Link } from 'react-router'; // Fixed router import

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
          <p className="text-[#ffffffcc] text-lg mb-8 max-w-md">
            Embrace the fusion of fashion and tech. Shop the trendiest looks, now just a click away.
          </p>
          <Link to='/shop'>
            <button className="bg-[#e2b4a9] hover:bg-[#f4d7dc] text-[#260c1a] font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Shop Now
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 animate-fade-in">
          <img
            src="https://images.unsplash.com/photo-1513521712264-512ceb91a940?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxzdG9yZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Trendy Fashion Technology"
            className="rounded-[2rem] shadow-2xl w-full h-[500px] object-cover border border-[#f3d7d3]/20 transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
