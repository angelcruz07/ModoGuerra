import { createUpdatePost } from "./createUpdatePost.action";
import { deletePost } from "./deletePost.action";
import { deletePostImage } from "./deletePostImage.action";
import { getCategories } from "./getCategories.action";
import { getPostBySlug } from "./getPostBySlug.action";
import { getPosts } from "./getPosts.action";
import { getPostsByPage } from "./getPostsByPage.action";
import { getRecommendedPosts } from "./getRecomendations.action";
import { getTags } from "./getTags.action";

export const post = {
  createUpdatePost,
  deletePost,
  getPostBySlug,
  getPostsByPage,
  getPosts,
  getTags,
  getCategories,
  deletePostImage,
  getRecommendedPosts,
};
