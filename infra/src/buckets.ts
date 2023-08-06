import { s3 } from "@pulumi/aws";

export const IMAGES_BUCKET = "images-bucket";
export const LAMBDAS_BUCKET = "lambdas-bucket";

export function provisionBuckets(): void {
  for (const bucket of [IMAGES_BUCKET, LAMBDAS_BUCKET]) {
    new s3.Bucket(bucket, { bucket});
  }
}
