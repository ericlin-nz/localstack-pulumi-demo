import { s3 } from "@pulumi/aws";

export const IMAGES_BUCKET = "images-bucket";

export function provisionVideosBucket(): void {
  new s3.Bucket(IMAGES_BUCKET, {
    bucket: IMAGES_BUCKET
  })
}
