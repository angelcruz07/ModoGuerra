import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import prisma from "@lib/prisma";
import type { PostWithRelations } from "./getPostsByPage.action";

export const getRecommendedPosts = defineAction({
  input: z.object({
    postId: z.string(),
    limit: z.number().default(4),
  }),
  handler: async ({ postId, limit = 4 }): Promise<PostWithRelations[]> => {
    try {
      const currentPost = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          categories: true,
        },
      });

      if (!currentPost) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      const categoryIds = currentPost.categories.map((cat) => cat.id);
      const postTags = currentPost.tags || [];

      let recommendedPosts: PostWithRelations[] = [];

      if (postTags.length > 0 && categoryIds.length > 0) {
        const tagAndCategoryMatches = await prisma.post.findMany({
          where: {
            AND: [
              { id: { not: postId } },
              { deletedAt: null },
              { categories: { some: { id: { in: categoryIds } } } },
              { tags: { hasSome: postTags } },
            ],
          },
          include: {
            author: true,
            categories: true,
            comments: true,
          },
          orderBy: { updatedAt: "desc" },
          take: limit,
        });
        recommendedPosts.push(...tagAndCategoryMatches);
      }

      if (recommendedPosts.length < limit && postTags.length > 0) {
        const remaining = limit - recommendedPosts.length;
        const existingIds = recommendedPosts.map((p) => p.id);

        const tagMatches = await prisma.post.findMany({
          where: {
            AND: [
              { id: { not: postId } },
              { id: { notIn: existingIds } },
              { deletedAt: null },
              { tags: { hasSome: postTags } },
            ],
          },
          include: {
            author: true,
            categories: true,
            comments: true,
          },
          orderBy: { updatedAt: "desc" },
          take: remaining,
        });
        recommendedPosts.push(...tagMatches);
      }

      if (recommendedPosts.length < limit && categoryIds.length > 0) {
        const remaining = limit - recommendedPosts.length;
        const existingIds = recommendedPosts.map((p) => p.id);

        const categoryMatches = await prisma.post.findMany({
          where: {
            AND: [
              { id: { not: postId } },
              { id: { notIn: existingIds } },
              { deletedAt: null },
              { categories: { some: { id: { in: categoryIds } } } },
            ],
          },
          include: {
            author: true,
            categories: true,
            comments: true,
          },
          orderBy: { updatedAt: "desc" },
          take: remaining,
        });
        recommendedPosts.push(...categoryMatches);
      }

      if (recommendedPosts.length < limit) {
        const remaining = limit - recommendedPosts.length;
        const existingIds = recommendedPosts.map((p) => p.id);

        const recentPosts = await prisma.post.findMany({
          where: {
            AND: [
              { id: { not: postId } },
              { id: { notIn: existingIds } },
              { deletedAt: null },
            ],
          },
          include: {
            author: true,
            categories: true,
            comments: true,
          },
          orderBy: { updatedAt: "desc" },
          take: remaining,
        });
        recommendedPosts.push(...recentPosts);
      }

      return recommendedPosts.slice(0, limit);
    } catch (e) {
      console.error("Error fetching recommended posts:", e);
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error fetching recommended posts",
      });
    }
  },
});
