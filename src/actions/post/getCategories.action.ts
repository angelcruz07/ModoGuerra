import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import prisma from "@lib/prisma";

export const getCategories = defineAction({
  input: z.object({}),
  handler: async () => {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
      });
      return categories;
    } catch (e) {
      console.error("Error fetching categories:", e);
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error fetching categories",
      });
    }
  },
});

