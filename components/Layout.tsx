import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useApp } from "../store";
import { UserRole } from "../script";
import {
  Menu,
  X,
  Trophy,
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  Menu as MenuIcon,
} from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useApp();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export const Navbar = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getDashboardLink = () => {
    if (currentUser?.role === UserRole.ADMIN) return "/dashboard/admin";
    if (currentUser?.role === UserRole.CREATOR) return "/dashboard/creator";
    return "/dashboard/user";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            {/* Logo Design */}
            <div className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-primary-600 to-purple-500 p-2 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                ARENA
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive
                      ? "text-primary-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary-500"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/all-contests"
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive
                      ? "text-primary-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary-500"
                  }`
                }
              >
                Contests
              </NavLink>
              <NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive
                      ? "text-primary-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary-500"
                  }`
                }
              >
                Leaderboard
              </NavLink>
            </div>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
            <ThemeToggle />

            {currentUser ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 focus:outline-none group"
                >
                  <div className="text-right hidden lg:block">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Welcome,
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition">
                      {currentUser.name}
                    </p>
                  </div>
                  <img
                    src={currentUser.photoUrl}
                    alt="User"
                    className="h-10 w-10 rounded-full object-cover border-2 border-transparent group-hover:border-primary-500 transition"
                  />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-900 dark:text-white font-bold">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    <Link
                      to={getDashboardLink()}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <LayoutDashboard className="inline-block w-4 h-4 mr-2" />{" "}
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 font-semibold text-sm"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 transition duration-300"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 p-2 text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <NavLink
              to="/"
              className="block px-3 py-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/all-contests"
              className="block px-3 py-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              All Contests
            </NavLink>
            <NavLink
              to="/leaderboard"
              className="block px-3 py-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </NavLink>

            {currentUser ? (
              <>
                <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                <Link
                  to={getDashboardLink()}
                  className="block px-3 py-3 rounded-lg text-base font-semibold text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 rounded-lg text-base font-semibold text-red-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-100 dark:border-gray-700 my-4"></div>
                <Link
                  to="/login"
                  className="block w-full text-center py-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 mb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center py-3 rounded-lg text-base font-bold bg-primary-600 text-white shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Arena
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => (
  <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight dark:text-white">
              ARENA
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            The ultimate platform for creators and competitors. Join thousands
            of users showcasing their skills and winning prizes daily.
          </p>
        </div>

        {/* Links 1 */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            Platform
          </h3>
          <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link
                to="/all-contests"
                className="hover:text-primary-600 transition"
              >
                Browse Contests
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="hover:text-primary-600 transition"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary-600 transition">
                Winners Showcase
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-600 transition">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Links 2 */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            Support
          </h3>
          <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <a href="#" className="hover:text-primary-600 transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-600 transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-600 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-600 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            Community
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="#"
              className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">
          © 2025 Arena ContestHub Inc. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
          <a
            href="#"
            className="hover:text-gray-900 dark:hover:text-white transition"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-gray-900 dark:hover:text-white transition"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-gray-900 dark:hover:text-white transition"
          >
            Sitemap
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
    <div className="bg-primary-50 dark:bg-gray-800 p-8 rounded-full mb-6 animate-bounce">
      <Trophy className="h-20 w-20 text-primary-500" />
    </div>
    <h1 className="text-6xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
      404
    </h1>
    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6">
      Arena Not Found
    </h2>
    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
      The contest you are looking for might have finished or the URL is
      incorrect.
    </p>
    <Link
      to="/"
      className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold shadow-lg hover:bg-primary-700 hover:shadow-primary-500/40 transition transform hover:-translate-y-1"
    >
      Return to Arena
    </Link>
  </div>
);
