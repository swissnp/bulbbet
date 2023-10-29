import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type IEventCreateSchema,
  eventCreateSchema,
} from "~/utils/validator/userInput";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useState } from "react";
import Header from "~/components/Header";
import { getServerAuthSession } from "~/server/auth";
import type { GetServerSidePropsContext } from "next";
import Footer from "~/components/Footer";
import Image from "next/image";

export default function resoluteEvent() {
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors, isValid, isSubmitting },
  //   setError,
  //   trigger,
  // } = useForm<IEventCreateSchema>({
  //   resolver: zodResolver(eventCreateSchema),
  //   mode: "onBlur",
  // });

  // const [file, setFile] = useState<File | null>(null);
  // const router = useRouter();
  // const { mutate } = api.event.createEvent.useMutation({
  //   onSuccess: async (result) => {
  //     await router.push(`/event/${result.id}`);
  //   },
  // });

  const { data: event } = api.event.getEventData.useQuery({
    id: "clo5e377r0000l909o7mr5q7h",
  });

  return (
    event && (
      <>
        <div className="flex min-h-screen flex-col items-center justify-center align-middle ">
          <Header />
          <div className="m-4 mt-24 grid grid-cols-1 gap-4 rounded-2xl bg-base-200 p-8 drop-shadow-2xl md:min-w-[30rem]">
            <h1 className="px-2 py-5 text-4xl">
              <b>Resolute Event</b>
            </h1>
            <div className="flex h-72 w-full flex-grow-0 overflow-hidden rounded-t-xl lg:h-96 lg:w-96 ">
              <Image
                src={event.imageUrl}
                alt="Picture of this event"
                height={384}
                width={384}
                className="object-cover"
              />
            </div>
            <div className="mt-1 text-2xl font-semibold">{event.name}</div>
            <progress
              className="flex-inline progress progress-success flex w-full bg-error"
              value={+event.nextAgreePrice.toFixed(2)}
              max="100"
            ></progress>
            <div className="flex w-full flex-row justify-between px-1">
              <p className="text-center text-lg">
                {event.nextAgreePrice.toString()}
              </p>
              <p className="text-center text-lg">
                {
                  +(100 - parseFloat(event.nextAgreePrice.toString())).toFixed(
                    2,
                  )
                }
              </p>
            </div>
            <div className="text-2xl font-semibold">Resolution :</div>
            <div className="flex w-full rounded-xl">
              <input
                type="radio"
                name="resolutionRadio"
                className="radio flex h-12 flex-1 items-center justify-center rounded-l-full rounded-r-none before:opacity-80 before:content-['Yes'] checked:bg-success checked:before:text-black"
                checked
              />
              <input
                type="radio"
                name="resolutionRadio"
                className="radio flex h-12 flex-1 items-center justify-center rounded-l-none rounded-r-full before:opacity-80 before:content-['No'] checked:bg-error checked:before:text-black"
                checked
              />
            </div>
            <div
              className={`btn btn-primary`}
              // className={`btn btn-primary ${!isValid && "btn-disabled"}`}
              onClick={() => {
                console.log("hello world tum mai pen krub");
              }}
            >
              Submit
            </div>
            {/* <h1 className="px-2 py-5 text-4xl">
            <b>Create Event</b>
          </h1>
          <div className="grid grid-cols-1 gap-1">
            <p className="text-lg">Event Name</p>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-error">{errors.name?.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-1">
            <p className="text-lg">How It will Resolute</p>
            <input
              type="text"
              placeholder="Resolution Details"
              className="input input-bordered w-full"
              {...register("resolutionDetails")}
            />
            {errors.resolutionDetails && (
              <p className="text-sm text-error">
                {errors.resolutionDetails?.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-1">
            <p className="text-lg">Event Desciption</p>
            <textarea
              placeholder="Description"
              className="textarea textarea-bordered h-20 w-full"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-error">
                {errors.description?.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-1">
            <p className="text-lg">Resolution Time</p>
            <input
              type="datetime-local"
              className="input input-bordered w-full"
              {...register("resolutedAt", {
                valueAsDate: true,
              })}
            ></input>
            {errors.resolutedAt && (
              <p className="text-sm text-error">
                {errors.resolutedAt?.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-1">
            <p className="text-lg">Thumbnail image</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-secondary w-full"
            />
            {errors.fileName && (
              <p className="text-sm text-error">{errors.fileName?.message}</p>
            )}
          </div>
          <div
            className={`btn btn-primary ${!isValid && "btn-disabled"}`}
            onClick={handleSubmit(async (data) => {
              const filePath = await uploadFile();
              if (filePath)
                mutate({
                  ...data,
                  fileName: filePath,
                });
              else
                setError("fileName", {
                  type: "manual",
                  message: "Error uploading file",
                });
            })}
          >
            {isSubmitting && <span className="loading loading-spinner"></span>}
            Continue
          </div> */}
          </div>
        </div>
        <Footer />
      </>
    )
  );
}
