
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  title?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800">
      <div className="flex justify-center">
        <div className="flex space-x-8 px-6 py-3">
          <Link 
            to="/"
            className={`flex flex-col items-center space-y-1 ${
              currentPath === "/" ? "text-white" : "text-gray-400"
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              🏠
            </div>
            <span className="text-xs">Home</span>
          </Link>
          
          <Link 
            to="/discover"
            className={`flex flex-col items-center space-y-1 ${
              currentPath === "/discover" ? "text-white" : "text-gray-400"
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              🔍
            </div>
            <span className="text-xs">Discover</span>
          </Link>
          
          <div className="flex flex-col items-center space-y-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              📺
            </div>
            <span className="text-xs">Footer</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
