import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User's full name

    email: { type: String, unique: true, required: true }, // User's email
    password: { type: String, required: true }, // Hashed password
    type: {
      type: String,
      enum: ["frontend", "backend", "fullstack"], // Intern's role type
      required: true,
    },
    lastLogin: { type: Date, default: null }, // Optional field for tracking last login
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema, "userData");
export default User;
