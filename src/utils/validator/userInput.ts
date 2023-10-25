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

export const VerificationEmailSchema = z.object({
  email: z.string().email('Please enter a valid email')
  // .endsWith("chula.ac.th", "Email must be chula.ac.th"),
});
export type IVerificationEmail = z.infer<typeof VerificationEmailSchema>;