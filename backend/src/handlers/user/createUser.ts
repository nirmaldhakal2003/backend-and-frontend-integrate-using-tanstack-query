import { AppRouteImplementation } from "@ts-rest/express";
import { userContract } from "../../contracts/user/contract";
import { db } from "../../lib/db";
import { StatusCodes } from "http-status-codes";
import { handleApiErrorAndRespond } from "../../middleware/error-handler";

export const createUser: AppRouteImplementation<
  typeof userContract.createUser
> = async ({ req, body }) => {
  try {
    const user = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    return {
      status: StatusCodes.CREATED,
      body: {
        data: user,
        success: true,
        message: "User created successfully",
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
