const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: "String",
      required: true,
      unique: true,
    },
    email: {
      type: "String"
    },
    password: {
      type: "String",
      required: true,
    },
    role: {
      type: "String",
      enum: ["admin", "user"],
      default: "user",
    },
    tokens: [
        {
         type: "String" 
        }
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
