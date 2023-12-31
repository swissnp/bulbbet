import CountDown from "~/components/Countdown";
import { api } from "~/utils/api";
import Header from "~/components/Header";
import Image from "next/image";
import Footer from "~/components/Footer";
import Link from "next/link";
const BettingHistory = () => {
  const { data: events } = api.bet.getMyBets.useQuery(undefined);
  return (
    <div className="flex min-h-screen flex-col items-center bg-base-100 ">
      <Header />
      <div className="pt-28">
        <h1 className="px-5 py-3 pb-10 text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
          Betting History
        </h1>
        <div className="grid grid-cols-1 gap-4 gap-x-5 px-4 pb-10 md:grid-cols-2 lg:grid-cols-3">
          {events?.map((history) => {
            return (
              <Link
                href={`/event/${history.event.id}`}
                className="card w-72 bg-base-200 shadow-xl transition duration-200 hover:scale-[1.01] hover:shadow-2xl"
                key={history.id}
              >
                <div>
                  <div className="flex h-72 w-72 flex-grow-0 overflow-hidden rounded-t-xl">
                    <Image
                      src={history.event.imageUrl}
                      alt="Picture of this event"
                      height={288}
                      width={288}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="card-body justify-between">
                  <div>
                    <h2 className="card-title line-clamp-2">
                      {history.event.name}
                    </h2>
                    <p className="line-clamp-2">
                      {history.event.resolutionDetails}
                    </p>
                    <p
                      className={
                        history.isAgree ? "text-success" : "text-error"
                      }
                    >
                      {history.isAgree
                        ? `Betted: Yes ${history.totalPrice}💡 @${history.agreePrice}`
                        : `Betted: No ${history.totalPrice}💡 @${+(
                            100 - history.agreePrice
                          ).toFixed(2)}`}
                    </p>
                  </div>
                  <div className="card-actions justify-end pt-2">
                    {history.event.resolutedAt &&
                    history.event.resolutedAt < new Date() ? (
                      <div>
                        {history.event.isResoluted ? (
                          <>
                            {history.ResolutionPayout?.payoutAmount ? (
                              <div className="badge badge-success badge-lg">
                                Payout {history.ResolutionPayout?.payoutAmount}
                              </div>
                            ) : (
                              <div className="badge badge-neutral badge-outline badge-lg">
                                Lose
                              </div>
                            )}
                          </>
                        ) : (
                          <button className={`btn btn-disabled btn-sm mt-5`}>
                            Waiting for Resolution
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex w-full items-center justify-center">
                          <p className="badge badge-secondary flex-grow-0 text-lg">
                            Time Left
                          </p>
                        </div>
                        <CountDown
                          tillDateTime={history.event.resolutedAt ?? new Date()}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
          {events?.length == 0 && (
            <div className="card w-96 bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">No Event</h2>
                <p>There is no event created by you.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default BettingHistory;
