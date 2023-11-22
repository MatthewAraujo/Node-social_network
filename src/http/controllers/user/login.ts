import { UserCredentialsIncorrectError } from "@/use-cases/errors/user-credentials-incorrect-error";
import { makeLoginUseCase } from "@/use-cases/factories/make-login-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = loginBodySchema.parse(request.body);

  try {
    const loginUseCase = makeLoginUseCase();

    await loginUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserCredentialsIncorrectError) {
      return reply.status(409).send({ message: err.message });
    }
    
    throw err;
  }
  return reply.status(200).send();
}
