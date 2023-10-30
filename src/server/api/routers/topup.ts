// import { topUpRouter } from './topup';
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
const ee = new EventEmitter();
export const topUpRouter = createTRPCRouter({
  // onAdd: protectedProcedure.subscription(() => {
  //   // return an `observable` with a callback which is triggered immediately
  //   return observable<Post>((emit) => {
  //     const onAdd = (data: Post) => {
  //       // emit data to client
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
  //       id: z.string().uuid().optional(),
  //       text: z.string().min(1),
  //     }),
  //   )
  //   .mutation((opts) => {
  //     const post = { ...opts.input }; /* [..] add to db */
  //     ee.emit('add', post);
  //     return post;
  //   }),
  createToken: protectedProcedure
    .input(TopUpSchema)
    .mutation(async ({ ctx, input }) => {
      // create a random token longer than 20 characters
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      // save token to db
      console.log(token)
      const created = await db.topUpToken.create({
        data: {
          token,
          amount: input.amount,
          userId: ctx.session.user.id,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      })
      console.log(created);
      return {
        token: created.token,
        url: `${env.NEXTAUTH_URL}/ext/topup?token=${created.token}`,
        amount: created.amount.toNumber(),
        expires: created.expires,
      };
    }),
})