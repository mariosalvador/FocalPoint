/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple instances of PrismaClient in development
  var prisma: PrismaClient | undefined;
}

export const getPrismaClient = () => {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  return globalThis.prisma;
};
