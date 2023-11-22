import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { UpdateUserUseCase } from "../user/update-user";

export function makeUpdateUserUseCase() {
  const updateRepository = new PrismaUsersRepository();
  const updateUser = new UpdateUserUseCase(updateRepository);

  return updateUser;
}
