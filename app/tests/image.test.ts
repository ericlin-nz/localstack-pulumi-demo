import { beforeAll, describe, expect, it } from "vitest";
import { upload } from "../image";
import { join } from "path";
import * as s3 from "@aws-sdk/client-s3";
import { envvars } from "../envvars";
import { IMAGES_BUCKET } from "../../infra/src/buckets";
import { afterEach } from "node:test";

describe("image", () => {
  let s3Client: s3.S3Client;

  async function isBucketItemPresent(objectKey: string): Promise<boolean> {
    try {
      await s3Client.send(new s3.HeadObjectCommand({
        Bucket: IMAGES_BUCKET,
        Key: objectKey
      }));
  
      return true;
    } catch {
      return false;
    }
  }

  async function deleteAllBucketObjects(): Promise<void> {
    const objects = await s3Client.send(new s3.ListObjectsV2Command({
      Bucket: IMAGES_BUCKET
    }));

    if (objects.Contents === undefined) {
      return;
    }

    await Promise.all(objects.Contents.map(object => {
      return s3Client.send(new s3.DeleteObjectCommand({
        Bucket: IMAGES_BUCKET,
        Key: object.Key
      }));
    }));
  }

  beforeAll(() => {
    s3Client = new s3.S3Client({ endpoint: envvars.AWS_S3_ENDPOINT });
  });

  afterEach(deleteAllBucketObjects)

  describe("upload", () => {
    const filePath = join(__dirname, "test-assets", "cat.webp");
    const s3Path = "cat.webp"

    it("successfully uploads a file to s3", async () => {
      await upload(filePath, s3Path);
      expect(await isBucketItemPresent(s3Path)).toEqual(true);
    });

    it("throws when trying to upload a file that doesn't exist", async () => {
      const badFile = "no-file.webp";

      await expect(upload(badFile, s3Path)).rejects.toThrow();
      expect(await isBucketItemPresent(badFile)).toEqual(false);
    });
  });

  describe("process", () => {

  })
});