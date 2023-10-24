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

export default function Create() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
    setError,
    trigger,
  } = useForm<IEventCreateSchema>({
    resolver: zodResolver(eventCreateSchema),
    mode: "onBlur",
  });
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { mutate } = api.event.createEvent.useMutation({
    onSuccess: async (result) => {
      await router.push(`/event/${result.id}`);
    },
  });
  const { data } = api.event.getPresignedUrl.useQuery(
    {},
    {
      refetchOnMount: false,
      refetchInterval: 3000 * 1000, // 50 minutes
      refetchOnWindowFocus: false,
      enabled: !file,
    },
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setValue("fileName", selectedFile.name);
      await trigger("fileName"); // this will trigger form to be valid however this will not use
    }
  };

  const uploadFile = async () => {
    if (!file || !data) return;
    const { type } = file;
    if (type != "image/png" && type != "image/jpeg") {
      return;
    }
    try {
      const presignedUrl = data.url;
      const fileName = data.fileName;
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file?.type,
        },
      });
      if (response.ok) {
        return fileName;
      } else {
        console.log("Upload failed");
        return;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center align-middle ">
      <Header />
      <div className="bg-base-200 m-4 mt-24 grid grid-cols-1 gap-4 rounded-2xl p-8 drop-shadow-2xl md:min-w-[30rem]">
        <h1 className="px-2 py-5 text-4xl">
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
            <p className="text-error text-sm">{errors.name?.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-1">
          <p className="text-lg">How It will Resolute</p>
          <input
            type="text"
            placeholder="Description"
            className="input input-bordered w-full"
            {...register("resolutionDetails")}
          />
          {errors.resolutionDetails && (
            <p className="text-error text-sm">
              {errors.resolutionDetails?.message}
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
            <p className="text-error text-sm">{errors.resolutedAt?.message}</p>
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
            <p className="text-error text-sm">{errors.fileName?.message}</p>
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
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
