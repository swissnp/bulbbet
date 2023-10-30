import { z } from "zod";
import { TopUpSchema } from "~/utils/validator/userInput";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { EventEmitter } from 'events';
import { observable } from '@trpc/server/observable';
import { db } from "~/server/db";
import { env } from "~/env.mjs";
import { TRPCError } from "@trpc/server";

const ee = new EventEmitter();
type Post = {
  id: string;
  userId: string;
  token: string;
  amount: number;
  expires: Date;
}
export const topUpRouter = createTRPCRouter({
  // onAdd: protectedProcedure.subscription(() => {
  //   // return an `observable` with a callback which is triggered immediately
  //   return observable<Post>((emit) => {
  //     const onAdd = (data: Post) => {
  //       // update user's amount
  //       emit.next(data);
  //     };
  //     // trigger `onAdd()` when `add` is triggered in our event emitter
  //     ee.on('add', onAdd);
  //     // unsubscribe function when client disconnects or stops subscribing
  //     return () => {
  //       ee.off('add', onAdd);
  //     };
  //   });
  // }),
  // add: publicProcedure
  //   .input(
  //     z.object({
  //       token: z.string(),
  //     }),
  //   )
  //   .mutation(async (opts) => {

  //     const token = await db.topUpToken.findFirst({
  //       where:{token: opts.input.token }
  //     })
  //     if(!token) {
  //       throw new TRPCError({
  //         code: 'BAD_REQUEST',
  //         message: 'ID not found',
  //       });
  //     }

  //     //update user amount
  //     await db.user.update({
  //       where: { id: token.userId },
  //       data: {
  //         amount: {
  //           increment: token.amount,
  //         }
  //       }
  //     })
  //     // const token = { ...opts.input }; /* [..] add to db */
  //     ee.emit('add', token);
  //     return {
  //       ...token,
  //       amount: token.amount.toNumber(),
  //     }
  //   }),
  createToken: protectedProcedure
    .input(TopUpSchema)
    .mutation(async ({ ctx, input }) => {
      // create a random token longer than 20 characters
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      // save token to db
      const created = await db.topUpToken.create({
        data: {
          token,
          amount: input.amount,
          userId: ctx.session.user.id,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      })
      return {
        token: created.token,
        url: `${env.NEXTAUTH_URL}/topup?token=${created.token}&amount=${created.amount.toNumber()}`,
        amount: created.amount.toNumber(),
        expires: created.expires,
      };
    }),
})