import { initServer } from "@ts-rest/express";
import { userContract } from "../contracts/user/contract";
import { createUser } from "../handlers/user/createUser";
import { getAllUser } from "../handlers/user/getAllUsers";

const s = initServer();

export const userRouter = s.router(userContract, {
  createUser,
  getUser: getAllUser,
});
