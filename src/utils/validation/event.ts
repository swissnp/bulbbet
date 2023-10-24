import { z } from "zod";
export const eventCreateSchema = z.object({
  name: z.string().min(1),
  resolutedAt: z
    .date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    })
    .min(new Date(), { message: "Resolution date must be later" }),
  resolutionDetails: z.string().min(1),
  fileName: z.string().min(1,{message: "Please upload a file"})
});
export type IEventCreateSchema = z.infer<typeof eventCreateSchema>;
