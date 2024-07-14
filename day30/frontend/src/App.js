import React, { lazy } from "react";
import "./index.css";
// import { Form } from "./Form";

import { Route, Routes } from "react-router-dom";
import { Navbar } from "./navbar/navbar";

const Profile = React.lazy(() => import("./admin/Profile"));
const AdminDashboard = React.lazy(() => import("./admin/AdminDashboard"));
const CreateProductForm = React.lazy(() => import("./admin/CreateProductForm"));
const Orders = React.lazy(() => import("./admin/Orders"));
const ViewProduct = React.lazy(() => import("./admin/ViewProduct"));

const Nomatch = React.lazy(() => import("./Nomatch"));
const Login = React.lazy(() => import("./Login"));
const Form = React.lazy(() => import("./Form"));
const HomePage = React.lazy(() => import("./Home"));
const SingleProduct = React.lazy(() => import("./SingleProduct"));
const Products = React.lazy(() => import("./Products"));
function App() {
  return (

    <div className="">
      
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* Nested routes under the Navbar */}
          <Route index element={<HomePage />} />   
          <Route path="/products" loading={lazy()} element={<Products />} /> 
            
          <Route path="/register" element={<Form />} />   
          <Route path="/login" element={<Login />} />   
          <Route path="/profile" element={<AdminDashboard />}>
              <Route index element={<Profile />} />
              <Route path="addproduct" element={<CreateProductForm />} />
              <Route path="viewproduct" element={<ViewProduct />} />
              <Route path="vieworder" element={<Orders />} />
            </Route>  
          <Route path="/products/:pid" element={<SingleProduct />} />   
          <Route path="*" element={<Nomatch />} />   
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
