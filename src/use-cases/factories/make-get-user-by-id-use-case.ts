import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetUserByIdUseCase } from "../user/get-user-by-id";

export function makeGetUserById() {
  const userRepository = new PrismaUsersRepository();
  const getUserById = new GetUserByIdUseCase(userRepository);

  return getUserById;
}
