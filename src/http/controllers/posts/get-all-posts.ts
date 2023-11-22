import { PostDoesNotExistsError } from "@/use-cases/errors/post-does-not-exists-error";
import { makeGetAllPostsUseCase } from "@/use-cases/factories/make-get-all-posts-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getAllPosts(_: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllPosts = makeGetAllPostsUseCase()

    const posts = await getAllPosts.execute({});

    return reply.status(200).send(posts);
  } catch (err) {
    if (err instanceof PostDoesNotExistsError) {
      return reply.status(404).send({ message: err.message });
    }
    return reply.status(500).send(err);
  }
}
