import { Application } from "express";
import { createUserController } from "../controllers/user/createUser-controller";
import { getAllUserController } from "../controllers/user/getAllUser-controller";
import { LoginUserController } from "../controllers/user/loginUser-controller";

export async function userRouter(app: Application) {
  app.post("/users", createUserController);
  app.get("/users", getAllUserController);
  app.post("/users/login", LoginUserController );
}
