import React, { useState } from 'react';
import axios from 'axios';

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/create-products', formData, {
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
      });
      console.log('Product created:', response.data);
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle error response from server
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
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
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
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
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Image URL:</label>
          <input
            type="file"
            name="image"
            value={formData.image}
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
            value={formData.rating}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
