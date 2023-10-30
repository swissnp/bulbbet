import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useForm } from "react-hook-form";
import { TopUpSchema, type ITopUpSchema } from "~/utils/validator/userInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import Header from '~/components/Header';
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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Header />
      <div className="mt-28 mb-8 bg-base-200 p-10 rounded-xl flex flex-col">
        <h1 className="font-bold text-2xl mb-4">Top Up Balance</h1>
        <div className="">
          <label htmlFor="amount-input" className="font-medium text-lg">Amount :</label>
          <input
            id="amount-input"
            type="number"
            min="0"
            className="bg-inherit border-[1.5px] border-white rounded-md focus:outline-none px-2 py-1 w-40 ml-2"
            {...register("amount", {
              valueAsNumber: true,
            })}
          />
        </div>
        {errors.amount && <div className="text-error mt-1">{errors.amount.message}</div>}
        <button
          className="btn btn-primary w-full mt-3"
          onClick={handleSubmit((data) => {
            console.log(data);
            mutate(data);
          })}
        >
          Submit
        </button>
        <div className="w-full flex justify-center items-center mt-6">
          {data?.url && <QRCode value={data?.url ?? ""} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TopupPage;
