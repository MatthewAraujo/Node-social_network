import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository";
import { CreatePostUseCase } from "../post/create-post";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";

export function makeCreatePostUseCase() {
  const postRepository = new PrismaPostRepository();
  const userRepository = new PrismaUsersRepository();
  const createPostUseCase = new CreatePostUseCase(postRepository, userRepository);

  return createPostUseCase;
}
