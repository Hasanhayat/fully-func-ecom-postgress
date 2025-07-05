import React from "react";
import {
  ShoppingCart,
  User,
  LogOut,
  Settings2,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import api from "../api";
import { GlobalContext } from "../context/Context";
import { toast } from "react-toastify";

const Nav = () => {
  const navigate = useNavigate();
  const { state, dispatch } = React.useContext(GlobalContext);
  const isAdmin = state.user?.role === 1;
  const [isLoading, setIsLoading] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#260c1a]">
        <Loader2 className="animate-spin text-white" size={48} />
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#260c1aa9] border-b border-[#edbfc622] shadow-md transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-[#edbfc6]">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide drop-shadow-md">
          <Link to="/home" className="hover:text-[#f2dcdc] transition">
            BuyTech
          </Link>
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li>
            <Link
              to="/home"
              className="hover:text-[#f2dcdc] transition-all duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="hover:text-[#f2dcdc] transition-all duration-200"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-[#f2dcdc] transition-all duration-200"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-[#f2dcdc] transition-all duration-200"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex gap-4 items-center">
          <LogOut
            title="Logout"
            className="w-5 h-5 cursor-pointer hover:text-[#f2dcdc] transition"
            onClick={async () => {
              setIsLoading(true);
              try {
                const res = await api.post("/logout");
                dispatch({ type: "USER_LOGOUT" });
                navigate("/login");
                toast.success(res.data.message || "Logged out successfully");
              } catch (err) {
                toast.error(err.response?.data?.error || "Server error");
              } finally {
                setIsLoading(false);
              }
            }}
          />
          <Link to="/profile" title="Profile">
            <User className="w-5 h-5 hover:text-[#f2dcdc] transition" />
          </Link>
          <Link to="/cart" title="Cart">
            <ShoppingCart className="w-5 h-5 hover:text-[#f2dcdc] transition" />
          </Link>
          {isAdmin && (
            <Link to="/admin" title="Admin Dashboard">
              <Settings2 className="w-5 h-5 hover:text-[#f2dcdc] transition" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
