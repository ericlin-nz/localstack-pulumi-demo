import { provisionLambdas } from "./src/lambdas";
import { provisionVideosBucket } from "./src/buckets";

export = function (): void {
  provisionVideosBucket();
  provisionLambdas();
}