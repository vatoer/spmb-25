import { Prisma, PrismaClient } from "@prisma-db-spmb/client";

const globalForPrisma = global as unknown as { prismaDbSpmb: PrismaClient | undefined };

export const prismaDbSpmb =
    globalForPrisma.prismaDbSpmb || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaDbSpmb = prismaDbSpmb;

export { Prisma, PrismaClient };

