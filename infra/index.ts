import { provisionBuckets } from "./src/buckets";

export = function (): void {
  provisionBuckets();
  // provisionLambdas();
}