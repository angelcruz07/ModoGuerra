import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import prisma from "@lib/prisma";

export const deleteCategory = defineAction({
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ id }) => {
    try {
      const deletedCategory = await prisma.category.delete({
        where: { id: id },
      });
      return deletedCategory;
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message:
          "Error deleting category" +
          (e instanceof Error ? e.message : String(e)),
      });
    }
  },
});

