import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { postsRoutes } from "./http/controllers/posts/route";
import { userRoutes } from "./http/controllers/user/routes";

export const app = fastify();
app.register(postsRoutes);
app.register(userRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." });
});
