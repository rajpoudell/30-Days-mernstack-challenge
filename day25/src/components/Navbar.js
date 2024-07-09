import React, { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product">Products</Link>
          </li>
          <li>
            <Link to="/service">service</Link>
          </li>
        </ul>
      </nav>
      <Suspense
        fallback={
          <h1 className="text-3xl font-bold text-sky-400/100 text-center">
            Loading...          
            </h1>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export default Navbar;
