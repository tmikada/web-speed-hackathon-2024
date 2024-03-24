import { z } from 'zod';

export const GetTermsRequestQuerySchema = z.object({
  id: z.string(),
});

export type GetTermsRequestQuery = z.infer<typeof GetTermsRequestQuerySchema>;
