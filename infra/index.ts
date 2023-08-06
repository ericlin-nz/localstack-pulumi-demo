import { provisionLambdas } from "./src/lambdas";
import { provisionBuckets } from "./src/buckets";

export = function (): void {
  provisionBuckets();
  provisionLambdas();
}