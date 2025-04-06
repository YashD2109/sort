import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard as DashboardIcon, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar, showMenuButton = false }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showMenuButton && (
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-secondary hover:text-primary rounded-md transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          )}
          <DashboardIcon size={32} />
          <span className="text-2xl font-bold">MedConnect</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <Link to="/about-us" className="hover:text-secondary">About Us</Link>
          {/* Removed login and logout links */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;