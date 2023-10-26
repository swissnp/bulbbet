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
    return result;
  }),
  getEventData: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await db.event.findFirst({
        where: { id: input.id },
      });
      return result;
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
      take: 10, // For the top 10 events
    });
    if (trending.length <= 3 ) {
      // If there is no trending event, return the most recent 10 ending events
      return await db.event.findMany({
        take: 10,
        where: { resolutedAt: { gte: new Date() } }, //
        orderBy: { resolutedAt: "asc" },
      })
    }
    const eventIds = trending.map((t) => t.eventId);
    const events = await db.event.findMany({
      where: {
        id: {
          in: eventIds,
        },
      },
    });
    console.log(events);
    return events;
  }),
});
