import { prisma } from "@/lib/prisma";
import { PostsRepository } from "../post-repository";
import { Prisma } from "@prisma/client";

export class PrismaPostRepository implements PostsRepository {
  async findById(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  }

  async create(data: Prisma.PostCreateInput) {
    const post = await prisma.post.create({
      data,
    });

    return post;
  }
}
