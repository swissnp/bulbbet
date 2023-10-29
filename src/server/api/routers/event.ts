import { z } from "zod";
import { eventCreateSchema } from "~/utils/validator/userInput";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "~/env.mjs";
import s3 from "~/server/s3";
import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";
export const eventRouter = createTRPCRouter({
  createEvent: protectedProcedure
    .input(eventCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await db.event.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
          resolutedAt: input.resolutedAt,
          resolutionDetails: input.resolutionDetails,
          imageUrl: env.S3_PUBLIC_URL + "/" + input.fileName,
          description: input.description,
          eventHistories: {
            create: [{
              isAgree: true,
              agreePrice: 50,
              totalPrice: 500,
              shareAmount: 10,
              boughtById: 'cloab86li0000tfe7ydv7e63z', // initial buying will be done by the ADMIN ACCOUNT
            },{
              isAgree: false,
              agreePrice: 50,
              totalPrice: 500,
              shareAmount: 10,
              boughtById: 'cloab86li0000tfe7ydv7e63z', // initial buying will be done by the ADMIN ACCOUNT
            }],
          }
        },
      });
      return result;
    }),
  getPresignedUrl: protectedProcedure.query(async ({ ctx }) => {
    const fileName = `${ctx.session.user.id}/${Date.now()}.jpeg`;
    const url = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: fileName,
        ContentType: "image/jpeg",
        ACL: "public-read",
      }),
      { expiresIn: 3600 },
    );
    return { url, fileName };
  }),
  getMyEvents: protectedProcedure.query(async ({ ctx }) => {
    const result = await db.event.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      orderBy: { resolutedAt: "asc" },
    });
    return result.map((e) => ({
      ...e,
      nextAgreePrice: +e.nextAgreePrice.toNumber().toFixed(2),
    }));
  }),
  getEventData: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await db.event.findFirst({
        where: { id: input.id },
      });
      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }
      return {
        ...result,
        nextAgreePrice: +result?.nextAgreePrice?.toNumber().toFixed(2),
      }
    }),
  getAllEventsId: publicProcedure.query(async () => {
    const result = await db.event.findMany({
      select: { id: true },
      orderBy: { resolutedAt: "asc" },
    });
    return result;
  }),
  getTrending: publicProcedure.query(async () => {
    const trending = await db.eventHistory.groupBy({
      by: ["eventId"],
      _count: {
        eventId: true,
      },
      orderBy: {
        _count: {
          eventId: "desc",
        },
      },
      where: { event: { resolutedAt: { gte: new Date() } }},
      take: 10, // For the top 10 events
    });
    if (trending.length <= 3) {
      // If there is no trending event, return the most recent 10 ending events
      const recentEvents = await db.event.findMany({
        take: 10,
        where: { resolutedAt: { gte: new Date() } }, //
        orderBy: { resolutedAt: "asc" },
      });
      return recentEvents.map((e) => ({
        ...e,
        nextAgreePrice: +e.nextAgreePrice.toNumber().toFixed(2),
      }))
    }
    const eventIds = trending.map((t) => t.eventId);
    const events = await db.event.findMany({
      where: {
        id: {
          in: eventIds,
        }
      },
    });
    return events.map((e) => ({
      ...e,
      nextAgreePrice: +e.nextAgreePrice.toNumber().toFixed(2),
    }));
  }),
  // getPriceChart: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(async ({ input }) => {
  //     const result = await db.eventHistory.findMany({
  //       where: { eventId: input.id },
  //       orderBy: { createdAt: "asc" },
  //       select: {
  //         id: true,
  //         isAgree: true,
  //         createdAt: true,
  //         agreePrice: true,
  //         totalPrice: true,
  //         shareAmount: true,
  //         event: {
  //           select: {
  //             nextAgreePrice: true,
  //           },
  //         },
  //       },
  //     });
  //     if (!result || result.length === 0) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Event not found",
  //       });
  //     }
  //     let graph_data = result.map((r) => {
  //       return {
  //         Time: r.createdAt,
  //         Yes: r.agreePrice.toNumber(),
  //         No: 100 - r.agreePrice.toNumber(),
  //       };
  //     });
  //     // if (!result[0]?.event.nextAgreePrice) {
  //     //   throw new TRPCError({
  //     //     code: "INTERNAL_SERVER_ERROR",
  //     //     message: "Latest price not found",
  //     //   });
  //     // }
  //     // graph_data.push({
  //     //     Time: new Date(),
  //     //     Yes: result[0]?.event.nextAgreePrice.toNumber(),
  //     //     No: 100 - result[0]?.event.nextAgreePrice.toNumber(),
  //     //   })
  //     const shiftedPrices = graph_data.map((r, index, arr) => {
  //       // If it's the last element, take the new Yes and No values
  //       if (index === arr.length - 1) {
  //         if (!result[0]?.event.nextAgreePrice) {
  //           throw new TRPCError({
  //             code: "INTERNAL_SERVER_ERROR",
  //             message: "Latest price not found",
  //           });
  //         }
  //         return {
  //           Yes: result[0]?.event.nextAgreePrice?.toNumber(),
  //           No: 100 - (result[0]?.event.nextAgreePrice?.toNumber()),
  //         };
  //       }
  //       // Otherwise, take the Yes and No values from the next element
  //       return {
  //         Yes: arr[index + 1]?.Yes ?? 0,
  //         No: arr[index + 1]?.No ?? 0,
  //       };
  //     });
  //     graph_data = graph_data.map((item, index) => ({
  //       ...item,
  //       Yes: shiftedPrices[index]?.Yes ?? 0,
  //       No: shiftedPrices[index]?.No ?? 0,
  //     }));
  //     // shift the yes no price [n] to match the previous time [n-1]
  //     return graph_data;
  //   }),
    getPriceChartPush: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await db.eventHistory.findMany({
        where: { eventId: input.id },
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          isAgree: true,
          createdAt: true,
          agreePrice: true,
          totalPrice: true,
          shareAmount: true,
          event: {
            select: {
              nextAgreePrice: true,
            },
          },
        },
      });
      if  (!result) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Server Error",
        });
      }
      if (result.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No price history found",
        });
      }
      const graph_data = result.map((r) => {
        return {
          Time: r.createdAt,
          Yes: +r.agreePrice.toNumber().toFixed(2),
          No: +(100 - r.agreePrice.toNumber()).toFixed(2),
        };
      });
      if (!result[0]?.event.nextAgreePrice) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Latest price not found",
        });
      }
      graph_data.push({
          Time: new Date(),
          Yes: +result[0]?.event.nextAgreePrice.toNumber().toFixed(2),
          No: 100 - +result[0]?.event.nextAgreePrice.toNumber().toFixed(2),
        })
      if (graph_data[0]?.Yes == 50 && graph_data[1]?.Yes == 50) {
        graph_data.shift();
      }
      return graph_data;
    }),
    getEventById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await db.event.findFirst({
        where: { id: input.id },
      });
      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }
      return {
        ...result,
        nextAgreePrice: +result?.nextAgreePrice?.toNumber().toFixed(2),
        isEnded: result.resolutedAt < new Date(),
      };
    }),
    getEventBySearch: publicProcedure
    .input(z.object({ search: z.string() }))
    .mutation(async ({ input }) => {
      let where = {};
      if (input.search != '') {
        where = {
          OR: [
            {
              name: {
                contains: input.search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: input.search,
                mode: "insensitive",
              },
            },
          ],
        };
      }
      const result = await db.event.findMany({
        where,
      });
      return result.map((e) => ({
        ...e,
        nextAgreePrice: +e.nextAgreePrice.toNumber().toFixed(2),
        isEnded: e.resolutedAt < new Date(),
      }));
    }),
});
