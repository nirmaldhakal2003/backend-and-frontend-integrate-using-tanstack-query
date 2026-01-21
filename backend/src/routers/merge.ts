import { userContract } from "../contracts/user/contract";
import { userRouter } from "./user-router";

export const routers = [
  {
    contract: userContract,
    router: userRouter,
  },
];
