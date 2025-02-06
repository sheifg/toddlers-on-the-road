import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { BsFillTelephoneFill } from "react-icons/bs";const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen bg-beige bg-opacity-50">
      <Header />
      <main className="flex-1 max-auto">{children}</main>
      <footer className="bg-beige bg-opacity-100 text-marine-blue font-Mali">
        <div className="container mx-auto grid grid-cols-1  gap-5 p-3.5">
          <div className=" grid grid-cols-1 text-s gap-1">
            <div className=" text-l font-semibold underline underline-offset-8 py-2">
              <p>CONTACT</p>
            </div>
            <div className=" flex items-center justify-start gap-2 text-xs pt-1">
              <span><MdEmail /></span> 
              <p>toddlersontheroad@gmail.com</p>
            </div>
            <div className=" flex items-center justify-start gap-2 text-xs pt-1">
              <span><BsFillTelephoneFill /></span>
              <p className=" text-xs py-2">0178234634</p>
            </div>
            <div className=" flex items-center justify-start gap-2 text-xs pt-0.2">
              <span><ImLocation2 /></span>
              <p className=" text-xs py-2">Königstr 8, 28491 Hanover</p>
            </div>
          </div>
          <div className=" grid grid-cols-1 gap-1 text-s">
            <div>
              <p className=" text-l font-semibold underline underline-offset-8">FOLLOW US</p>
            </div>
            <div className="grid grid-cols-12 gap-x-1 py-4">
               <Link to="/" >
                <FaInstagram />
               </Link>
               <Link to="/" >
                <FaFacebook />
               </Link>
               <Link to="/">
                <IoLogoGithub />
               </Link>
            </div>
          </div>
          <div className=" grid grid-cols-1 gap-1 text-s">
            <div>
               <p className=" text-l font-semibold underline underline-offset-8">PAGES</p>
            </div>
            <div className=" grid grid-cols-1 gap-1 py-3">
               <Link to="/about" className="text-s px-1">
                About
               </Link>
               <Link to="/contact" className="text-s px-1">
                Contact
               </Link>
               <Link to="/register" className="text-s px-1">
                Register
               </Link>
               <Link to="/login" className="text-s px-1">
                Login
               </Link>
            </div>
          </div> 
        </div>
        <div className="flex items-center justify-end px-5 py-3.5 m-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BsArrowUpCircleFill />
        </div>
        <hr className="h-px bg-gray-200 border-0">
        <div className="text-center text-xs space-x-6 py-1">
          <p className=" text-s text-center">
            &copy; 2025 - Toddlers on the Road
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
