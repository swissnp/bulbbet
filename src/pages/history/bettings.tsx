import { api } from "~/utils/api";
import Header from "~/components/Header";
import Image from "next/image";
import CountDown from "~/components/Countdown";
import { getServerAuthSession } from "~/server/auth";
import type { GetServerSidePropsContext } from "next";

const CreateBettingHistory = () => {
    const { data: bettings } = api.betting.getBettingHistory.useQuery(undefined);

    return (
        <><h1 className="px-5 py-3 pb-10 text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
            Bettings History
        </h1><div>
            {bettings?.map((betting) => {
                return(
                    <p>
                        {betting.name}
                    </p>
                );
            })}
            </div></>
    );
};

export default CreateBettingHistory;