import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 9,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
});
