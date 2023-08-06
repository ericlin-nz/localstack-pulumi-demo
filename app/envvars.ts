import "dotenv/config";
import { z } from "zod";

const envvarsSchema = z.object({
  AWS_REGION: z.string(),
  AWS_S3_ENDPOINT: z.string(),

  // The AWS credentials will be in the .env file when being used for development purposes.
  // In production, this will instead come from the AWS credentials provider.
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
});

export const envvars = envvarsSchema.parse(process.env);