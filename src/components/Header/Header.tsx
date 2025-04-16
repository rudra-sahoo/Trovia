import React, { useState } from 'react';
import { Search, Menu, X, LogOut } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
    setIsSidebarOpen(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex-shrink-0 ml-4">
              <Link to="/">
                <img
                  src="/rectangle-8968.png"
                  alt="Trovia Logo"
                  className="h-8 w-auto sm:h-10"
                />
              </Link>
            </div>

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
          </div>
        </div>
      </header>

      <div className={`fixed inset-y-0 left-0 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-4">
            <Link to="/" className="block py-2 text-gray-600 hover:text-gray-900" onClick={closeSidebar}>
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/account" className="block py-2 text-gray-600 hover:text-gray-900" onClick={closeSidebar}>
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 py-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="block py-2 text-gray-600 hover:text-gray-900"
                onClick={closeSidebar}
              >
                Sign In
              </Link>
            )}
            
            <div className="border-t border-gray-200 my-4"></div>
            
            <Link to="/contact" className="block py-2 text-gray-600 hover:text-gray-900" onClick={closeSidebar}>
              Contact Us
            </Link>
            
            <Link to="/help" className="block py-2 text-gray-600 hover:text-gray-900" onClick={closeSidebar}>
              Help Center
            </Link>
            
            <div className="border-t border-gray-200 my-4"></div>
            <h3 className="font-medium text-gray-900">Legal</h3>
            
            <Link to="/privacy" className="block py-2 text-gray-600 hover:text-gray-900" onClick={closeSidebar}>
              Privacy Policy
            </Link>
            
            <Link to="/terms" className="block py-2 text-gray-600 hover:text-gray-900" onClick={closeSidebar}>
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};