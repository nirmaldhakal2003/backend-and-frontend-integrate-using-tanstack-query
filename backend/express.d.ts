import { Request } from "express";
import { UserType } from "./src/contracts/__generated__/client/enums";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        type: UserType;
      };
      requestId: string;
      decodedAccessToken: {
        email: string;
        name: string;
        iat: number;
        exp: number;
      };
      auth: {
        userId: string;
      };
    }
  }
}
