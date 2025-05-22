import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  title?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          {/* Centered Navigation tabs */}
          <div className="absolute left-1/2 -translate-x-1/2 flex space-x-1 bg-secondary rounded-md overflow-hidden shadow-md">
            <Link 
              to="/"
              className={`nav-tab ${currentPath === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link 
              to="/discover"
              className={`nav-tab ${currentPath === "/discover" ? "active" : ""}`}
            >
              Discover
            </Link>
          </div>
          {/* User Menu aligned right */}
          <div className="ml-auto w-8 h-8 rounded-full bg-gold flex items-center justify-center">
            <span className="text-black text-sm font-medium">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
