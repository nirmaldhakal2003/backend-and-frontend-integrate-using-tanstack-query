import { Request, Response } from "express";
export const createUserController = async (req: Request, res: Response) => {
  const userData = req.body;
  res
    .status(201)
    .send({ message: "User created successfully", data: userData });
};
