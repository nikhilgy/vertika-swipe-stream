
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title = "Vertika" }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gold">{title}</h1>
          </div>
          
          {/* Navigation tabs */}
          <div className="flex space-x-1 bg-secondary rounded-md overflow-hidden">
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
          
          {/* User Menu */}
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
            <span className="text-black text-sm font-medium">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
