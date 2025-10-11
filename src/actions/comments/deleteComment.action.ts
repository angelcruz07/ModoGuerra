import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import prisma from "@lib/prisma";

export const deleteComment = defineAction({
  accept: "form",
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ id }) => {
    try {
      const deletedComment = await prisma.comment.delete({
        where: { id: id },
      });
      return deletedComment;
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message:
          "Error to delete the comment" +
          (e instanceof Error ? e.message : String(e)),
      });
    }
  },
});

