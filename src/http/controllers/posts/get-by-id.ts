import { PostDoesNotExistsError } from "@/use-cases/errors/post-does-not-exists-error";
import { makeGetPostById } from "@/use-cases/factories/make-get-post-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPostById(request: FastifyRequest, reply: FastifyReply) {
  const getPostByIdBodySchema = z.object({
    id: z.string(),
  });

  const { id } = getPostByIdBodySchema.parse(request.params);

  try {
    const getPostByIdUseCase = makeGetPostById();

    const post = await getPostByIdUseCase.execute({
      id,
    });

    return reply.status(201).send(post);
  } catch (err){
    if (err instanceof PostDoesNotExistsError) {
      return reply.status(404).send({ message: err.message });
    }
    return reply.status(500).send(err);
  }

}
