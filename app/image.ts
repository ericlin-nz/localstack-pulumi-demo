import * as s3 from "@aws-sdk/client-s3";
import * as lambda from "@aws-sdk/client-lambda"
import * as fs from "fs";
import { IMAGES_BUCKET } from "../infra/src/buckets";
import { envvars } from "./envvars";

const defaultClientConfig = {
  region: envvars.AWS_REGION,

  // AWS access credentials will normally come from the AWS credentials
  // provider rather than being set as envvars. We set them as envvars
  // for dev only.
  ...(envvars.AWS_ACCESS_KEY_ID !== undefined && envvars.AWS_SECRET_ACCESS_KEY !== undefined
    ? {
        credentials: {
          accessKeyId: envvars.AWS_ACCESS_KEY_ID,
          secretAccessKey: envvars.AWS_SECRET_ACCESS_KEY,
        }
      } 
    : {}
  ),
}

export async function upload(filePath: string, s3Path: string): Promise<void> {
  const client = new s3.S3Client({
    ...defaultClientConfig,
    endpoint: envvars.AWS_S3_ENDPOINT
  });

  if (!fs.existsSync(filePath)) {
    throw Error(`File at path: "${filePath}" does not exist!`);
  }

  await client.send(new s3.PutObjectCommand({
    Bucket: IMAGES_BUCKET,
    Key: s3Path,
    Body: fs.createReadStream(filePath),
  }));
}

export async function process(s3Path: string): Promise<void> {
  const client = new lambda.LambdaClient(defaultClientConfig);
}
