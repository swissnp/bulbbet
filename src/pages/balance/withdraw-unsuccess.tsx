import Link from "next/link";
import { useSession } from "next-auth/react";

const WithDrawSuccess = () => {
  const session = useSession();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <h4 className="pb-6 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Shits Tragic 💩
      </h4>

      <h4 className="text-4xl font-extrabold tracking-tight ">
        Go Bet some more 🎲 🎰
      </h4>

      <h4 className="pb-2 pt-9 text-2xl tracking-tight">
        Total : {session.data?.user.amount} 💡{" "}
      </h4>

      <h4 className="text-2xl tracking-tight">
        Redeemable : Aint Got Enough 😩
      </h4>

      <Link
        href="https://www.youtube.com/watch?v=DhlPAj38rHc"
        className="btn btn-primary btn-active my-10 tracking-tight"
      >
        Motivational Music
      </Link>
    </div>
  );
};
export default WithDrawSuccess;
