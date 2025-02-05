import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen bg-beige bg-opacity-50">
      <Header />
      <main className="flex-1 max-auto">{children}</main>
      <footer className="bg-beige bg-opacity-100 text-marine-blue font-Mali">
        <div className="container mx-auto flex items-center justify-between p-3.5">
          <div className="flex items-center space-x-6">
            <p className="text-xs text-center md:text-lg">
              &copy; 2025 - Toddlers on the Road
            </p>
          </div>
          <div className="flex items-center space-x-1.5">
            <Link to="/" className="px-1">
              <FaInstagram />
            </Link>
            <Link to="/" className="px-1">
              <FaFacebook />
            </Link>
            <Link to="/" className="px-1">
              <IoLogoGithub />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
