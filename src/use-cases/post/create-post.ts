import { PostsRepository } from "@/repositories/post-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Post } from "@prisma/client";
import { UserDoesNotExists } from "../errors/user-does-not-existst-error";

interface CreatePostUseCaseRequest {
  content: string;
  authorId: string;
}

interface CreatePostUseCaseResponse {
  post: Post;
}

export class CreatePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    content,
    authorId,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const authorIdExists = await this.usersRepository.findById(authorId);

    if(!authorIdExists){
      throw new UserDoesNotExists()
    }

    const postContent = {
      content,
      userId:authorId
    }

    const post = await this.postsRepository.create(postContent)

    return {
      post
    }
  }
}
