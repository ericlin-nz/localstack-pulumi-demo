import { spawn, spawnSync} from "child_process";
import { z } from "zod";
import * as s3 from "@aws-sdk/client-s3";
import { tmpdir } from "os";
import { randomBytes } from "crypto";
import { join } from "path";
import { Readable } from "stream";

export const processImageArgs = z.strictObject({
  srcImagePath: z.string(),
});

type ProcessImageArgs = z.infer<typeof processImageArgs>;

async function handler(args: unknown) {
  await processImage(processImageArgs.parse(args));
}

async function getObjectStreamFromS3(s3Path: string): Promise<Readable> {
  const s3Client = new s3.S3Client({ 
    // TODO: these should be configurable through envvars
    endpoint: 'http://localhost:4566',
    forcePathStyle: true,
  });

  const { Body: body } = await s3Client.send(new s3.GetObjectCommand({
    // TODO: This should be configurable
    Bucket: "images-bucket",

    Key: s3Path,
  }));
    
  if (body instanceof Readable) {
    return body;
  }
}

async function processDataFFmpeg(fileStream: Readable) {
  const outputPath = join(tmpdir(), randomBytes(16).toString("hex"));

  const ffmpegProcess = spawn("ffmpeg", [
    // Input file type
    "-f",
    "webp", // TODO: make this configurable

    // Input source from stdin 
    "-i",
    "pipe:0",

    // TODO: additional config options

    // Output path
    outputPath,
  ]);

  await new Promise<string>((resolve, reject) => {
    fileStream.pipe(ffmpegProcess.stdin);
    ffmpegProcess.on("close", () => resolve(outputPath));
    ffmpegProcess.on("error", reject);
  });
}

async function processImage(args: ProcessImageArgs): Promise<void> {
  try {
    const s3ObjectReadableStream = await getObjectStreamFromS3(args.srcImagePath);
    const outputFilePath = await processDataFFmpeg(s3ObjectReadableStream);
  } finally {

  } 
}