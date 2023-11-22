import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getUserById } from "./get-by-id";
import { getUserPostsById } from "./get-user-posts-by-id";
import { update } from "./update";
import { login } from "./login";

export async function userRoutes(app:FastifyInstance){
  app.post("/user", register)
  app.get("/user/:id", getUserById)
  app.get("/user/posts/:id", getUserPostsById)
  app.patch("/user/:id", update)
  app.post("/user/login", login)
}