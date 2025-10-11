import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import prisma from "@lib/prisma";

export const getLikesByPostId = defineAction({
  input: z.object({
    postId: z.string(),
  }),
  handler: async ({ postId }, { locals }) => {
    const userId = locals.user?.id;

    try {
      const likes = await prisma.like.findMany({
        where: { postId },
      });

      let userLiked = false;

      if (userId) {
        const existingLike = await prisma.like.findFirst({
          where: {
            postId,
            userId,
          },
        });
        userLiked = !!existingLike;
      }

      return { count: likes.length, userLiked };
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message:
          "Error fetching likes for post." +
          (e instanceof Error ? e.message : String(e)),
      });
    }
  },
});
