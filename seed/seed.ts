import prisma  from '../src/lib/prisma.ts';
import { categories } from "./seed-categories.ts";
import { posts } from "./seed-posts.ts";
import { users } from "./seed-users.ts";

async function main() { 
    await prisma.category.deleteMany();
    await prisma.category.createMany({ data: categories });

    await prisma.user.deleteMany();
    await prisma.user.createMany({ data: users });

    await prisma.post.deleteMany();
    await prisma.post.createMany({
        data: posts.map(({ categories, ...rest }) => rest)
    });

    //Relaciona los post con su categoria
    for (const post of posts) {
        await prisma.post.update({
            where: { slug: post.slug },
            data: {
                categories: {
                    connect: post.categories.map(name => ({ name }))
                }
            }
        });
    }

    console.log("Seed executed successfully");
} 
main().catch((e) => { 
    console.error(e);
    process.exit(1);
});