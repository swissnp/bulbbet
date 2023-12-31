import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { SearchSchema, type ISearchSchema } from "~/utils/validator/userInput";
// import { options } from "~/utils/dataOptions";
// import { UserSearchResultCard } from "~/components/userSearchResultCard";
import { api } from "~/utils/api";
import Header from "~/components/Header";
import Link from "next/link";
import { useEffect } from "react";
import CountDown from "~/components/Countdown";
export default function Interest() {
  const {
    data: searchResults,
    status,
    mutate,
  } = api.event.getEventBySearch.useMutation();
  const { handleSubmit, register } = useForm<ISearchSchema>({
    resolver: zodResolver(SearchSchema),
    mode: "onBlur",
    defaultValues: {
      search: "",
    },
  });
  useEffect(() => {
    mutate({ search: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>💡🎰 Bulbbet</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center">
        <Header />
        <div className="absolute top-0 flex h-screen w-full flex-col pt-10">
          <div className="flex w-full items-center justify-center">
            <div className="z-20 mx-0 mt-16 flex flex-col gap-3 rounded-xl bg-base-200 p-4 drop-shadow-lg sm:top-20 sm:mt-20 sm:flex-row sm:p-6">
              <div className="flex w-full max-w-2xl flex-grow-0 sm:w-96 sm:flex-shrink">
                <input
                  className="input input-bordered input-primary w-full"
                  placeholder="Search"
                  {...register("search")}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={handleSubmit((data) => mutate(data))}
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="items-center justify-center overflow-y-auto pt-5">
              {searchResults?.[0] ? (
                <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults?.map((result) => {
                    return (
                      <Link
                        className={`card card-compact w-72 bg-base-200 shadow-xl ${
                          result.isEnded && "grayscale"
                        }`}
                        key={result.id}
                        href={`/event/${result.id}`}
                      >
                        <div>
                          <div className="relative flex h-72 w-full flex-grow-0 overflow-hidden rounded-t-xl">
                            <Image
                              src={result.imageUrl}
                              alt="Picture of this event"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <progress
                          className={`flex-inline progress progress-success flex w-full bg-error`}
                          value={result.nextAgreePrice}
                          max="100"
                        ></progress>
                        <div className="card-body justify-between">
                          <div>
                            <h2 className="card-title line-clamp-2">
                              {result.name}
                            </h2>
                            <p className="line-clamp-2">
                              {result.resolutionDetails}
                            </p>
                            <div className="flex w-full gap-2 pt-1 text-base font-semibold">
                              <span className="text-success">
                                Yes {result.nextAgreePrice}{" "}
                              </span>
                              <span className="text-error">
                                No {+(100 - result.nextAgreePrice).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <div className="card-actions justify-end">
                            {!result.isEnded ? (
                              <div className="flex flex-col gap-2">
                                <div className="flex w-full items-center justify-center">
                                  <p className="badge badge-secondary flex-grow-0 text-lg">
                                    Time Left
                                  </p>
                                </div>
                                <CountDown
                                  tillDateTime={
                                    result?.resolutedAt ?? new Date()
                                  }
                                />
                              </div>
                            ) : (
                              <div className="btn btn-disabled">Ended</div>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : status === "loading" ? (
                <div className="loading loading-spinner self-center"></div>
              ) : (
                <div className="w-full text-center">No results</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
