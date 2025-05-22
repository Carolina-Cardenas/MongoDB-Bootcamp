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
export async function getUser(user) {
  try {
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}
