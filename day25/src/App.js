import React from "react";
import { Product } from "./components/Product";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Service from "./components/Service";

function App() {
  return (
    <div className="text-gray-400 bg-gray-900">
      <h1>Hello world</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Product />} />
            <Route path="service" element={<Service />} />

          </Route>
        </Routes>
      </BrowserRouter>
      <Product />
    </div>
  );
}

export default App;
