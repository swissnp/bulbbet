import { api } from "~/utils/api";
import Header from "~/components/Header";
import Image from "next/image";
import CountDown from "~/components/Countdown";
import { getServerAuthSession } from "~/server/auth";
import type { GetServerSidePropsContext } from "next";
const CreatedEventHistory = () => {
  const { data: events } = api.event.getMyEvents.useQuery(undefined);

  return (
    <div className="bg-base-100 flex min-h-screen flex-col items-center ">
      <Header />
      <div className="pt-28">
        <h1 className="px-5 py-3 pb-10 text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
          Created Events
        </h1>
        <div className="grid grid-cols-1 gap-4 gap-x-5 px-4 pb-10 md:grid-cols-2 lg:grid-cols-3">
          {events?.map((event) => {
            return (
              <div className="card bg-base-200 w-full shadow-xl" key={event.id}>
                <div>
                  <div className="flex h-72 w-full flex-grow-0 overflow-hidden rounded-t-xl lg:h-96 lg:w-96 ">
                    <Image
                      src={event.imageUrl}
                      alt="Picture of this event"
                      height={384}
                      width={384}
                      className="object-cover"
                    />
                  </div>
                </div>
                <progress
                  className="progress progress-success flex-inline bg-error flex w-full"
                  value={event.nextAgreePrice.toString()}
                  max="1"
                ></progress>
                <div className="flex w-full flex-row justify-between px-1">
                  <p className="text-center text-lg">
                    {event.nextAgreePrice.toString()}
                  </p>
                  <p className="text-center text-lg">
                    {1.0 - parseFloat(event.nextAgreePrice.toString())}
                  </p>
                </div>
                <div className="card-body">
                  <h2 className="card-title">{event.name}</h2>
                  <p>{event.resolutionDetails}</p>
                  <div className="card-actions justify-end">
                    {event.resolutedAt && event.resolutedAt < new Date() ? (
                      <button className={`btn btn-primary`}>Resolute</button>
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
            <div className="card bg-base-200 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">No Event</h2>
                <p>There is no event created by you.</p>
              </div>
            </div>
          )}
        </div>
      </div>
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
