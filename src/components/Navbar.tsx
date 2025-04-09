
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary flex items-center justify-center text-white font-bold">
            SQ
          </div>
          <span className="text-xl font-bold gradient-text">SmartQueue</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-smartqueue-primary transition-colors">Home</Link>
          <Link to="/businesses" className="text-gray-700 hover:text-smartqueue-primary transition-colors">Businesses</Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-smartqueue-primary transition-colors">How It Works</Link>
          <Link to="/contact" className="text-gray-700 hover:text-smartqueue-primary transition-colors">Contact</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" className="border-smartqueue-primary text-smartqueue-primary hover:bg-smartqueue-light">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary hover:opacity-90">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-3 bg-white border-t animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 py-2 hover:text-smartqueue-primary">Home</Link>
            <Link to="/businesses" className="text-gray-700 py-2 hover:text-smartqueue-primary">Businesses</Link>
            <Link to="/how-it-works" className="text-gray-700 py-2 hover:text-smartqueue-primary">How It Works</Link>
            <Link to="/contact" className="text-gray-700 py-2 hover:text-smartqueue-primary">Contact</Link>
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full border-smartqueue-primary text-smartqueue-primary">Sign In</Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-smartqueue-primary to-smartqueue-secondary">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
