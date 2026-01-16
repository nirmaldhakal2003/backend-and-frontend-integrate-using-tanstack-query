import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export async function createUser(data: any) {
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
  Pagination: TGetAllUserPaginationInput
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
