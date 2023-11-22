import { UsersRepository } from "@/repositories/users-repository";
import { compare, hash } from "bcryptjs";
import { UserCredentialsIncorrectError } from "../errors/user-credentials-incorrect-error";

interface LoginUseCaseRequest {
  email: string;
  password: string;
}

export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: LoginUseCaseRequest): Promise<void> {
    
    const user = await this.usersRepository.findByEmail(
      email,
    );

    if(!user){
      throw new UserCredentialsIncorrectError();
    }

    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new UserCredentialsIncorrectError();
    }


    if (!user) {
      throw new UserCredentialsIncorrectError();
    }
  }
}
