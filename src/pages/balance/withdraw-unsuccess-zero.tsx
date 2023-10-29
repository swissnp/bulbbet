import Link from "next/link";
import Header from "~/components/Header";
import { useSession } from "next-auth/react";
const WithDrawSuccess = () => {
  const session = useSession();
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Header />
      <h4 className="pb-6 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Not Enough 💡
      </h4>

      <h4 className="text-4xl font-extrabold tracking-tight ">Go Rob A 🏦</h4>

      <h4 className="pt-9 text-xl">
        You only got {+(session.data?.user?.amount.toFixed(2) ?? 0)}💡{" "}
      </h4>

      {/* <h4 className="text-2xl tracking-tight">
        Redeemable : None U Broke Ass 🤡
      </h4> */}

      <Link
        href="https://th.jobsdb.com/th"
        className="btn btn-primary btn-active my-10 tracking-tight"
      >
        Free Money 🤑
      </Link>
    </div>
  );
};
export default WithDrawSuccess;
