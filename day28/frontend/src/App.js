import React, { lazy } from "react";
import "./index.css";
// import { Form } from "./Form";

import { Route, Routes } from "react-router-dom";
import { Navbar } from "./navbar/navbar";

const Nomatch = React.lazy(() => import("./Nomatch"));
const Profile = React.lazy(() => import("./admin/Profile"));
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
          <Route path="/profile" element={<Profile/>} />   
          <Route path="/products/:pid" element={<SingleProduct />} />   
          <Route path="*" element={<Nomatch />} />   
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
