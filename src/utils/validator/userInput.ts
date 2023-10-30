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
  fileName: z.string().min(1,{message: "Please upload a file"}),
  description: z.string().min(1),
});
export type IEventCreateSchema = z.infer<typeof eventCreateSchema>;

export const VerificationEmailSchema = z.object({
  email: z.string().email('Please enter a valid email')
  .endsWith("chula.ac.th", "Email must be chula.ac.th"),
});
export type IVerificationEmail = z.infer<typeof VerificationEmailSchema>;

export const PurchaseSchema = z.object({
  eventId: z.string({required_error: "Please select an event"}),
  isAgree: z.boolean({required_error: "Please select yes or no"}),
  shareAmount: z.number().min(1, {message: "You must buy at least 1 share"}),
})

export type IPurchaseSchema = z.infer<typeof PurchaseSchema>;

export const SearchSchema = z.object({
  search: z.string(),
})

export type ISearchSchema = z.infer<typeof SearchSchema>;

export const ResolutionSchema = z.object({
  id: z.string(),
  isAgree: z.boolean(),
})

export type IResolutionSchema = z.infer<typeof ResolutionSchema>;

export const TopUpSchema = z.object({
  amount: z.number().max(10000, {message: "You are too greedy Dumb Ass"})
})

export type ITopUpSchema = z.infer<typeof TopUpSchema>