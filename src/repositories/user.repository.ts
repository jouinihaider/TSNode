import { prisma } from "../lib/prisma";

export const createUser = async (email: string, score: number) => {
  console.log("Creating order...");
  return prisma.user.create({
    data: {
      email,
      score,
    },
  });
};
