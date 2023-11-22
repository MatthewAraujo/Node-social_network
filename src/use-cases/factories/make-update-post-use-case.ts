import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository";
import { UpdatePostUseCase } from "../post/update-post";

export function makeUpdatePostUseCase() {
  const updateRepository = new PrismaPostRepository();
  const updatePost = new UpdatePostUseCase(updateRepository);

  return updatePost;
}
