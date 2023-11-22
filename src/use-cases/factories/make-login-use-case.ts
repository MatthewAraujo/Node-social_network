import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { LoginUseCase } from "../user/login-user";

export function makeLoginUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const loginUseCase = new LoginUseCase(usersRepository);

  return loginUseCase;
}
