import Key from "../models/keyModels.js";

export async function getRandomKey() {
  try {
    const keys = await Key.find();
    if (keys.length < 1) {
      throw new Error("No keys found");
    } else {
      return keys[Math.floor(Math.random() * keys.length)];
    }
  } catch (error) {
    console.error("Error fetching random key:", error);
    return null;
  }
}
export async function isKeyDatabase() {
  try {
    const keyExists = await Key.exists({ key: key });
    if (keyExists) {
      return true;
    } else {
      throw new Error("invalid key");
    }
  } catch (error) {
    console.error("Error checking key existence:", error);
    return false;
  }
}
