import React from "next/router";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import Image from "next/image";

import { Test } from "~/components/Chart";
import { api } from "~/utils/api";
import { useForm, Controller } from "react-hook-form";
import {
  type IPurchaseSchema,
  PurchaseSchema,
} from "~/utils/validator/userInput";
import { db } from "~/server/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { type GetStaticPaths, type GetStaticPropsContext } from "next";
import { appRouter } from "~/server/api/root";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import Carousel from "~/components/Carousel";
import { type RouterOutputs } from "~/utils/api";
import Link from "next/link";

const Modal = ({
  modalId,
  data,
}: {
  modalId: string;
  data: RouterOutputs["bet"]["purchase"] | undefined;
}) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        {data ? (
          <div>
            <h3 className="text-2xl font-bold">Betting Confirmed 🤙🏻</h3>
            <p className="py-4"></p>
            <table className="table">
              <thead>
                <tr>
                  <th className="text-lg font-bold">Bet on</th>
                  <th className="text-lg font-bold">Price</th>
                  <th className="text-lg font-bold">Shares</th>
                  <th className="text-lg font-bold">Total</th>
                </tr>
                <tr>
                  <td
                    className={`text-lg font-bold ${
                      data.isAgree ? "text-success" : "text-error"
                    }`}
                  >
                    {data.isAgree ? "Yes ✅" : "No ❌"}
                  </td>
                  <td className="text-lg font-normal">
                    {data.isAgree ? data.agreePrice : 100 - data.agreePrice}
                  </td>
                  <td className="text-lg font-normal">{data.shareAmount}</td>
                  <td className="text-lg font-normal">{data.totalPrice}</td>
                </tr>
              </thead>
            </table>
            <div className="modal-action">
              <Link className="btn-primary" href="/history/bettings">
                View Your Bettings
              </Link>
              <Link className="btn" href="">
                Close
              </Link>
            </div>
          </div>
        ) : (
          <div>Something went wrong</div>
        )}
      </div>
    </dialog>
  );
};

