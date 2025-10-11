import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import prisma from "@lib/prisma";

export const getTags = defineAction({
  input: z.object({}),
  handler: async () => {
    try {
      // Obtener todos los tags únicos de los posts
      const posts = await prisma.post.findMany({
        where: { deletedAt: null },
        select: { tags: true },
      });

      const allTags = posts.flatMap((post) => post.tags);
      const uniqueTags = [...new Set(allTags)].sort();

      return uniqueTags;
    } catch (e) {
      console.error("Error fetching tags:", e);
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error fetching tags",
      });
    }
  },
});

