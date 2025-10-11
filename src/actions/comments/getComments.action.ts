import { ActionError, defineAction } from "astro:actions";
import prisma from "@lib/prisma";

export const getComments = defineAction({
  handler: async () => {
    try {
      const comments = await prisma.comment.findMany({
        include: {
          user: true,
          post: true,
          parent: true,
          replies: true,
        },
      });
      return comments;
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message:
          "Error fetching comments" +
          (e instanceof Error ? e.message : String(e)),
      });
    }
  },
});

