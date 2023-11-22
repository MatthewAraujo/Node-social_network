import { UserDoesNotExistsError } from "@/use-cases/errors/user-does-not-existst-error";
import { makeUpdateUserUseCase } from "@/use-cases/factories/make-update-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateUserBodySchema = z.object({
    id: z.string(),
  });

  const updateUserContentSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
  });

  const { id } = updateUserBodySchema.parse(request.params);
  const { name, email, password } = updateUserContentSchema.parse(request.body);

  try {
    const updateUserUseCase = makeUpdateUserUseCase();

    await updateUserUseCase.execute({
      id,
      name,
      email,
      password: password || "", // Provide a default value if password is undefined
    });
  } catch (err) {
    if (err instanceof UserDoesNotExistsError) {
      return reply.status(404).send({ message: err.message });
    }
    return reply.status(500).send(err);
  }

  return reply.status(200).send({ message: "User updated successfully" });
}
