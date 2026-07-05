import { PrismaClient } from "@prisma/client";

// Ensure a single PrismaClient instance is reused.
export const prisma = new PrismaClient();
