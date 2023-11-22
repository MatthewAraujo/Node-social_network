import { FastifyInstance } from "fastify";
import { createPost } from "./create";
import { getPostById } from "./get-by-id";
import { getAllPosts } from "./get-all-posts";
import { update } from "./update";

export async function postsRoutes(app: FastifyInstance) {
  app.post("/posts", createPost);
  app.get("/posts/:id", getPostById);
  app.get("/posts", getAllPosts);
  app.patch("/posts/:id", update);
}
