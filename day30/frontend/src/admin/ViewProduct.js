import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    file: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/allproducts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.length === 0) {
          setProducts([]);
        } else {
          setProducts(response.data);
        }
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data.message);
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(true);
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      file: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prevFormData) => ({ ...prevFormData, file: files[0] }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/update/${currentProduct._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedProduct = response.data.updatedProduct;
      
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
      console.log(updatedProduct);

      setEditingProduct(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCloseModal = () => {
    setEditingProduct(false); // Close the modal
    setCurrentProduct(null); // Clear the current product
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Products</h1>
      {editingProduct && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="modal-content bg-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Edit Product</h2>

            <form onSubmit={handleUpdate}>
              <label className="block mb-2">
                Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </label>
              <label className="block mb-2">
                Description:
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </label>
              <label className="block mb-2">
                Price:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </label>
              <label className="block mb-2">
                Category:
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </label>
              <label className="block mb-4">
                File:
                <input
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <h1>No products added</h1>
        ) : (
          products.map((product) => (
            <li
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative">
                <img
                  src={`http://localhost:4000/${product.files.path}`}
                  alt={product.files.filename}
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-gray-500 text-xs tracking-widest mb-1">
                  {product.category}
                </h3>
                <h2 className="text-gray-900 text-lg font-medium mb-2">
                  {product.title}
                </h2>
                <p className="text-gray-700 mb-2">${product.price.toFixed(2)}</p>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => handleEdit(product)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ViewProduct;
