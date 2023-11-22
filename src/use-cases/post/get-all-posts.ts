import { PostsRepository } from "@/repositories/post-repository";
import { Post } from "@prisma/client";
import { PostDoesNotExistsError } from "../errors/post-does-not-exists-error";

interface GetAllPostsResponse {
  post: Post[];
}

export class GetAllPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({}): Promise<GetAllPostsResponse> {
    const post = await this.postsRepository.getAllPosts();

    if (post.length === 0) {
      throw new PostDoesNotExistsError();
    }

    return {
      post,
    };
  }
}
