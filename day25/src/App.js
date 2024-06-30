import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
// import { Product } from "./components/Product";
// import Service from "./components/Service";
const Product = React.lazy(() => import("./components/Product"));
const Service = React.lazy(() => import("./components/Service"));
function App() {
  return (
    <div className="text-gray-400 bg-gray-900">
      <h1 class="text-4xl font-bold text-gray-100 text-center">Hello lazy loading world</h1>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="service" element={<Service />} />
        </Route>
      </Routes>
      {/* <Product /> */}
    </div>
  );
}

export default App;
