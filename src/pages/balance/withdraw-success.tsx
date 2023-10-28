import Link from "next/link";

const WithDrawSuccess = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <h4 className="pb-6 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        You Won Sum 💩
      </h4>

      <h4 className="text-4xl font-extrabold tracking-tight ">Go To A 🏦</h4>

      <h4 className="pb-2 pt-9 text-2xl tracking-tight">Total : 12,000 💡 </h4>

      <h4 className="text-2xl tracking-tight">Redeemable : 2,000 ฿</h4>

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
