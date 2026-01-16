import { Request, Response } from "express";
import { createUser } from "../../model/user-model";
export const createUserController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const userData = await createUser(body);
    res
      .status(201)
      .json({ message: "User created successfully", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
