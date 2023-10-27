import { z } from "zod";
import { eventCreateSchema } from "~/utils/validator/userInput";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "~/env.mjs";
import s3 from "~/server/s3";
import { db } from "~/server/db";
export const bettingRouter = createTRPCRouter({    
    getBettingHistory: protectedProcedure
      .query(async ({ ctx }) => {
        const result = await db.event.findMany({
            where: {
            eventHistories: { every: { boughtById: ctx.session.user.id}},
            isResoluted: true,
            },
        });
        return result
    }),
});