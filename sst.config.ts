import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";

export default {
  config(_input) {
    return {
      name: "chime-server-poc",
      region: "us-east-1",
      stage: "dev",
    };
  },
  stacks(app) {
    app.stack(ApiStack);
  }
} satisfies SSTConfig;
