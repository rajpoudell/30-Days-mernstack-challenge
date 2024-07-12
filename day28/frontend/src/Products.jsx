import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchComponent from "./navbar/SearchComponent";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/products"); 
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <section className="text-gray-600 body-font w-[90%] mx-auto ">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6">
            Search Products
          </h1>
          <SearchComponent onSearch={(query) => setSearchQuery(query)} />
        </div>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap m-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <Link
                  to={`/products/${product._id}`}
                  className="block relative h-48 rounded overflow-hidden"
                >
                  <img
                    alt="product"
                    className="object-fill hover:scale-105 h-full block aspect-square transition ease-in delay-150"
                    src={product.image}
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 pointer">
                    {product.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.title.split(" ").slice(0, 3).join(" ")}
                  </h2>
                  <p className="mt-1">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
