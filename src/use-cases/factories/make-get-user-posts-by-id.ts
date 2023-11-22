import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetUserPostsByIdUseCase } from "../user/get-users-posts";
import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository";

export function makeGetUserPostsById() {
  const userRepository = new PrismaUsersRepository();
  const postRepository = new PrismaPostRepository();
  const getUserPostsById = new GetUserPostsByIdUseCase(userRepository, postRepository);

  return getUserPostsById;
}
