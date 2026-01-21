import z from "zod";
import { userSchema } from "../__generated__/types";
import { PaginationOutputSchema, SuccessSchema } from "../schema";
export const AddUserInputSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});
export type TAddUserInput = z.infer<typeof AddUserInputSchema>;
export const AddUserResponseSchema = SuccessSchema.extend({
  data: userSchema,
});
export type TAddUserResponse = z.infer<typeof AddUserResponseSchema>;

export const GetAllUserSchema = z.object({
  page: z.string(),
  perpage: z.string(),
});

export type TGetAllUserSchema = z.infer<typeof GetAllUserSchema>;
export const GetAllUserResponseSchema = SuccessSchema.extend({
  data: z.array(userSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllUserResponse = z.infer<typeof GetAllUserResponseSchema>;
