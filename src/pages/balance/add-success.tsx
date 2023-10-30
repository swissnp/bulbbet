import Link from "next/link";
import { useSession } from "next-auth/react";
import Headers from "~/components/Header";
const AddBulbSuccess = () => {
  const session = useSession();
  console.log(session);
  return (
    <div className="hero h-screen w-full select-none">
      <Headers />
      <div className="hero-content text-center">
        <div className="relative flex flex-col py-0 lg:py-10">
          <h1 className="items-center justify-center whitespace-nowrap text-3xl font-extrabold sm:text-7xl">
            Top up successful
          </h1>
          <h1 className="items-center justify-center whitespace-nowrap py-5 text-xl sm:text-xl">
            Thank you for your top up{" "}
            <div className="inline font-bold text-primary">
              Current Amount : {+(session.data?.user.amount ?? 0).toFixed(2)}
            </div>
          </h1>
          <div className="flex w-full justify-center">
            <Link href="/" className="btn btn-primary mt-2 w-fit">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBulbSuccess;
