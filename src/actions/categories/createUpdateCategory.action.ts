import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import prisma from "@lib/prisma";

export const createUpdateCategory = defineAction({
  accept: "form",
  input: z.object({
    id: z.string().optional(),
    name: z.string().min(3).max(50),
  }),
  handler: async ({ id, name }) => {
    try {
      if (id) {
        const updatedCategory = await prisma.category.update({
          where: { id: id },
          data: {
            name: name,
          },
        });
        return updatedCategory;
      }
      const newCategory = await prisma.category.create({
        data: {
          name: name,
        },
      });
      return newCategory;
    } catch (e) {
      if (id) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message:
            "Error updating category" +
            (e instanceof Error ? e.message : String(e)),
        });
      } else {
        throw new ActionError({
          code: "BAD_REQUEST",
          message:
            "Error creating category" +
            (e instanceof Error ? e.message : String(e)),
        });
      }
    }
  },
});

