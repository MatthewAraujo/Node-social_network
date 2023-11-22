import { Prisma, Post } from "@prisma/client";

export interface PostsRepository {
  findById(id: string): Promise<Post | null>;
  create(data: Prisma.PostCreateInput): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
  update(id: string, data: Prisma.PostUpdateInput): Promise<Post>;
  findPostsByUserId(userId: string): Promise<Post[]>;
}