const EventPage = () => {
  const router = useRouter();
  const trendingData = api.event.getTrending.useQuery(undefined);
  const { data } = api.event.getEventById.useQuery(
    {
      id: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    },
  );
  const {
    data: purchaseResult,
    mutate,
    isLoading,
  } = api.bet.purchase.useMutation({
    onError: async (error) => {
      if (error.message === "Not enough money") {
        await router.push("/balance/withdraw-unsuccess-zero");
      }
      setError("root", { message: error.message, type: "manual" });
    },
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<IPurchaseSchema>({
    resolver: zodResolver(PurchaseSchema),
    defaultValues: {
      eventId: router.query.id as string,
      isAgree: undefined,
      shareAmount: 10,
    },
    mode: "onBlur",
  });

  return (
    <>
      <Head>
        <title>💡🎰 Bulbbet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen w-screen flex-col">
        <Header />
        <Modal modalId="purchase-modal" data={purchaseResult} />
        <div className={`relative mt-24 flex flex-col justify-center px-4`}>
          <div
            className={`mb-5 flex flex-col overflow-hidden rounded-xl bg-neutral-focus shadow-2xl ${
              data?.isEnded && "grayscale"
            }`}
          >
            <div className="hero bg-neutral">
              <div className="hero-content flex w-full flex-col overflow-hidden p-0 md:flex-row md:px-5 md:py-10">
                <div className="h-[30rem] w-full overflow-hidden md:w-[30rem] md:justify-items-center md:rounded-3xl md:align-middle md:drop-shadow-xl">
                  <div className="relative h-full w-full">
                    <Image
                      src={data?.imageUrl ?? ""}
                      alt="Picture of this event"
                      fill
                      className="-z-10 object-cover"
                    />
                  </div>
                </div>
                <div className="w-full px-10 py-10 md:w-1/2 md:px-10">
                  <h1 className="w-full text-ellipsis pb-6 text-5xl font-bold">
                    {data?.name}
                  </h1>
                  <Controller
                    control={control}
                    name="isAgree"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <div className="join text-ellipsis">
                        <input
                          className={`btn join-item btn-sm text-ellipsis checked:!btn-success ${
                            data?.isEnded && "btn-disabled"
                          }`}
                          type="radio"
                          onBlur={onBlur} // notify when input is touched
                          onChange={() => onChange(true)} // send value to hook form
                          checked={value === true}
                          ref={ref}
                          aria-label={
                            "Yes: " + (data?.nextAgreePrice ?? 0).toString()
                          }
                        />
                        <input
                          className={`btn join-item btn-sm text-ellipsis checked:!btn-error ${
                            data?.isEnded && "btn-disabled"
                          }`}
                          type="radio"
                          onBlur={onBlur} // notify when input is touched
                          onChange={() => onChange(false)} // send value to hook form
                          checked={value === false}
                          ref={ref}
                          aria-label={
                            "No: " +
                            (
                              100 -
                              (parseFloat(
                                (data?.nextAgreePrice ?? 0).toString() ?? "0",
                              ) ?? 0)
                            ).toString()
                          }
                        />
                      </div>
                    )}
                  />
                  {errors.isAgree && (
                    <div className="pt-1 text-sm text-error">
                      {errors.isAgree.message}
                    </div>
                  )}
                  <div className="pt-3">
                    <div className="flex flex-wrap">
                      <div className="">
                        <p className="mb-1">Shares</p>
                        <input
                          type="number"
                          className="input input-bordered h-10 w-20 rounded-md bg-neutral text-neutral-content"
                          inputMode="numeric"
                          min="1"
                          defaultValue={"10"}
                          max="100"
                          {...register("shareAmount", {
                            valueAsNumber: true,
                          })}
                        ></input>
                      </div>
                    </div>
                    {errors.shareAmount && (
                      <p className="pt-1 text-sm text-error">
                        {errors.shareAmount.message}
                      </p>
                    )}
                  </div>
                  <div className="pt-4">
                    <button
                      className={`btn btn-primary relative ${
                        isLoading && "loading loading-spinner"
                      } ${data?.isEnded && "btn-disabled"}
                    `}
                      onClick={handleSubmit((data) => {
                        mutate(data);
                        if (purchaseResult) {
                          if (document)
                            (
                              document.getElementById(
                                "purchase-modal",
                              ) as HTMLDialogElement
                            ).showModal();
                        }
                      })}
                    >
                      {data?.isEnded ? "ENDED" : "PURCHASE"}
                    </button>
                    {isValid && (
                      <div className="inline pl-4">
                        Total:{" "}
                        {
                          +(
                            (watch("isAgree")
                              ? data?.nextAgreePrice ?? 0
                              : 100 - (data?.nextAgreePrice ?? 0)) *
                            watch("shareAmount")
                          ).toFixed(2)
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-10 px-5 py-7 md:p-20 md:px-10 md:py-14">
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="w-full">
                  <div className="flex w-full flex-col">
                    <h1 className="mb-3 text-2xl font-bold">
                      {"Resolution Details"}
                    </h1>
                    {data?.resolutionDetails ?? ""}
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex w-full flex-col">
                    <h1 className="mb-3 text-2xl font-bold">{"Description"}</h1>
                    {data?.description ?? ""}
                  </div>
                </div>
              </div>
              <div className="divider py-5"></div>
              <div className="h-80">
                <div className="pb-5 text-2xl font-bold">Pricing Graph</div>
                <Test id={router.query.id as string} />
              </div>
            </div>
          </div>
          <div className="mb-5 flex w-full flex-col items-center justify-center rounded-xl bg-neutral-focus drop-shadow-lg">
            <h1 className="py-10 text-4xl font-bold ">Trending Events</h1>
            <div className="hide-scroll w-full overflow-scroll pb-7 pt-3">
              <Carousel trendingData={trendingData.data ?? []} />
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await db.event.findMany({
    select: {
      id: true,
    },
  });
  return {
    paths: events.map((event) => ({
      params: {
        id: event.id,
      },
    })),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>,
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { db: db, session: null },
    transformer: superjson, // optional - adds superjson serialization
  });
  const id = context.params?.id;
  // prefetch `post.byId`
  if (!id) {
    throw new Error("id not found");
  }
  await helpers.event.getEventById.prefetch({ id });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
    revalidate: 60,
  };
}
export default EventPage;
