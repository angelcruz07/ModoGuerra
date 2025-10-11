import { ActionError, defineAction } from "astro:actions";
import type { Post, User, Category, Comment } from "@prisma/client";
import { z } from "astro:schema";
import prisma from "@lib/prisma";

export type PostWithRelations = Post & {
  author: User;
  categories: Category[];
  comments: Comment[];
};

interface PostsResponse {
  posts: PostWithRelations[];
  totalPages: number;
}

export const getPostsByPage = defineAction({
  input: z.object({
    page: z.number().default(1),
    limit: z.number().default(6),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    search: z.string().optional(),
  }),
  handler: async ({
    page,
    limit = 6,
    category,
    tags,
    search,
  }): Promise<PostsResponse> => {
    try {
      page = page < 1 ? 1 : page;

      const where: any = {
        deletedAt: null,
      };
      if (category) {
        where.categories = { some: { id: category } };
      }
      if (tags && tags.length) {
        where.tags = { hasSome: tags };
      }
      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ];
      }

      const total = await prisma.post.count({ where });
      const totalPages = Math.ceil(total / limit);

      const posts = await prisma.post.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          author: true,
          categories: true,
          comments: true,
        },
        orderBy: { updatedAt: "desc" },
      });

      return {
        posts,
        totalPages,
      };
    } catch (e) {
      console.error("Error fetching posts by page:", e);
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error fetching by page",
      });
    }
  },
});
