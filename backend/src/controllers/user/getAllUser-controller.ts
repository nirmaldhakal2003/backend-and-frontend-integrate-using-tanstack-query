import { Request, Response } from "express";
import { getAllUser } from "../../model/user-model";

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const page = query.page || "1";
    const perPage = query.perPage || "10";
    const pageNumber = Number(page);
    const users = await getAllUser(
      {},
      {
        page: pageNumber,
        perPage: Number(perPage),
      }
    );
    res.json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
