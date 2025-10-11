import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import prisma from "@lib/prisma";

export const getPostBySlug = defineAction({
  input: z.object({
    slug: z.string().min(5),
  }),
  handler: async ({ slug }) => {
    try {
      const post = await prisma.post.findUnique({
        where: { slug },
        include: {
          author: true,
          categories: true,
          comments: true,
        },
      });

      return post;
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message:
          "Error fetching post by slug" +
          (e instanceof Error ? e.message : String(e)),
      });
    }
  },
});
