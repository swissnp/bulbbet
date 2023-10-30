import React from "react";
import { useSearchParams } from "next/navigation";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

const TopUpThirdParty = () => {
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <div className="h-[80vh] flex justify-center items-center">
        <div className="bg-base-200 flex flex-col p-6 rounded-2xl">
          <div className="flex items-center gap-1">
            <h1 className="normal-case text-white font-bold text-2xl">Amount : </h1>
            {/* <h1 className="text-white font-medium text-xl mt-1"> 100.5555</h1> */}
            <h1 className="text-white font-medium text-xl mt-1">{searchParams.get("amount")}</h1>
          </div>
          <div className="btn btn-primary mt-2 font-bold">Submit</div>
        </div>
      </div>
      
      <div className="fixed w-full bottom-0">
        <Footer />
      </div>
    </div>
  );
};
export default TopUpThirdParty;
