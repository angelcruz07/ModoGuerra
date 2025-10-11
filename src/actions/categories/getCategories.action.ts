import { ActionError, defineAction } from "astro:actions";
import prisma from "@lib/prisma";

export const getCategories = defineAction({
  handler: async () => {
    try {
      const categories = await prisma.category.findMany({
        include: {
          posts: true,
        },
      });
      return categories;
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message:
          "Error fetching categories" +
          (e instanceof Error ? e.message : String(e)),
      });
    }
  },
});

