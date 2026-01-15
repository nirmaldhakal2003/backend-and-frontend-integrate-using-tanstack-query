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
