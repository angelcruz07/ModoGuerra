import prisma from "@lib/prisma";
import { ActionError, defineAction } from "astro:actions";

export const getCategories = defineAction({
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
