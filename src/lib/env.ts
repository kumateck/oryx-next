// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  ENCRYPTION_SECRET: z.string().min(32),
});

export const env = envSchema.parse(process.env);
