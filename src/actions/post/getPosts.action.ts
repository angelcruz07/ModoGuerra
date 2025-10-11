import { ActionError, defineAction } from "astro:actions";
import prisma from "@lib/prisma";

export const getPosts = defineAction({
  handler: async () => {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: true,
          categories: true,
          comments: true,
        },
      });
      return posts;
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message:
          "Error fetching posts" + (e instanceof Error ? e.message : String(e)),
      });
    }
  },
});
