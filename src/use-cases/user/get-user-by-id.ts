import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { UserDoesNotExistsError } from "../errors/user-does-not-existst-error";

interface GetUserByIdUseCaseRequest {
  id: string;
}

interface GetUserUseCaseResponse {
  user: User;
}

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserByIdUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserDoesNotExistsError();
    }
    return {
      user,
    };
  }
}
