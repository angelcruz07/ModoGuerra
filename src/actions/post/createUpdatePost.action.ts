import prisma from "@lib/prisma";
import { ImageUpload } from "@utils/image-upload";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const createUpdatePost = defineAction({
  accept: "form",
  input: z.object({
    id: z.string().optional(),
    title: z.string().min(3).max(50),
    description: z.string().min(3).max(255),
    content: z.string().min(10),
    image: z.any().optional(),
    tags: z.string().min(3).max(200),
    slug: z.string().min(5).optional(),
    categories: z.array(z.string().min(3)).or(z.string().min(3)),
  }),
  handler: async (
    { id, title, description, content, image, tags, slug, categories },
    { locals },
  ) => {
    const user = locals.user;

    if (!user) {
      throw new ActionError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to create or update a post",
      });
    }

    try {
      const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
      const slugifiedTitle = title.toLowerCase().replace(/\s+/g, "-");

      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];

      const existingCategories = await prisma.category.findMany({
        where: {
          id: {
            in: categoriesArray,
          },
        },
      });

      if (existingCategories.length !== categoriesArray.length) {
        console.error("One or more categories do not exist");
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "One or more categories do not exist in the database",
        });
      }

      let updaloadedUrl: string | null = null;
      if (image && image.size > 0) {
        try {
          updaloadedUrl = await ImageUpload.upload(image);
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
        }
      }

      if (id) {
        const updatedPost = await prisma.post.update({
          where: { id },
          data: {
            title,
            description,
            content,
            image: updaloadedUrl,
            tags: { set: tagsArray },
            slug,
            userId: user.id,
            categories: {
              set: categoriesArray.map((categoryId) => ({ id: categoryId })),
            },
          },
        });

        return updatedPost;
      } else {
        const newPost = await prisma.post.create({
          data: {
            title,
            description,
            content,
            image: updaloadedUrl,
            tags: { set: tagsArray },
            slug: slug || slugifiedTitle,
            userId: user.id,
            categories: {
              connect: categoriesArray.map((categoryId) => ({
                id: categoryId,
              })),
            },
          },
        });

        return newPost;
      }
    } catch (e) {
      console.error("Error creating/updating post:", e);
      console.log(e);
      throw new ActionError({
        code: "BAD_REQUEST",
        message:
          "Error updating the post: " +
          (e instanceof Error ? e.message : String(e)),
      });
    }
  },
});
