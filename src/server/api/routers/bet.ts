import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const betRouter = createTRPCRouter({
  getMyBets: protectedProcedure.query(async ({ ctx }) => {
    const result = await db.eventHistory.findMany({
      where: { boughtById: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        isAgree: true,
        createdAt: true,
        agreePrice: true,
        totalPrice: true,
        shareAmount: true,
        event: true,
      },
    });
    return result.map((e) => ({
      ...e,
      agreePrice: +e.agreePrice.toNumber().toFixed(2),
      totalPrice: +e.totalPrice.toNumber().toFixed(2),
      event: {
        ...e.event,
        nextAgreePrice: +e.event.nextAgreePrice.toNumber().toFixed(2),
      },
    }));
  }),

  purchase: protectedProcedure
  .input(z.object({
    eventId: z.string(),
    isAgree: z.boolean(),
    shareAmount: z.number(),
  }))
  .mutation(async ({ ctx, input : {
    eventId,
    isAgree,
    shareAmount,
  } }) => {
    // get the event
    const event = await db.event.findFirst({
      where: { id: eventId },
    });
    // calculate the next price
    if (!event) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Event not found",
      })
    }
    if (event.resolutedAt < new Date()) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Event has already ended",
      })
    }
    const pricePerShare = isAgree ? event?.nextAgreePrice.toNumber() : 100 - event?.nextAgreePrice.toNumber();
    const totalPrice = pricePerShare * shareAmount;
    // check if user has enough money
    if (totalPrice > ctx.session.user.amount) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Not enough money",
      })
    }
    // update user amount
    await db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        amount: {
          decrement: totalPrice,
        }
      }
    })
    await db.eventHistory.create({
      data: {
        isAgree,
        shareAmount,
        totalPrice,
        agreePrice: pricePerShare,
        event: {
          connect: {
            id: eventId,
          }
        },
        boughtBy: {
          connect: {
            id: ctx.session.user.id,
          }
        }
      }
    })
    // get total amount of event
    const totalAmount = await db.eventHistory.aggregate({
      where: { eventId },
      _sum: {
        totalPrice: true,
      }
    })
    // get total of agree
    const totalAgree = await db.eventHistory.aggregate({
      where: { eventId, isAgree: true },
      _sum: {
        totalPrice: true,
      }
    })
    if (!totalAgree?._sum?.totalPrice || !totalAmount?._sum?.totalPrice) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Server Error",
      })
    }
    // update event
    const newEvent = await db.event.update({
      where: { id: eventId },
      data: {
        nextAgreePrice: {
          set: totalAgree._sum.totalPrice.toNumber() / totalAmount._sum.totalPrice.toNumber() * 100,
        }
      }
    })
    return newEvent;
  })
});
