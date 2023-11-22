import { PostsRepository } from "@/repositories/post-repository";
import { Post } from "@prisma/client";
import { PostDoesNotExistsError } from "../errors/post-does-not-exists-error";

interface UpdatePostUseCaseRequest {
  id: string;
  content: string;
}

interface GetPostUseCaseResponse {
  post: Post;
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    id,
    content,
  }: UpdatePostUseCaseRequest): Promise<GetPostUseCaseResponse> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new PostDoesNotExistsError();
    }

    await this.postsRepository.update(id, {
      content,
    });
    return {
      post,
    };
  }
}
