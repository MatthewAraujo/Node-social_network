import { Post, Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findPostsByUserId(userId: string): Promise<Post[]>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
