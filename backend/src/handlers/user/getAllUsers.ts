import { AppRouteImplementation } from "@ts-rest/express";
import { userContract } from "../../contracts/user/contract";
import { db } from "../../lib/db";
import { StatusCodes } from "http-status-codes";
import { handleApiErrorAndRespond } from "../../middleware/error-handler";
import { getNumFromString } from "../../lib/zod";
import { userWhereInput } from "../../contracts/__generated__/client /models";

export const getAllUser: AppRouteImplementation<
  typeof userContract.getUser
> = async ({ req, query }) => {
  try {
    const pageNum = query.pageNum ? getNumFromString(query.pageNum) : 1;
    const pagePageNum = query.pagePage ? getNumFromString(query.pagePage) : 10;

    const where: userWhereInput = {};
    if (query.name) {
      where.name = {
        contains: query.name,
      };
    }
    if (query.email) {
      where.email = {
        contains: query.email,
      };
    }

    const total = await db.user.count({ where });
    const totalPages = Math.ceil(total / pagePageNum);

    const users = await db.user.findMany({
      where,
      skip: (pageNum - 1) * pagePageNum,
      take: pagePageNum,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (users.length === 0) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          data: [],
          success: false,
          message: "No users found",
          pagination: {
            page: pageNum,
            perPage: pagePageNum,
            total: 0,
            totalPages: 0,
          },
        },
      };
    }

    return {
      status: StatusCodes.OK,
      body: {
        data: users,
        success: true,
        message: "Users retrieved successfully",
        pagination: {
          page: pageNum,
          perPage: pagePageNum,
          total,
          totalPages,
        },
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
