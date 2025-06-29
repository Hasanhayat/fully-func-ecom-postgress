import React from 'react';
import { ShoppingCart, User } from 'lucide-react';

const Nav = () => {
  return (
    <header className="bg-[#260c1a] text-[#edbfc6] shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-semibold tracking-wide">BuyTech</div>

        {/* Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li className="hover:text-[#af8d86] cursor-pointer">Home</li>
          <li className="hover:text-[#af8d86] cursor-pointer">Shop</li>
          <li className="hover:text-[#af8d86] cursor-pointer">Contact</li>
          <li className="hover:text-[#af8d86] cursor-pointer">About</li>
        </ul>

        {/* Icons */}
        <div className="flex gap-4 items-center">
          <User className="w-5 h-5 hover:text-[#af8d86] cursor-pointer" />
          <ShoppingCart className="w-5 h-5 hover:text-[#af8d86] cursor-pointer" />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
