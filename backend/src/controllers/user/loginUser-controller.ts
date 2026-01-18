import { Request, Response } from "express";
import { z } from "zod";
import { generateToken } from "../../lib/token";
import { ENV } from "../../lib/env";
import { loginUser } from "../../model/user-model";

const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});
export type TLoginUserSchema = z.infer<typeof LoginUserSchema>;
export const LoginUserController = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const parsedData = LoginUserSchema.safeParse(body);
    if (!parsedData.success) {
      res.status(400).json({
        message: "Invalid input",
        error: parsedData.error,
      });
      return;
    }

    const user = await loginUser(parsedData.data);
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: ENV.JWT_TOKEN_COOKIE_AGE_IN_SECOND,
      domain: ".localhost",
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    res.json({
      message: "Login successful",
      data: { ...user, token: token },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
