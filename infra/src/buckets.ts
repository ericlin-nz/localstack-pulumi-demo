import { s3 } from "@pulumi/aws";

export const IMAGES_BUCKET = "images-bucket";
export const LAMBDAS_BUCKET = "lambdas-bucket";

export function provisionBuckets(): void {
  [IMAGES_BUCKET, LAMBDAS_BUCKET].map((bucket) => {
    new s3.Bucket(bucket, { bucket});
  })
}
