import { Prisma, Post } from "@prisma/client";

export interface PostsRepository {
  findById(id: string): Promise<Post | null>;
  create(data: Prisma.PostCreateInput): Promise<Post>;
}
