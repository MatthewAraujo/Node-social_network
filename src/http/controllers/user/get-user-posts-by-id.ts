import { UserDoesNotExistsError } from "@/use-cases/errors/user-does-not-existst-error";
import { UserDoesNotHavePostsError } from "@/use-cases/errors/user-does-not-have-posts-error";
import { makeGetUserPostsById } from "@/use-cases/factories/make-get-user-posts-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getUserPostsById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserPostsByIdBodySchema = z.object({
    id: z.string(),
  });

  const { id } = getUserPostsByIdBodySchema.parse(request.params);

  try {
    const getUserPostsByIdUseCase = makeGetUserPostsById();

    const user = await getUserPostsByIdUseCase.execute({
      id,
    });

    return reply.status(201).send(user);
  } catch (err) {
    if (err instanceof UserDoesNotExistsError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof UserDoesNotHavePostsError) {
      return reply.status(404).send({ message: err.message });
    }
    return reply.status(500).send(err);
  }
}
