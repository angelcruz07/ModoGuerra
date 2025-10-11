import prisma from "@lib/prisma";
import { ImageUpload } from "@utils/image-upload";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const deletePostImage = defineAction({
  input: z.object({
    postId: z.string(),
  }),
  handler: async ({ postId }, { locals }) => {
    const user = locals.user;

    if (!user) {
      throw new Error("Unauthorized");
    }

    try {
      // 1. Find the Post to get the image URL
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        throw new Error(`Post with ID ${postId} not found.`);
      }

      // 2. Delete the image from the external storage
      // This is crucial to do before deleting the record
      // from the database, in case the external deletion fails.
      if (post.image && post.image.includes("http")) {
        await ImageUpload.delete(post.image);
      }

      // 3. Update the Post to remove the image URL
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          image: null,
        },
      });

      return {
        ok: true,
        message: `Image for post ${postId} deleted successfully.`,
      };
    } catch (e) {
      console.error(e);
      throw new Error("Failed to delete the post image.");
    }
  },
});
