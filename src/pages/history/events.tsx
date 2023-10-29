import { api } from "~/utils/api";
import Header from "~/components/Header";
import Image from "next/image";
import CountDown from "~/components/Countdown";
import { getServerAuthSession } from "~/server/auth";
import type { GetServerSidePropsContext } from "next";
import Footer from "~/components/Footer";
import Link from "next/link";
const CreatedEventHistory = () => {
  const { data: events } = api.event.getMyEvents.useQuery(undefined);

  return (
    <div className="flex min-h-screen flex-col items-center bg-base-100 ">
      <Header />
      <div className="pt-28">
        <h1 className="px-5 py-3 pb-10 text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
          My Events
        </h1>
        <div className="grid grid-cols-1 gap-4 gap-x-5 px-4 pb-10 md:grid-cols-2 lg:grid-cols-3">
          {events?.map((event) => {
            return (
              <div
                className="card card-compact w-72 bg-base-200 shadow-xl"
                key={event.id}
              >
                <div>
                  <div className="flex h-72 w-72 flex-grow-0 overflow-hidden rounded-t-xl ">
                    <Image
                      src={event.imageUrl}
                      alt="Picture of this event"
                      height={288}
                      width={288}
                      className="object-cover"
                    />
                  </div>
                </div>
                <progress
                  className="flex-inline progress progress-success flex w-full bg-error"
                  value={event.nextAgreePrice}
                  max="100"
                ></progress>
                <div className="flex w-full flex-row justify-between px-1">
                  <p className="text-center text-lg">{event.nextAgreePrice}</p>
                  <p className="text-center text-lg">
                    {+(100 - event.nextAgreePrice).toFixed(2)}
                  </p>
                </div>
                <div className="card-body">
                  <h2 className="card-title line-clamp-2">{event.name}</h2>
                  <p className="line-clamp-2">{event.resolutionDetails}</p>
                  <div className="card-actions justify-end">
                    {event.resolutedAt && event.resolutedAt < new Date() ? (
                      <Link
                        className={`btn btn-primary`}
                        href={`/resolute?id=${event.id}`}
                      >
                        Resolute
                      </Link>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex w-full items-center justify-center">
                          <p className="badge badge-secondary flex-grow-0 text-lg">
                            Time Left
                          </p>
                        </div>
                        <CountDown
                          tillDateTime={event.resolutedAt ?? new Date()}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
export default CreatedEventHistory;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
