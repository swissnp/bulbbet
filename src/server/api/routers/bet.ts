// import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const betRouter = createTRPCRouter({
  getMyBets: protectedProcedure
  .query(async ({ ctx }) => {
    const result = await db.eventHistory.findMany({
      where: { boughtById: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      select:{
        id: true,
        isAgree: true,
        createdAt: true,
        agreePrice: true,
        totalPrice: true,
        shareAmount: true,
        event: true,
      }
    });
    return result;
  }),
  // purchase: protectedProcedure
  // .input(z.object({
  //   eventId: z.string(),
  //   isAgree: z.boolean(),
  //   shareAmount: z.number(),
  // }))
  // .query(async ({ ctx, input : {
  //   eventId,
  //   isAgree,
  //   shareAmount,
  // } }) => {
  //   // calculate the next price
  //   const pricePerShare = isAgree ? shareAmount : 100 - shareAmount;
  // })
})