import prisma from "@/lib/prisma";
import { z } from "astro:schema";
import { ActionError, defineAction } from "astro:actions";

export const createUpdateLikeByPost = defineAction({
  input: z.object({
    postId: z.string(),
  }),
  handler: async ({ postId }, { locals }) => {
    const userId = locals.user?.id;
    if (!userId) {
      throw new ActionError({
        code: "UNAUTHORIZED",
        message: "User must be authenticated to like a post.",
      });
    }

    try {
      // 2. Buscar si el "like" ya existe para este usuario y post.
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      if (existingLike) {
        // 3. Si el "like" existe, se elimina (acción: "unlike").
        await prisma.like.delete({
          where: {
            userId_postId: {
              userId,
              postId,
            },
          },
        });
        return { success: true, action: "unliked", postId };
      } else {
        // 4. Si el "like" no existe, se crea un nuevo registro (acción: "like").
        await prisma.like.create({
          data: {
            userId,
            postId,
          },
        });

        return { success: true, action: "liked", postId };
      }
    } catch (e) {
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Error processing like action`,
      });
    }
  },
});
