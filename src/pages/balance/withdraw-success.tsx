import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const WithDrawSuccess = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (+(session.data?.user.amount ?? 0) < 10000) {
      void router.push('/balance/withdraw-unsuccess')
    }
  });
  
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <h4 className="pb-6 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        You Won Sum 💩
      </h4>

      <h4 className="text-4xl font-extrabold tracking-tight ">Go To A 🏦</h4>

      <h4 className="pb-2 pt-9 text-2xl tracking-tight">
        Total : {session.data?.user.amount} 💡{" "}
      </h4>

      <h4 className="text-2xl tracking-tight">
        Redeemable : {+(session.data?.user.amount ?? 0) - 10000} ฿
      </h4>

      <Link
        href="https://www.google.com/maps/search/bank+near+me/"
        className="btn btn-primary btn-active my-10 tracking-tight"
      >
        Bank Near 🫵🏻
      </Link>
    </div>
  );
};
export default WithDrawSuccess;
