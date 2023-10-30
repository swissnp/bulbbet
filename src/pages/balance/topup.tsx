import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useForm } from "react-hook-form";
import { TopUpSchema, type ITopUpSchema } from "~/utils/validator/userInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Header />
      <div className="mb-8 mt-28 flex flex-col rounded-xl bg-base-200 p-10">
        <h1 className="mb-4 text-2xl font-bold">Top Up Balance</h1>
        <div className="">
          <label htmlFor="amount-input" className="text-lg font-medium">
            Amount :
          </label>
          <input
            id="amount-input"
            type="number"
            min="0"
            className="ml-2 w-40 rounded-md border-[1.5px] border-white bg-inherit px-2 py-1 focus:outline-none"
            {...register("amount", {
              valueAsNumber: true,
            })}
          />
        </div>
        {errors.amount && (
          <div className="mt-1 text-error">{errors.amount.message}</div>
        )}
        <button
          className="btn btn-primary mt-3 w-full"
          onClick={handleSubmit((data) => {
            console.log(data);
            mutate(data);
          })}
        >
          Submit
        </button>
        <div className="mt-6 flex w-full items-center justify-center">
          {data?.url && <QRCode value={data?.url ?? ""} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TopupPage;
