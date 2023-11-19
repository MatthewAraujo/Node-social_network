import { UserDoesNotExists } from "@/use-cases/errors/user-does-not-existst-error";
import { makeCreatePostUseCase } from "@/use-cases/factories/make-create-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  const createPostBodySchema = z.object({
    content: z.string(),
    authorId: z.string(),
  });

  const { content , authorId } = createPostBodySchema.parse(request.body);

  try {
    const createPostUseCase = makeCreatePostUseCase();

    await createPostUseCase.execute({
      content,
      authorId,
    });
  } catch (err){
    if (err instanceof UserDoesNotExists) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();

}
