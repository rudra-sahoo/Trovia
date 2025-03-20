import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 bg-[#3b1c4d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Trovia</h3>
            <p className="text-gray-300">
              The smart listing platform designed for college students to effortlessly buy, sell, and connect.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-600 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Trovia. All rights reserved.</p>
          <p className="mt-2">Designed by Rudra</p>
        </div>
      </div>
    </footer>
  );
};
