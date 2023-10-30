import React from "react";
import { useSearchParams } from "next/navigation";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
const TopUpThirdParty = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mutate } = api.topUp.add.useMutation({
    onSuccess: async () => {
      await router.push(`/balance/add-success`);
    },
  });
  return (
    <div>
      <h1>Amount</h1>
      <h1>{searchParams.get("amount")}</h1>
      <button
        onClick={() => {
          mutate({
            token: searchParams.get("token")!,
          });
        }}
      ></button>
    </div>
  );
};
export default TopUpThirdParty;
