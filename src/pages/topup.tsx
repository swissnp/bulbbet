import React from "react";
import { useSearchParams } from "next/navigation";
const TopUpThirdParty = () => {
  const searchParams = useSearchParams();
  return (
    <div>
      <h1>{}</h1>
      <h1>{searchParams.get("amount")}</h1>
    </div>
  );
};
export default TopUpThirdParty;
