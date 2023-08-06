# LocalStack with Pulumi Demo

This project was made to test the provisioning of AWS resources using Pulumi in LocalStack. This will also demo the usage of running Lambdas inside of the LocalStack container.

# Prerequisites 
The following tools must be installed on your machine.
* [LocalStack CLI](https://docs.localstack.cloud/getting-started/installation/)
* [Docker](https://docs.docker.com/engine/install/) 
* [Pulumi](https://www.pulumi.com/docs/install/)

# Setup Instructions

1. Make sure Docker is running on your machine with `docker info`

2. Install all node dependencies by running `yarn install` in each directory that contains a `package.json` file

3. Start up the LocalStack container with `localstack start`

4. In the `infra` directory, run `pulumi up` to provision AWS resources in the running LocalStack container