import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <div className="justify-center flex align-middle p-8 gap-36">
        <div>
          <Link className="text-red-800 hover:text-red-600" to=".">
            Profile
          </Link>
        </div>
        <div>
          <Link className="text-red-800 hover:text-red-600" to="addproduct">
            Add a Product
          </Link>
        </div>
        <div>
          <Link className="text-red-800 hover:text-red-600" to="viewproduct">
            View Your Product
          </Link>
        </div>
        <div>
          <Link className="text-red-800 hover:text-red-600" to="vieworder">
            View Order
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AdminDashboard;
