import { NextFunction, Request, Response } from "express";
import { createUser } from "../../model/user-model";
import { z } from "zod";
import { hashPassword } from "../../lib/hash";

const CreateUserSchema = z.object({
  name: z.string().min(3).max(15),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export type TCreateUserSchema = z.infer<typeof CreateUserSchema>;

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;

    const parsedData = CreateUserSchema.safeParse(body);
    if (!parsedData.success) {
      res.status(400).json({
        message: "Invalid input",
        error: parsedData.error,
      });
      return;
    }

    const hashedPassword = await hashPassword(parsedData.data.password);
    const userData = await createUser({
      ...parsedData.data,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: userData });
  } catch (error) {
    next(error);
  }
};
