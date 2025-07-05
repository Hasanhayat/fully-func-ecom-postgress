import React from "react";
import { ShoppingCart, User, LogOut, Settings2, Loader2 } from "lucide-react";
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
    <header className="bg-[#260c1a] text-[#edbfc6] shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-semibold tracking-wide">
          <Link to="/home">BuyTech</Link>
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li className="hover:text-[#af8d86] cursor-pointer">
            <Link to="/home">Home</Link>
          </li>
          <li className="hover:text-[#af8d86] cursor-pointer">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="hover:text-[#af8d86] cursor-pointer">Contact</li>
          <li className="hover:text-[#af8d86] cursor-pointer">About</li>
        </ul>

        {/* Icons */}
        <div className="flex gap-4 items-center">
          <LogOut
            className="w-5 h-5 hover:text-[#af8d86] cursor-pointer"
            onClick={async () => {
              setIsLoading(true);
              try {
                const res = await api.post("/logout");
                dispatch({ type: "USER_LOGOUT" });
                navigate("/login");
                setIsLoading(false);
                toast.success(res.data.message || "Logged out successfully");
              } catch (err) {
                toast.error(err.response?.data?.error || "Server error");
                setIsLoading(false);
                console.error("Logout failed:", err);
              }
            }}
          />
          <User className="w-5 h-5 hover:text-[#af8d86] cursor-pointer" />
          <ShoppingCart className="w-5 h-5 hover:text-[#af8d86] cursor-pointer" />
          {isAdmin && (
            <Link to="/admin">
              <Settings2 className="w-5 h-5 hover:text-[#af8d86] cursor-pointer" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
