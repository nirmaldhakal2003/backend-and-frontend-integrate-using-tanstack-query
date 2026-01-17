import { Request, Response } from 'express';
export const LoginUserController = (req:Request, res:Response) => {
    const { email, password } = req.body;

}