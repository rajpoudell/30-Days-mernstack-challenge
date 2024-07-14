import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';

const CreateProductForm = () => {
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    rating: '',
    count: '', 
  });
  const [file, setFile] = useState(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      // Handle file input separately
      setValues((prevData) => ({
        ...prevData,
        [name]: e.target.files[0], // Assuming single file upload
      }));
    } else {
      setValues((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    try {
      const response = await axios.post('http://localhost:4000/create-products',formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
      });
      console.log('Product created:', response.data);
      setMessage("Product created successfully");

      // Clear the form
      setValues({
        title: '',
        price: '',
        description: '',
        category: '',
        rating: '',
        count: '',
      });
      setFile(null);

    } catch (error) {
      console.error('Error creating product:', error);
      setMessage("Error creating product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
      {message && <p className="mb-4 text-center text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} method="POST" ref={formRef} className="space-y-4">
        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Price:</label>
          <input
            type="text"
            name="price"
            value={values.price}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Category:</label>
          <input
            type="text"
            name="category"
            value={values.category}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Image:</label>
          <input
            type="file"
            name="files"
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Rating:</label>
          <input
            type="text"
            name="rating"
            value={values.rating}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Count:</label>
          <input
            type="text"
            name="count"
            value={values.count}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
          Create Product
        </button>
      </form>
      <Outlet />
    </div>
  );
};

export default CreateProductForm;
