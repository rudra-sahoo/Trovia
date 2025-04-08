import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";

export const Header: React.FC = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="/rectangle-8968.png"
                alt="Trovia Logo"
                className="h-8 w-auto sm:h-10"
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 sm:mx-6 lg:mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Search for products..."
              />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">{user.email}</span>
                <Button
                  onClick={handleSignOut}
                  className="bg-[#3b1c4d] hover:bg-[#281f2c] text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button
                    variant="outline"
                    className="hidden sm:inline-flex"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button
                    className="bg-[#3b1c4d] hover:bg-[#281f2c] text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};