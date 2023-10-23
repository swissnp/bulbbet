import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";
export const userRouter = createTRPCRouter({
  getAllUsers: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({input: {search}}) => {
      const result = await db.user.findFirst({
        where: { name: search },
      });
      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        })
      }
      return result;
    }),
});
