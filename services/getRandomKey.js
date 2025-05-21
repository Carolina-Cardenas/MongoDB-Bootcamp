import Key from "../models/key";

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
  async function isKeyDatabase() {
    try {
    } catch (error) {
      console.error("Error fetching random key:", error);
      return null;
    }
  }
}
