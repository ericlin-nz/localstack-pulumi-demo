import * as aws from "@pulumi/aws";
import { Bucket } from "@pulumi/aws/s3";

export function provisionLambdas(lambdasBucket: Bucket): void {
  const role = new aws.iam.Role("lambda", {
    name: "lambda",
    assumeRolePolicy: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "sts:AssumeRole",
          Principal: { Service: "lambda.amazonaws.com" },
        },
      ],
    },
  });

  // TODO: add role policy

  new aws.lambda.Function("process-image", {
    s3Bucket: lambdasBucket.bucket,
    role: role.arn,

    // TODO: Add s3 key, memorySize, layers and architectures
  });
}