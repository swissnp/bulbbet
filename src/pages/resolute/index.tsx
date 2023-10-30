import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResolutionSchema,
  type IResolutionSchema,
} from "~/utils/validator/userInput";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import ResoluteModal from "~/components/ResoluteModal";

export default function ResoluteEvent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
    setError,
    control,
    getValues,
  } = useForm<IResolutionSchema>({
    resolver: zodResolver(ResolutionSchema),
    mode: "onBlur",
    defaultValues: {
      id: searchParams.get("id")!,
    },
  });

  useEffect(() => {
    setValue("id", searchParams.get("id")!);
  }, [searchParams, setValue]);
  const { mutate } = api.event.resoluteEvent.useMutation({
    onSuccess: () => {
      if (document)
        (
          document.getElementById("resolute-modal") as HTMLDialogElement
        ).showModal();
    },
    onError: (error) => {
      setError("root", {
        type: "manual",
        message: error.message,
      });
    },
  });
  const { data: event } = api.event.getEventData.useQuery(
    {
      id: searchParams.get("id")!,
    },
    {
      refetchOnMount: true,
    },
  );
  return (
    event && (
      <>
        <ResoluteModal
          modalId="resolute-modal"
          data={{ isAgree: getValues("isAgree") }}
          onClick={() => router.push("/")}
        />
        <div className="flex min-h-screen flex-col items-center justify-center align-middle ">
          <Header />

          <div className="flex w-full items-center justify-center px-4">
            <div className="mt-24 grid w-full grid-cols-1 gap-4 rounded-2xl bg-base-200 p-8 drop-shadow-2xl sm:w-[28rem] md:max-w-[30rem]">
              <h1 className="px-2 py-5 text-4xl">
                <b>Resolute Event</b>
              </h1>
              <div className="flex h-96 w-full overflow-hidden rounded-2xl">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={event.imageUrl}
                    alt="Picture of this event"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-1 line-clamp-2 text-2xl font-semibold">
                {event.name}
              </div>
              <div className="mt-1 line-clamp-2 text-2xl font-bold">
                Resolution Criteria
              </div>
              <div className="text-md -mt-2 mb-1">
                {event.resolutionDetails}
              </div>
              <progress
                className="flex-inline progress progress-success flex w-full bg-error"
                value={+event.nextAgreePrice.toFixed(2)}
                max="100"
              ></progress>
              <div className="flex w-full flex-row justify-between px-1">
                <p className=" text-center text-lg ">
                  {event.nextAgreePrice.toString()}
                </p>
                <p className="line-clamp-2 text-center text-lg">
                  {+(100 - event.nextAgreePrice).toFixed(2)}
                </p>
              </div>
              <div className="text-2xl font-semibold">
                How this event resolute ?
              </div>

              <Controller
                control={control}
                name="isAgree"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <div className="flex w-full rounded-xl">
                    <input
                      type="radio"
                      onBlur={onBlur} // notify when input is touched
                      onChange={() => onChange(true)} // send value to hook form
                      checked={value === true}
                      ref={ref}
                      className="radio flex h-12 flex-1 items-center justify-center rounded-l-full rounded-r-none before:opacity-80 before:content-['Yes'] checked:bg-success checked:before:text-black"
                    />
                    <input
                      type="radio"
                      onBlur={onBlur} // notify when input is touched
                      onChange={() => onChange(false)} // send value to hook form
                      checked={value === false}
                      ref={ref}
                      className="radio flex h-12 flex-1 items-center justify-center rounded-l-none rounded-r-full before:opacity-80 before:content-['No'] checked:bg-error checked:before:text-black"
                    />
                  </div>
                )}
              />
              {errors.isAgree && (
                <p className="text-sm text-error">{errors.isAgree?.message}</p>
              )}
              {errors.root && (
                <p className="text-sm text-error">{errors.root?.message}</p>
              )}
              {errors.id && (
                <p className="text-sm text-error">{errors.id?.message}</p>
              )}
              <div
                className={`btn btn-primary ${!isValid && "btn-disabled"}`}
                onClick={handleSubmit((data) => {
                  mutate(data);
                })}
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
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
        </div>
        <Footer />
      </>
    )
  );
}
