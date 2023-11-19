import { FastifyInstance } from "fastify";
import { createPost } from "./create";

export async function postsRoutes(app:FastifyInstance){
  app.post("/posts",createPost )
}