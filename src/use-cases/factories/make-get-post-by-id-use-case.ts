import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository";
import { GetPostByIdUseCase } from "../post/get-post-by-id";

export function makeGetPostById() {
  const postRepository = new PrismaPostRepository();
  const getPostById = new GetPostByIdUseCase(postRepository);

  return getPostById;
}
