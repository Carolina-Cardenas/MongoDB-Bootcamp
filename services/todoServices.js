import Post from "../models/postModels";

export async function getPosts() {
  try {
    const result = await Post.create(post);
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
}

export async function createPost() {
  try {
    const result = await Post.find();
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
}

export async function getPostByUserId(userId) {
  try {
    const result = await Post.find({ userId: userId });
    if (result.length < 1) throw new Error("No posts found for this user");
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
}

export async function updatePost(postId, newPost) {
  try {
    const result = await Post.findOneAndUpdate({ postId: postId, newPost });
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
}

export async function deletePost(postId) {
  {
    try {
      const result = await Post.findOneAndDelete({ postId: postId });
      return result;
    } catch (error) {
      console.error("Error creating post:", error);
      return null;
    }
  }
}
