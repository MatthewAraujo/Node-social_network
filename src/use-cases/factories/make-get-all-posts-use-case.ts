import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository";
import { GetAllPostsUseCase } from "../post/get-all-posts";


export function makeGetAllPostsUseCase() {
  const postRepository = new PrismaPostRepository();
  const getAllPosts = new GetAllPostsUseCase(postRepository);

  return getAllPosts;
}
