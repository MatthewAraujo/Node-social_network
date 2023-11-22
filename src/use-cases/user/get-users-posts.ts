import { UsersRepository } from "@/repositories/users-repository";
import { Post } from "@prisma/client";
import { UserDoesNotExistsError } from "../errors/user-does-not-existst-error";
import { PostsRepository } from "@/repositories/post-repository";
import { UserDoesNotHavePostsError } from "../errors/user-does-not-have-posts-error";

interface GetUserPostsByIdUseCaseRequest {
  id: string;
}

interface GetUserPostsByIdUseCaseResponse {
  posts: Post[];
}

export class GetUserPostsByIdUseCase {
  constructor(private usersRepository: UsersRepository, private postsRepository: PostsRepository) {}

  async execute({
    id,
  }: GetUserPostsByIdUseCaseRequest): Promise<GetUserPostsByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserDoesNotExistsError();
    }

    const posts = await this.postsRepository.findPostsByUserId(id);

    if(posts.length === 0){
      throw new UserDoesNotHavePostsError();
    }

    return {
      posts,
    };
  }
}
