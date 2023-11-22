import { PostsRepository } from "@/repositories/post-repository";
import { Post } from "@prisma/client";
import { PostDoesNotExistsError } from "../errors/post-does-not-exists-error";

interface GetPostByIdUseCaseRequest {
  id: string;
}

interface GetPostUseCaseResponse {
  post: Post;
}

export class GetPostByIdUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    id,
  }: GetPostByIdUseCaseRequest): Promise<GetPostUseCaseResponse> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new PostDoesNotExistsError();
    }
    return {
      post,
    };
  }
}
