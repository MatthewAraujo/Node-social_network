import { UserDoesNotExistsError } from "@/use-cases/errors/user-does-not-existst-error";
import { makeGetUserById } from "@/use-cases/factories/make-get-user-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
  const getUserByIdBodySchema = z.object({
    id: z.string(),
  });

  const { id } = getUserByIdBodySchema.parse(request.params);

  try {
    const getUserByIdUseCase = makeGetUserById();

    const user = await getUserByIdUseCase.execute({
      id,
    });

    return reply.status(201).send(user);
  } catch (err){
    if (err instanceof UserDoesNotExistsError) {
      return reply.status(404).send({ message: err.message });
    }
    return reply.status(500).send(err);
  }

}
