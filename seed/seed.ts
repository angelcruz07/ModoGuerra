import "dotenv/config";
import { PrismaClient } from "../prisma/generated/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

import { categories } from "./seed-categories.ts";
import { posts } from "./seed-posts.ts";
import { users } from "./seed-users.ts";

async function main() {
  // Delete in order to respect foreign key constraints
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  // Create in order
  await prisma.category.createMany({ data: categories });
  await prisma.user.createMany({ data: users });
  await prisma.post.createMany({
    data: posts.map(({ categories, ...rest }) => rest),
  });

  //Relaciona los post con su categoria
  for (const post of posts) {
    await prisma.post.update({
      where: { slug: post.slug },
      data: {
        categories: {
          connect: post.categories.map((name) => ({ name })),
        },
      },
    });
  }

  console.log("Seed executed successfully");
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});

