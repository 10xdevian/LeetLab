import { PrismaClient } from "../generated/prisma/index";

// extend the global this type
declare global {
  var prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
