"use client";
import Link from "next/link";
import React, { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="bg-gray-800 text-white p-4 sm:p-4 md:flex md:justify-between
    md:items-center"
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="" className="text-2xl font-black">
          Raj
        </a>
        <div className={`${isOpen ? "hidden" : "flex"} flex-col md:flex-row `}>
          <Link href="/" className="mx-2 hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="mx-2 hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="mx-2 hover:text-gray-300">
            Contact
          </Link>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                // SVG for "hamburger" menu icon
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 18L20 18"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M4 12L20 12"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M4 6L20 6"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              ) : (
                // SVG for "close" icon
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 25 25"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  fill="#ffffff"
                >
                  <g transform="translate(-467.000000, -1039.000000)">
                    <path
                      d="M489.396,1061.4 C488.614,1062.18 487.347,1062.18 486.564,1061.4 L479.484,1054.32 L472.404,1061.4 C471.622,1062.18 470.354,1062.18 469.572,1061.4 C468.79,1060.61 468.79,1059.35 469.572,1058.56 L476.652,1051.48 L469.572,1044.4 C468.79,1043.62 468.79,1042.35 469.572,1041.57 C470.354,1040.79 471.622,1040.79 472.404,1041.57 L479.484,1048.65 L486.564,1041.57 C487.347,1040.79 488.614,1040.79 489.396,1041.57 C490.179,1042.35 490.179,1043.62 489.396,1044.4 L482.316,1051.48 L489.396,1058.56 C490.179,1059.35 490.179,1060.61 489.396,1061.4 Z"
                      fill="#ffffff"
                    ></path>
                  </g>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
