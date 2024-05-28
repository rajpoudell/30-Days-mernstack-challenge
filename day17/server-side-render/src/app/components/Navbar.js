"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  function getMenuClasses() {
   let menuClasses =[];
    if(isOpen){
      menuClasses = [
        "flex",
        "absolute",
        "top-[60px]",
        "bg-gray-800",
        "w-full",
        "p-10",
        "left-0",
        "gap-10",
        "flex-col"
      ]
    }else{
      menuClasses=["hidden","md:flex"]
      // <div className={`${isOpen ? "hidden" : "flex"} flex-col md:flex-row `}>
    }

    return menuClasses.join(" ");
  }
  
  return (
    <nav className="bg-gray-800 text-white p-4 sm:p-4 md:flex md:justify-between md:items-center">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-black">
          Raj
        </a>
        <div className={getMenuClasses()}>
          <Link href="/" className="mx-2 hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="mx-2 hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="mx-2 hover:text-gray-300">
            Contact
          </Link>
          <Link href="/login" className="mx-2 hover:text-gray-300">
            Login
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              // SVG for "close" icon
              <RxCross1 />
            ) : (
              <GiHamburgerMenu />
            )}
          </button>
        </div>

      </div>
    </nav>
  );
};
