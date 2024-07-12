const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: Number,
    count: Number,
  },
  user: { 
    type: Schema.Types.ObjectId,
    ref: "user", 
    required: true 
  },
});

const ProductModel = model("products", productSchema);

module.exports = ProductModel;
