import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
// State to track hamburger menu open/close
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <nav className="font-Mali text-marine-blue">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-semibold px-3">
          <img className="h-auto" src="../lor-logo.svg" alt="LoR logo" />
          </Link>
          <Link to="/about" className="text-xl font-semibold px-3">
            About
          </Link>
          <Link to="/contact" className="text-xl font-semibold px-3">
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          {/* Hamburger button */}
          <button
            className="sm:hidden p-2 text-marine-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {/* Navigation links */}
          <div
            className={`w-full sm:inline-block sm:w-auto 
            ${isOpen ? "block" : "hidden"}
             sm:block`}
          >
            <ul className="flex flex-col items-center space-y-4 font-medium mt-4 sm:flex-row sm:space-x-9 sm:space-y-0 sm:mt-0">
                  <li>
                    <Link to="/login" className="text-xl font-semibold px-3">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-xl font-semibold px-3">
                      Register
                    </Link>
                  </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
