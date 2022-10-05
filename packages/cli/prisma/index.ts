import { PrismaClient } from "./generated/client";

declare global {
  var prisma: PrismaClient<any>;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
