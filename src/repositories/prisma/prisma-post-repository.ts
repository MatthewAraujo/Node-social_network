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

  async getAllPosts() {
    const posts = await prisma.post.findMany();

    return posts;
  }

  async update(id: string, data: Prisma.PostUpdateInput) {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data,
    });

    return post;
  }

  async findPostsByUserId(userId: string) {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
    });

    return posts;
  }
}
