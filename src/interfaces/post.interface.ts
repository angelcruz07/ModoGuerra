import { type User } from "@prisma/client";

export interface Category {
  id: string;
  name: string;
}

export interface Post {
  id?: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: User;
  tags: string[];
  slug: string;
  categories: Category[];
  createdAt: Date;
}
