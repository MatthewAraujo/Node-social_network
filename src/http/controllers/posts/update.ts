import { PostDoesNotExistsError } from "@/use-cases/errors/post-does-not-exists-error";
import { makeUpdatePostUseCase } from "@/use-cases/factories/make-update-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updatePostBodySchema = z.object({
    id: z.string(),
  });

  const updatePostContentSchema = z.object({
    content: z.string(),
  })

  const { id } = updatePostBodySchema.parse(request.params);
  const { content } = updatePostContentSchema.parse(request.body);

  try {
    const updatePostUseCase = makeUpdatePostUseCase();

    await updatePostUseCase.execute({
      id,
      content
    });

    
  } catch (err){
    if (err instanceof PostDoesNotExistsError) {
      return reply.status(404).send({ message: err.message });
    }
    return reply.status(500).send(err);
  }

  return reply.status(200).send({ message: "Post updated successfully" });

}
