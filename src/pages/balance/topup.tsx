import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useForm } from "react-hook-form";
import { TopUpSchema, type ITopUpSchema } from "~/utils/validator/userInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
const TopupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITopUpSchema>({
    resolver: zodResolver(TopUpSchema),
    mode: "onBlur",
  });
  const { mutate, data } = api.topUp.createToken.useMutation();
  return (
    <div>
      <h1>Top Up Balance</h1>
      <label htmlFor="amount-input">Amount:</label>
      <input
        id="amount-input"
        type="number"
        {...register("amount", {
          valueAsNumber: true,
        })}
      />
      {errors.amount && <p className="text-error">{errors.amount.message}</p>}
      <button
        className="btn btn-primary"
        onClick={handleSubmit((data) => {
          console.log(data);
          mutate(data);
        })}
      >
        Submit
      </button>
      {data?.url && <QRCode value={data?.url ?? ""} />}
    </div>
  );
};

export default TopupPage;
