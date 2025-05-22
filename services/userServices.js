import user from "../models/user.js";

export async function registerUser(userData) {
  try {
    const result = await user.create(userData);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

export async function getUser(username) {
  try {
    const result = await user.findOne({ username: username });
    if (result) return result;
    else throw new Error("User not found");
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
