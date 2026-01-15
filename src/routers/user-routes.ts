import { Application } from "express";
import { createUserController } from "../controllers/user/createUser-controller";

export async function userRouter(app: Application) {
  app.post("/users", createUserController);
  
}
