import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../contracts/__generated__/client /client";

const adapter = new PrismaMariaDb({
  host: "localhost",
  user: "root",
  password: "nirmal123",
  database: "mydb",
  port: 3306,
  connectionLimit: 5,
});

export const db = new PrismaClient({ adapter });
