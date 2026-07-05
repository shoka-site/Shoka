import { type User, type InsertUser } from "@shared/schema";
import { prisma } from "../prisma";

export const userRepository = {
  async getUser(id: string): Promise<User | undefined> {
    return (await prisma.user.findUnique({ where: { id } })) || undefined;
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    return (await prisma.user.findUnique({ where: { email } })) || undefined;
  },

  async createUser(user: InsertUser): Promise<User> {
    return await prisma.user.create({ data: user });
  },
};
