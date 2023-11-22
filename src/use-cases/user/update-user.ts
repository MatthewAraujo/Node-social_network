import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { UserDoesNotExistsError } from "../errors/user-does-not-existst-error";
import { hash } from "bcryptjs";

interface UpdateUserUseCaseRequest {
  id: string;
  name?: string;
  email?: string;
  password: string;
}

interface GetUserUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
    password,
  }: UpdateUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserDoesNotExistsError();
    }

    const password_hash = await hash(password, 6);

    await this.usersRepository.update(id, {
      name,
      email,
      password_hash,
    });
    return {
      user,
    };
  }
}
