import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import prisma from "@lib/prisma";

export const createUpdateComment = defineAction({
  accept: "form",
  input: z.object({
    id: z.string().optional(),
    content: z.string().min(3).max(255),
    postId: z.string(),
    userId: z.string(),
    parentId: z.string().min(3).max(255).optional(),
    replies: z.array(z.string().min(3).max(255)).optional(),
  }),
  handler: async ({ id, content, postId, userId, parentId, replies }) => {
    try {
      if (id) {
        const updatedComment = await prisma.comment.update({
          where: { id: id },
          data: {
            content: content,
            post: { connect: { id: postId } },
            user: { connect: { id: userId } },
            parent: parentId ? { connect: { id: parentId } } : undefined,
            replies: replies
              ? { set: replies.map((reply) => ({ id: reply })) }
              : undefined,
          },
        });

        return updatedComment;
      }

      const newPost = await prisma.comment.create({
        data: {
          content: content,
          post: { connect: { id: postId } },
          user: { connect: { id: userId } },
          parent: parentId ? { connect: { id: parentId } } : undefined,
          replies: replies
            ? { connect: replies.map((reply) => ({ id: reply })) }
            : undefined,
        },
      });

      return newPost;
    } catch (e) {
      if (id) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message:
            "Error to update the comment" +
            (e instanceof Error ? e.message : String(e)),
        });
      } else {
        throw new ActionError({
          code: "BAD_REQUEST",
          message:
            "Error to create the comment" +
            (e instanceof Error ? e.message : String(e)),
        });
      }
    }
  },
});
