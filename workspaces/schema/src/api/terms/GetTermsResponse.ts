import { z } from 'zod';

export const GetTermsResponseSchema = z.object({
  terms: z.string(),
});


export type GetTermsResponse = z.infer<typeof GetTermsResponseSchema>;
