import { processImage, processImageArgs } from "./process-image";

export async function handler(args: unknown) {
  await processImage(processImageArgs.parse(args));
}
