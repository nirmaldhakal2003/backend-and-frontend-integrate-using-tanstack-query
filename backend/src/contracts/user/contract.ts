import { initContract } from "@ts-rest/core";
import {
  AddUserInputSchema,
  AddUserResponseSchema,
  GetAllUserSchema,
  GetAllUserResponseSchema,
} from "./schema";
import { ErrorSchema } from "../schema";
import { z } from "zod";
const c = initContract();

export const userContract = c.router({
  createUser: {
    method: "POST",
    path: "/user",
    body: AddUserInputSchema,
    responses: {
      201: AddUserResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
  },

  getUser: {
    method: "GET",
    path: "/user",
    query: z.object({
      pageNum: z.string().optional(),
      pagePage: z.string().optional(),
      name: z.string().optional(),
      email: z.string().optional(),
    }),
    responses: {
      200: GetAllUserResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
  },
});
