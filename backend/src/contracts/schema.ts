import z from "zod";

export const BASE_API_PATH = "/";

export const ErrorSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type TErrorSchema = z.infer<typeof ErrorSchema>;

export const SuccessSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SuccessSchema = z.infer<typeof SuccessSchema>;

export const PaginationInputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
});
export type TPaginationInput = z.infer<typeof PaginationInputSchema>;

export const PaginationOutputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export type TPaginationOutput = z.infer<typeof PaginationOutputSchema>;

export const TrueOrFalseInputSchema = z.enum(["true", "false"]);
export type TTrueOrFalseInput = z.infer<typeof TrueOrFalseInputSchema>;
