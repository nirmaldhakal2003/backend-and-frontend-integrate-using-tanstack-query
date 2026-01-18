import { TCreateUserSchema } from "../controllers/user/createUser-controller";
import { TLoginUserSchema } from "../controllers/user/loginUser-controller";
import { Prisma } from "../generated/prisma/client";
import { comparePassword } from "../lib/hash";
import { prisma } from "../lib/prisma";

export async function createUser(data: TCreateUserSchema) {
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: data.email,
        },
        {
          name: data.name,
        },
      ],
    },
  });
  if (userExists) {
    throw new Error(`User with given email or name already exists`);
  }

  const createdUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });

  return createdUser;
}

type TGetAllUserWhereInput = {
  name?: string;
  email?: string;
};
type TGetAllUserPaginationInput = {
  page: number;
  perPage: number;
};
export async function getAllUser(
  whereInput: TGetAllUserWhereInput,
  Pagination: TGetAllUserPaginationInput,
) {
  const prismaWhereInput: Prisma.userWhereInput = {
    ...(whereInput.name && { name: { contains: whereInput.name } }),
    ...(whereInput.email && { email: { contains: whereInput.email } }),
  };

  const totalUsers = await prisma.user.count({
    where: prismaWhereInput,
  });

  const users = await prisma.user.findMany({
    where: prismaWhereInput,
    take: Pagination.perPage,
    skip: (Pagination.page - 1) * Pagination.perPage,
  });
  return { users, totalUsers };
}

export async function loginUser(data: TLoginUserSchema) {
  const userFound = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!userFound) {
    throw new Error(`You are not registered! Please register.`);
  }

  // check if password matches
  const isPasswordCorrect = await comparePassword(
    userFound.password,
    data.password,
  );

  if (!isPasswordCorrect) {
    throw new Error(`Username or password is incorrect!`);
  }

  return userFound;
}
